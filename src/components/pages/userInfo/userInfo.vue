<template>
	<div>
		<div class='commonTop clearfix'>
			<el-breadcrumb separator="/" class="comBread">
				<el-breadcrumb-item :to="{ path: '/welcome' }">概览</el-breadcrumb-item>
				<el-breadcrumb-item>系统管理</el-breadcrumb-item>
				<el-breadcrumb-item>用户信息</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="userInfo-body clearfix animated zoomIn">
			<div class="progress-info">
				您的个人信息完整度
			</div>
			<el-progress :text-inside="true" :stroke-width="18" :percentage="percentageNum"></el-progress>

			<div class="user-modal">
				<h3 class="with-line">个人信息</h3>
				<span style="font-size:1.4rem;">头像</span>
				<el-upload class="avatar-uploader" action="http://192.168.120.208:8084/upload/img" with-credentials="true" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="formData.imgUrl" :src="formData.imgUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<el-form ref="form" :model="formData" :rules="rules" label-width="80px" class="formInfo">
					<el-form-item label="登录名">
						<el-input v-model="userName" disabled></el-input>
					</el-form-item>
					<el-form-item label="真实姓名" prop="nickName">
						<el-input v-model="formData.nickName"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="mail">
						<el-input v-model="formData.mail"></el-input>
						<button class="verifyMail" @click="verifyMail">验证邮箱</button>
					</el-form-item>
					<el-form-item label="手机号码" prop="phoneNum">
						<el-input v-model="formData.phoneNum"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="user-modal">
				<h3 class="with-line">企业信息</h3>
				<el-form ref="form" :model="formData" label-width="80px" class="formInfo">
					<el-form-item label="企业名称">
						<el-input v-model="formData.companyName"></el-input>
					</el-form-item>
					<el-form-item label="所在位置">
						<el-input v-model="formData.companyAddress"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="user-modal" style="margin-bottom:30px;">
				<h3 class="with-line">敏感词</h3>
				<el-tag :key="tag" v-for="tag in formData.sensitiveWord" :closable="true" :close-transition="false" @close="handleClose(tag)">
					{{tag}}
				</el-tag>
				<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
				</el-input>
				<el-button v-else class="button-new-tag" @click="showInput">+ 增加敏感词</el-button>
			</div>
			<el-button class="save-profile" @click="toSubmit('formData')">确认修改并提交</el-button>
		</div>
	</div>
</template>

<script>
	var common_tools=require("common_tools");
	export default {
		data() {
			var validatePhone = (rule, value, callback) => {
				if(new RegExp("^[1][3578][0-9]{9}$").test(value)) {
					callback();
				}else {
					callback(new Error('手机号码格式不对，请重新输入'));
				}
			};
			return {
				percentageNum:'',
				userName: '',
				formData: {
					nickName: '',
					mail: '',
					phoneNum: '',
					companyName: '',
					companyAddress: '',
					imgUrl:'',
					sensitiveWord:[],
				},
				rules: {
					nickName: [
						{
							min: 1,
							max: 12,
							message: '长度不大于12 个字符',
							trigger: 'blur'
						}
					],
					mail: [
						{
							type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' 
						}
					],
					phoneNum:[
						{validator:validatePhone,trigger:'blur'}
					]
				},
				inputVisible: false,
				inputValue: ''
			}
		},
		methods: {
			getUserInfo(){
				var _self=this;
				_self.userName=sessionStorage.getItem('userName');
				common_tools.AJAX('POST',common_tools.interfaceurl+'user/personalcenter',{
					},function(data){
						console.log(data);
						_self.formData.sensitiveWord=[];
   						if(data.status == 200){
							_self.percentageNum=parseFloat(data.data.finishState);
							_self.formData.nickName=data.data.nickName;
							_self.formData.mail=data.data.mail;
							_self.formData.phoneNum=data.data.phoneNum;
							_self.formData.companyName=data.data.companyName;
							_self.formData.companyAddress=data.data.companyAddress;
							_self.formData.imgUrl=data.data.imgUrl;
							if(_self.formData.imgUrl){
								$('.avatar-uploader .el-upload').css('borderWidth','0px');
								_self.$store.state.portrait=_self.formData.imgUrl;
							}
							for(var i=0;i<data.data.sensitiveWord.length;i++){
								_self.formData.sensitiveWord.push(data.data.sensitiveWord[i].word)
							}
   							if(data.data.mailOk=="2"){
   								$('.verifyMail').show();
   								_self.$message({
									message:'您还没有验证邮箱，请去邮箱验证',
									type:'warning'
								});
								$('.verifyMail').html("邮箱未验证");
   							}else if(data.data.mailOk=="0"){
   								$('.verifyMail').show();
   								_self.$message({
									message:'您还没有绑定邮件，请先输入邮箱并验证',
									type:'warning'
								});
								$('.verifyMail').html('邮箱未验证');
   							}else if(data.data.mailOk=="1"){
   								$('.verifyMail').html("邮箱已验证");
   							}
   						}else if(data.status==402&&data.msg=="先登录"){
							alert('时间超时，请重新登录');
							_self.$router.push('/login');
						}else{
							alert('传参错误');
						}
   							
   					},function(data){
   						console.log(data);
   					})
			},
			toSubmit(formName){
				var _self=this;
				common_tools.AJAX('POST',common_tools.interfaceurl+'user/personalcenterUpData',_self.formData,function(data){
					if(data.status == 200){
						_self.$message({
							message:'修改成功',
							type:'success'
						})
						_self.getUserInfo();
					}else{
						alert('传参错误');
					}
				},function(data){
					console.log(data);
				})
			},
			handleAvatarSuccess(res, file) {
//				console.log(res, file);
//				this.formData.imgUrl = URL.createObjectURL(file.raw);
				this.formData.imgUrl = res.data.imgUrl;
			},
			beforeAvatarUpload(file) {
				const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isRightType) {
					this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isRightType && isLt2M;
			},
			//标签删除
			handleClose(tag) {
				this.formData.sensitiveWord.splice(this.formData.sensitiveWord.indexOf(tag), 1);
			},
			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			handleInputConfirm() {
				let inputValue = this.inputValue;
				if(inputValue) {
					this.formData.sensitiveWord.push(inputValue);
				}
				this.inputVisible = false;
				this.inputValue = '';
			},
			verifyMail(){
				var _self=this;
				
				common_tools.AJAX('POST',common_tools.interfaceurl+'mail/sendverify',{
					mail:_self.formData.mail
				},function(data){
   						if(data.status == 200){
							_self.$message({
								message:'已发送验证邮件，请去邮箱查看',
								type:'success'
							})
   						}else{
							alert('传参错误');
						}
   					},function(data){
   						console.log(data);
   					})
			}
		},
		mounted() {
			this.getUserInfo();
			window.onresize = function(e) {
				var getWindowParm = e.target.innerWidth + 'px ' + (e.target.innerHeight) + 'px';
				$(".userInfo-body").css("background-size", getWindowParm);
			}
		},
	}
</script>

<style>
	.userInfo-body {
		padding: 20px 32px;
		margin-bottom:30px;
		border-radius: 5px;
		color: #fff;
		background: url(../../../public_resource/img/modal-bg.jpg) fixed;
		box-sizing: border-box;
	}
	.progress-info {
		font-size: 1.4rem;
		margin-bottom: 10px;
	}
	
	.userInfo-body .el-progress-bar__inner {
		background: #209e91;
	}
	
	.userInfo-body .el-progress-bar__outer {
		background: rgba(0, 0, 0, .15)
	}
	
	.user-modal {
		width: 100%;
		float: left;
		margin-top: 20px;
	}
	
	.with-line {
		float: left;
		border-bottom: 1px solid #fff;
		color: #fff;
		font-size: 2rem;
		font-weight: 400;
		margin-top: 0;
		margin-bottom: 14px;
		line-height: 39px;
		width: 100%;
	}
	
	/*上传头像*/
	
	.avatar-uploader {
		display: inline-block;
		vertical-align: top;
		margin-left: 50px;
	}
	
	.avatar-uploader .el-upload {
		border: 1.5px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.el-upload {
		background: none;
		width:178px;
		height:178px;
	}
	
	.el-upload .el-icon-plus {
		color: #fff;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #20a0ff;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	
	.user-modal .el-upload:hover {
		border-color: #209e91;
	}
	
	.user-modal .el-upload--text {
		width: auto;
	}
	
	.upload-img {
		display: inline-block;
		vertical-align: top;
		margin-left: 100px;
	}
	
	.userInfo-body .el-form-item__label {
		color: #fff;
	}
	
	.userInfo-body .el-input__inner {
		background: rgba(0, 0, 0, .15);
		border: 1px solid transparent;
		color: #fff;
	}
	
	.userInfo-body .el-input__inner:focus {
		border: 1px solid #209e91;
	}
	
	.formInfo {
		margin-top: 15px;
	}
	.formInfo .el-input.is-disabled .el-input__inner{
		background:rgba(255,255,255,.05);
		color:#fff;
	}
	.formInfo .el-form-item {
		display: inline-block;
		width: 49%;
		box-sizing: border-box;
	}
	.input-new-tag{
		display:inline-block;
		width:20%;
		line-height:36px;
	}
	.user-modal .el-tag{
		height:36px;
		line-height:36px;
		padding:0 10px;
		margin-right:15px;
		border-radius:6px;
		background:none;
		border:1px solid #fff;
	}
	.input-new-tag input{
		line-height:36px;
	}
	.button-new-tag{
		background:#209e91;
		border-color:#209e91;
		color:#fff;
		transition:all 0.3s;
	}
	.button-new-tag:hover{
		color:#ddd;
		border-color:#209e91;
	}
	.save-profile{
		background:#209e91;
		border-color:#209e91;
		color:#fff;
		-webkit-transition:all 0.3s;
		-moz-transition:all 0.3s;
		-o-transition:all 0.3s;
		-ms-transition:all 0.3s;
		transition:all 0.3s;
	}
	.save-profile:hover{
		border-color:#209e91;
		color:#fff;
		-webkit-transform:scale(1.2);
		-moz-transform:scale(1.2);
		-o-transform:scale(1.2);
		-ms-transform:scale(1.2);
		transform:scale(1.2);
	}
	.save-profile:focus{
		color:#fff;
		border-color: #209e91;
	}
	.verifyMail{
		position:absolute;
		right:10px;
		top:0;
		margin-top:3.5px;
		padding:6px 15px;
		border-radius:4px;
		background:#209E91;
		border:none;
		color:#fff;
		cursor:pointer;
	}
</style>