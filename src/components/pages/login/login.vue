<template>
    <div class="login-wrap">
        <div class="loginContainer">
            <h1>欢迎登录云网监测平台</h1>
            <div class="loginContainer-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="loginForm">
                    <el-form-item prop="userName" label="用户名">
                        <el-input class="userInput" v-model="ruleForm.userName" placeholder="Username"></el-input>
                    </el-form-item>
                    <el-form-item prop="userPwd" label="密码">
                        <el-input type="password" placeholder="Password" v-model="ruleForm.userPwd" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    </el-form-item>
                    <el-form-item prop="authCode" label="验证码">
                        <el-input placeholder="请输入验证码" v-model="ruleForm.authCode" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    </el-form-item>
                    <div class="authCode">
                        <img :src="authCodeImg" @click="changeAuthCode" alt="验证码" />
                        <span style="font-size:1.4rem;">看不清？点击图片更换验证码</span>
                    </div>
                    <div class="login-btn">
                        <el-button @click="submitForm('ruleForm')">登录</el-button>
                        <span class="toRegister" @click="register">注册账号</span>
                        <span class="forgetPassword" @click="forgetPw">忘记密码?</span>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
var common_tools = require("common_tools");
export default {
    data: function() {
        return {
            ruleForm: {
                userName: '',
                userPwd: '',
                authCode: ''
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
                authCode: [{
                    required: true,
                    message: '请输入验证码',
                    trigger: 'blur'
                }],
            },
            authCodeImg: common_tools.interfaceurl + 'login2/pcrimg'
        }
    },
    methods: {
        submitForm(formName) {
            var _self = this;
            _self.$refs[formName].validate((valid) => {
                if (valid) {
                    common_tools.AJAX('POST', common_tools.interfaceurl + 'user/login', _self.ruleForm, function(data) {
                        if (data.status == 200) {
                            if (data.msg == "用户名和密码不匹配") {
                                _self.$message({
                                    message: '用户名和密码不一致，请重新输入',
                                    type: 'warning'
                                });
                                _self.ruleForm = {
                                        userName: '',
                                        userPwd: '',
                                        authCode: ''
                                    },
                                    _self.changeAuthCode();
                            } else {
                                _self.$message({
                                    message: '登录成功！',
                                    type: 'success'
                                });
                                _self.$store.commit('userIsLogin', _self.ruleForm.userName)
                                sessionStorage.setItem('userName', _self.ruleForm.userName)                                          
                                $('.loginContainer-body').css('background', 'none');
                                $('.loginContainer-body').fadeOut(500);
                                $('.login-wrap').addClass('form-success');
                                setTimeout(function() {
                                    _self.$router.push("/main");
                                }, 1000)
                            }

                        } else {
                            if (data.msg == "验证码错误!请刷新验证码重试!!") {
                                _self.$message({
                                    message: '验证码错误，请重新输入！',
                                    type: 'warning'
                                });
                                _self.changeAuthCode();
                            }
                        }
                    }, function(data) {
                        console.log(data);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        register() {
            this.$router.push('/register');
        },
        changeAuthCode() {
            this.authCodeImg = this.authCodeImg + '?t=' + Math.random();
        },
        forgetPw() {
            this.$router.push('/forgetPw');
        }
    },
    mounted: function() {
        this.changeAuthCode();
    }
}
</script>
<style>
.loginContainer {
    position: absolute;
    top: 45%;
    left: 50%;
    width: 540px;
    height: 410px;
    padding: 32px;
    padding-right: 40px;
    background: rgba(0, 0, 0, .55);
    border-radius: 5px;
    transform: translate(-50%, -50%);
    z-index: 9999;
    box-sizing: border-box;
}

.loginContainer h1 {
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

.login-wrap.form-success .loginContainer {
    background: none;
}

.login-wrap.form-success .loginContainer h1 {
    -webkit-transform: translateY(200px);
    -ms-transform: translateY(200px);
    transform: translateY(200px);
}

.loginContainer .el-form-item.is-required .el-form-item__label:before {
    display: none;
}

.loginContainer .el-form-item__label {
    color: #fff;
}

.loginContainer .el-input__inner {
    border-color: rgba(0, 0, 0, .4);
    background: rgba(0, 0, 0, .4);
    color: #fff;
}

.loginContainer .el-input__inner:focus {
    border-color: #209e91;
}

.loginContainer .el-form-item__label {
    padding-right: 30px;
}

.login-btn {
    text-align: left;
    margin-top: 20px;
    padding-left: 90px;
}

.login-btn button {
    background: none;
    color: #fff;
}

.login-btn button:hover {
    border-color: #209e91;
}

.login-btn span {
    float: right;
    color: #209e91;
    font-size: 1.4rem;
    cursor: pointer;
    transition: all .2s;
}

.login-btn span:hover {
    color: #1b867b;
}

.toRegister,
.forgetPassword {
    height: 36px;
    line-height: 36px;
    margin-left: 16px;
}

.authCode {
    color: #fff;
    padding-left: 90px;
}

.authCode img {
    width: 90px;
    height: 36px;
    vertical-align: middle;
    margin-right: 20px;
    cursor: pointer;
}
</style>