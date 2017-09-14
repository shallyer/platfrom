<template>
	<div class="login-wrap">
		<div class="registerContainer">
			<h1>注册账号</h1>
			<div class="registerContainer-body">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="loginForm">
					<el-form-item prop="userName" label="用户名">
						<el-input class="userInput" v-model="ruleForm.userName" placeholder="长度在6-12位字符"></el-input>
					</el-form-item>
					<el-form-item prop="userPwd" label="密码">
						<el-input type="password" placeholder="密码长度在6至12位字符" v-model="ruleForm.userPwd" @keyup.enter.native="submitForm('ruleForm')"></el-input>
					</el-form-item>
					<el-form-item prop="checkPass" label="确认密码">
						<el-input type="password" placeholder="请再次输入密码" v-model="ruleForm.checkPass" @keyup.enter.native="submitForm('ruleForm')"></el-input>
					</el-form-item>
					<el-form-item prop="authCode" label="验证码">
						<el-input placeholder="请输入验证码" v-model="ruleForm.authCode" @keyup.enter.native="submitForm('ruleForm')"></el-input>
					</el-form-item>
					<div class="authCode">
						<img :src="authCodeImg" @click="changeAuthCode" alt="验证码" />
						<span style="font-size:1.4rem;">看不清？点击图片更换验证码</span>
					</div>
					<div class="register-btn">
						<el-button @click="submitForm('ruleForm')">注册</el-button>
						<span class="toLogin" @click="toLogin">已有账号，直接登录</span>
					</div>
				</el-form>
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
				} else if(value !== this.ruleForm.userPwd) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					userName: '',
					userPwd: '',
					checkPass: '',
					authCode:'',
					email:''
				},
				rules: {
					userName: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '长度在 6 到 12 个字符',
							trigger: 'blur'
						}
					],
					userPwd: [{
							required: true,
							message: '请输入密码',
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
						{validator:validateCheckPass,trigger:'blur'},
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
						common_tools.AJAX('POST',common_tools.interfaceurl+'user/register',_self.ruleForm,function(data){
       						if(data.status == 200){
       							if(data.msg == "用户存在"){
       								_self.$message({
							          	message: '该用户已被注册，请重新输入！',
							          	type: 'error'
							        });
							        _self.ruleForm={
										userName: '',
										userPwd: '',
										checkPass: '',
										authCode:''
									};
									_self.changeAuthCode();
       							}else if(data.msg=="验证码错误!请刷新验证码重试!!"){
       								_self.$message({
							          	message: '验证码错误，请刷新验证码重试！',
							          	type: 'warning'
							        });
       							}else{
       								_self.$message({
							          	message: '恭喜您，注册成功！',
							          	type: 'success'
							        });
							        _self.$store.commit('userIsLogin',_self.ruleForm.userName)
							        sessionStorage.setItem('userName',_self.ruleForm.userName)
									$('.registerContainer').css('background', 'none');
									$('.registerContainer-body').fadeOut(500);
									$('.registerContainer h1').html('欢迎您的加入');
									$('.login-wrap').addClass('form-success');
									setTimeout(function() {
										_self.$router.push('/main');
									}, 1000)
       							}
       							
       						}else{
       							if(data.msg=="验证码错误!请刷新验证码重试!!"){
       								_self.$message({
							          	message: '验证码错误，请重新输入！',
							          	type: 'warning'
							        });
							        _self.changeAuthCode();
       							}
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
			toLogin() {
				this.$router.push('/login');
			},
			changeAuthCode(){
				this.authCodeImg=this.authCodeImg+'?t='+Math.random();
			}
		},
		mounted: function() {
			this.changeAuthCode();
			/*$('#login-button').click(function() {
				console.log('sd');
				$('.loginForm').fadeOut(500);
				$('.login-wrap').addClass('form-success');
			});*/
		}
	}
</script>

<style>
	.registerContainer {
		position: absolute;
		top: 45%;
		left: 50%;
		width: 540px;
		height: 470px;
		padding: 32px;
		padding-right: 40px;
		background: rgba(0, 0, 0, .55);
		border-radius: 5px;
		transform: translate(-50%, -50%);
		z-index: 9999;
		box-sizing: border-box;
	}
	
	.registerContainer h1 {
		font-size: 3.2rem;
		font-weight: 300;
		margin-bottom: 38px;
		text-align: center;
		color: #fff;
		-webkit-transition-duration: 1s;
		transition-duration: 1s;
		-webkit-transition-timing-function: ease-in-put;
		transition-timing-function: ease-in-put;
	}
	
	.login-wrap.form-success .registerContainer {
		background: none;
	}
	
	.login-wrap.form-success .registerContainer h1 {
		-webkit-transform: translateY(200px);
		-ms-transform: translateY(200px);
		transform: translateY(200px);
	}
	
	.registerContainer .el-form-item.is-required .el-form-item__label:before {
		display: none;
	}
	
	.registerContainer .el-form-item__label {
		color: #fff;
	}
	
	.registerContainer .el-input__inner {
		border-color: rgba(0, 0, 0, .4);
		background: rgba(0, 0, 0, .4);
		color: #fff;
	}
	
	.registerContainer .el-input__inner:focus {
		border-color: #209e91;
	}
	
	.registerContainer .el-form-item__label {
		padding-right: 30px;
	}
	
	.register-btn {
		text-align: left;
		padding-left: 90px;
		margin-top:20px;
	}
	
	.register-btn button {
		background: none;
		color: #fff;
	}
	
	.register-btn button:hover {
		border-color: #209e91;
	}
	
	.register-btn span {
		float: right;
		color: #209e91;
		font-size: 1.4rem;
		cursor: pointer;
		transition: all .2s;
	}
	
	.register-btn span:hover {
		color: #1b867b;
	}
	
	.toRegister,
	.forgetPassword {
		height: 36px;
		line-height: 36px;
		margin-left: 16px;
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
</style>