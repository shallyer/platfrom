<template>
<div>
	<div class='commonTop clearfix'>
		<el-breadcrumb separator="/" class="comBread">
		<el-breadcrumb-item :to="{ path: '/welcome' }">概览</el-breadcrumb-item>
		<el-breadcrumb-item>系统管理</el-breadcrumb-item>
		<el-breadcrumb-item>修改密码</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
	<div class="changePwd-body clearfix animated zoomIn">
		<div class="changePwd-modal">
			<h3 class="with-line">修改密码</h3>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="changePwdForm">
				<el-form-item prop="oldPwd" label="旧密码">
					<el-input type="password" v-model="ruleForm.oldPwd" placeholder="请输入旧密码"></el-input>
				</el-form-item>
				<el-form-item prop="newPwd" label="新密码">
					<el-input type="password" placeholder="密码长度在6至12位字符" v-model="ruleForm.newPwd"></el-input>
				</el-form-item>
				<el-form-item prop="checkPass" label="确认密码">
					<el-input type="password" placeholder="请再次输入密码" v-model="ruleForm.checkPass"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div style="text-align: center;float:left;width:95%;">
			<el-button class="save-profile" @click="submitForm('ruleForm')">确认修改</el-button>
		</div>
	</div>
</div>
</template>
<script>
	var common_tools=require("common_tools");
	export default {
		data: function() {
			var validateCheckPass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.ruleForm.newPwd) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					oldPwd: '',
					newPwd: '',
					checkPass: '',
				},
				rules: {
					oldPwd: [
						{
							required: true,
							message: '请输入旧密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '密码长度在 6 到 12 个字符',
							trigger: 'blur'
						}
					],
					newPwd: [
						{
							
							required: true,
							message: '请输入新密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '密码长度在 6 到 12 个字符',
							trigger: 'blur'
						}
					],
					checkPass: [
						{
							required: true,
							message: '请再次输入新密码',
							trigger: 'blur'
						},
						{validator:validateCheckPass,trigger:'blur'},
					],
				},
			}
		},
		methods: {
			submitForm(formName) {
				var _self = this;
				_self.$refs[formName].validate((valid) => {
					if(valid) {
						common_tools.AJAX('POST',common_tools.interfaceurl+'user/changePwd',_self.ruleForm,function(data){
							if(data.status == 200){
								if(data.msg=="修改密码成功"){
									_self.$message({
										message:"修改密码成功",
										type:"success"
									})
								}
							}else if(data.status == 404 &&data.msg=="旧密码错误，请重新输入。"){
								_self.$message({
									message:"旧密码错误，请重新输入",
									type:"warning"
								});
								_self.ruleForm.oldPwd='';
							}else{
								alert('传参错误');
							}
						},function(data){
							console.log(data);
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		},
		mounted: function() {
			window.onresize = function(e) {
				var getWindowParm = e.target.innerWidth + 'px ' + (e.target.innerHeight) + 'px';
				$(".changePwd-body").css("background-size", getWindowParm);
			}
		}
	}
</script>
<style>
	.changePwd-body {
		padding: 20px 32px;
		margin-bottom:30px;
		border-radius: 5px;
		color: #fff;
		background: url(../../../public_resource/img/modal-bg.jpg) fixed;
		box-sizing: border-box;
	}
	.changePwd-modal {
		width: 100%;
		float: left;
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
	
	
	
	.changePwd-body .el-form-item__label {
		color: #fff;
	}
	
	.changePwd-body .el-input__inner {
		background: rgba(0, 0, 0, .15);
		border: 1px solid transparent;
		color: #fff;
	}
	
	.changePwd-body .el-input__inner:focus {
		border: 1px solid #209e91;
	}
	
	.changePwdForm {
		margin-top: 15px;
	}
	.changePwdForm .el-input.is-disabled .el-input__inner{
		background:rgba(255,255,255,.05);
		color:#fff;
	}
	.changePwdForm .el-form-item {
		display: inline-block;
		width: 51%;
		box-sizing: border-box;
	}
	.input-new-tag{
		display:inline-block;
		width:20%;
		line-height:36px;
	}
	.changePwd-modal .el-tag{
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
</style>