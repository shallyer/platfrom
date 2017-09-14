<template>
	<div class="forget-wrap">
		<div class="forgetContainer">
			<h1>找回密码</h1>
			<div class="forgetContainer-body">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px">
					<el-form-item prop="userName" label="用户名">
						<el-input class="userInput" v-model="ruleForm.userName" placeholder="Username"></el-input>
					</el-form-item>
					<el-form-item prop="mail" label="邮箱">
						<el-input placeholder="请输入绑定的邮箱" v-model="ruleForm.mail" @keyup.enter.native="submitForm('ruleForm')"></el-input>
					</el-form-item>
					<el-form-item prop="authCode" label="验证码">
						<el-input placeholder="请输入验证码" v-model="ruleForm.authCode" @keyup.enter.native="submitForm('ruleForm')"></el-input>
					</el-form-item>
					<div class="authCode">
						<img :src="authCodeImg" @click="changeAuthCode" alt="验证码" />
						<span style="font-size:1.4rem;">看不清？点击图片更换验证码</span>
					</div>
					<div class="forget-btn">
						<el-button @click="submitForm('ruleForm')">提交</el-button>
					</div>
					<div class="forgetTip">邮件已经发送，请进入邮箱查看您的用户名和密码！<br />将在<span>{{count}}</span>秒后跳转至登录页</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	var common_tools=require("common_tools");
	export default {
		data: function() {
			return {
				count:5,
				ruleForm: {
					userName: '',
					mail: '',
					authCode:''
				},
				rules: {
					userName: [
						{
							min: 6,
							max: 12,
							message: '长度在 6 到 12 个字符',
							trigger: 'blur'
						}
					],
					mail: [
						{
							required: true,
							message: '请输入绑定的邮箱',
							trigger: 'blur'
						},
						{
							type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' 
						}
					],
					authCode: [{
							required: true,
							message: '请输入验证码',
							trigger: 'blur'
						}
					],
				},
				authCodeImg: common_tools.interfaceurl+'login2/pcrimg'
			}
		},
		methods: {
			submitForm(formName) {
				var _self = this;
				_self.$refs[formName].validate((valid) => {
					if(valid) {
						common_tools.AJAX('POST',common_tools.interfaceurl+'mail/passwordBackByEmail',_self.ruleForm,function(data){
       						if(data.status==403){
       							_self.$message({
						          	message: '发送成功！',
						          	type: 'success'
						        });
						        $('.forget-btn').hide();
		       					$('.forgetTip').show();
		       					setInterval(function(){
		       						_self.count--;
		       						if(_self.count==0){
		       							_self.$router.push('/login');
		       						}
		       					},1000)
       						}else if(data.status=="404"&&data.msg=="验证码错误!请刷新验证码重试!!"){
       							_self.$message({
						          	message: '验证码错误，请重新输入！',
						          	type: 'warning'
						        });
						        _self.changeAuthCode();
       						}else{
       							alert('传参错误')
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
			register(){
				this.$router.push('/register');
			},
			changeAuthCode(){
				this.authCodeImg=this.authCodeImg+'?t='+Math.random();
			}
		},
		mounted: function() {
			this.changeAuthCode();
		}
	}
</script>

<style>
	
	.forgetContainer {
		position: absolute;
		top: 45%;
		left: 50%;
		width: 540px;
		height:415px;
		padding: 32px;
		padding-right:40px;
		background: rgba(0,0,0,.55);
		border-radius:5px;
		transform: translate(-50%, -50%);
		z-index: 9999;
		box-sizing:border-box;
	}
	
	.forgetContainer h1 {
		font-size:3.2rem;
		font-weight: 300;
	    margin-bottom: 38px;
	    text-align: center;
	    color:#fff;
	    -webkit-transition-duration: 1s;
		transition-duration: 1s;
		-webkit-transition-timing-function: ease-in-put;
		transition-timing-function: ease-in-put;
	}
	.forgetContainer .el-form-item.is-required .el-form-item__label:before{
		display:none;
	}
	.forgetContainer .el-form-item__label{
		color:#fff;
	}
	.forgetContainer .el-input__inner{
		border-color:rgba(0,0,0,.4);
		background:rgba(0,0,0,.4);
		color:#fff;
	}
	.forgetContainer .el-input__inner:focus{
		border-color:#209e91;
	}
	.forgetContainer .el-form-item__label{
		padding-right:30px;
	}
	
	.forget-btn{
		text-align: left;
		margin-top:20px;
		padding-left:90px;
	}
	.forget-btn button{
		background:none;
		color:#fff;
	}
	.forget-btn button:hover{
		border-color:#209e91;
	}
	.forget-btn span{
		float:right;
		color:#209e91;
		font-size:1.4rem;
		cursor:pointer;
		transition:all .2s;
	}
	.forget-btn span:hover{
		color:#1b867b;
	}
	.toRegister,.forgetPassword{
		height:36px;
		line-height:36px;
		margin-left:16px;
	}
	.authCode{
		color:#fff;
		padding-left:90px;
	}
	.authCode img{
		width:90px;
		height:36px;
		vertical-align: middle;
		margin-right:20px;
		cursor:pointer;
	}
	.forgetTip{
		display:none;
		text-align: center;
		padding-left:40px;
		padding-top:26px;
		color:#209e91;
		font-size:1.6rem;
	}
	.forgetTip span{
		color:#ff4949;
		font-size:1.8rem;
	}
</style>