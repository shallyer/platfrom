<template>
	<div class="topBar clearfix">
		<div class="logo">
			SUATEAM
		</div>
		<div class="user-info">
			<!--<div class="bell" @click="alertModal">
				<i class="fa fa-bell-o"></i><span class="bellNum">{{bellNum}}</span>
				<div class="notification-ring"></div>
			</div>
			<div class="envelope">
				<i class="fa fa-envelope-o"></i><span class="envelopeNum">{{envelopeNum}}</span>
				<div class="notification-ring"></div>
			</div>-->
			<!--<el-popover placement="left" width="100" trigger="click">
				<div class="topMessage">您有{{bellNum}}条最新报警消息，<span @click="toAlert">请查看</span></div>
			</el-popover>-->
			<el-dropdown trigger="click" @command="handleCommand">
				<span class="el-dropdown-link">
                    <img class="user-pic" v-bind:src="portrait">
                    {{userName}}
                </span>
				<el-dropdown-menu slot="dropdown" v-if="userName">
					<el-dropdown-item class="userTip" command="userInfo"><i class="fa fa-user"></i>用户信息</el-dropdown-item>
					<el-dropdown-item class="changePwd" command="changePwd"><i class="fa fa-lock"></i>修改密码</el-dropdown-item>
					<el-dropdown-item class="loginOut" command="loginout"><i class="fa fa-power-off"></i>退出</el-dropdown-item>
				</el-dropdown-menu>
				<el-dropdown-menu slot="dropdown" v-if="!userName">
					<el-dropdown-item class="userTip" command="login"><i class="fa fa-sign-in"></i>登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>
<script>
	var common_tools=require("common_tools");
	export default {
		data() {
			return {
				activeIndex: 'monitorCenter',
				bellNum: 5,
				envelopeNum: 5
			}
		},
		computed: {
			userName() {
				let username = sessionStorage.getItem('userName');
				return username ? username : "";
			},
			portrait() {
			 	let portrait = this.$store.state.portrait;
			    return portrait ? portrait : require('./portrait.png');
			}
		},
		watch: {
		  	portrait(val) {
			    this.portrait = val;
			}
		},
		methods: {
			handleCommand(command) {
			var _self=this;
				if(command == 'loginout') {
					common_tools.AJAX('POST',common_tools.interfaceurl+'user/logout',{
					},function(data){
   						if(data.status == 200){
   							sessionStorage.removeItem('userName');
							_self.$store.commit('userIsLoginOut');
							_self.$message({
								message:'退出登录',
								type:'success'
							});
							_self.$router.push('/login');
   						}else{
							alert('传参错误');
						}
   					},function(data){
   						console.log(data);
   					})
				} else if(command == 'changePwd') {
					_self.$router.push('/changePwd');
				}else if(command == 'userInfo') {
					_self.$router.push('/userInfo');
				}else if(command == 'login') {
					_self.$router.push('/login');
				}
			},
			alertModal(){
				$('.el-popover').show();
			},
			toAlert(){
				this.$router.push('/alert');
			}
		},
		mounted: function() {
			var _self=this;
			console.log(this.$store.state.portrait)
			common_tools.AJAX('POST',common_tools.interfaceurl+'user/personalcenter',{
				},function(data){
					if(data.status == 200){
						if(data.data.imgUrl){
							_self.$store.state.portrait=data.data.imgUrl;
						}
						
					}else{
						alert('传参错误');
					}
						
				},function(data){
					console.log(data);
				})
		}
	}
</script>
<style>
	.topBar {
		position: relative;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		width: 100%;
		height: 66px;
		font-size: 2.2rem;
		line-height: 66px;
		color: #fff;
		background: rgba(0, 0, 0, .9);
		z-index: 999;
	}
	
	.topBar .logo {
		float: left;
		font-style: italic;
		font-size: 2.4rem;
		padding-left: 40px;
		font-weight: bold;
		z-index: 99;
	}
	
	.el-menu {
		background: none;
	}
	
	.user-info {
		float: right;
		padding-right: 50px;
		font-size: 16px;
		color: #fff;
		position: relative;
		z-index: 99;
	}
	
	.user-info .el-dropdown-link {
		position: relative;
		display: inline-block;
		padding-left: 50px;
		color: #fff;
		height: 66px;
		cursor: pointer;
		vertical-align: middle;
	}
	
	.user-info .user-pic {
		position: absolute;
		left: 0;
		top: 10px;
		width: 45px;
		height: 45px;
		border-radius: 50%;
	}
	
	.el-dropdown-menu__item {
		text-align: center;
	}
	
	.navBox {
		padding-left: 60px;
		background: #fff;
	}
	
	.el-menu--horizontal .el-submenu .el-menu-item {
		text-align: center;
	}
	
	.el-dropdown-menu {
		border-radius: 4px;
		width: 120px;
	}
	
	.el-dropdown-menu__item {
		font-size: 1.4rem;
		color: #7d7d7d;
		padding-left: 20px;
		text-align: left;
	}
	
	.el-dropdown-menu__item i {
		margin-right: 10px;
	}
	
	.el-dropdown-menu__item:hover {
		color: #262626;
	}
	
	.bell,
	.envelope {
		display: inline-block;
		color: #fff;
		padding-right: 20px;
		position: relative;
		-webkit-transition: color 1.4s ease;
		-moz-transition: color 1.4s ease;
		-ms-transition: color 1.4s ease;
		transition: color 1.4s ease;
		cursor: pointer;
	}
	
	.bell i,
	.envelope i {
		-webkit-transition: color .4s ease;
		-moz-transition: color .4s ease;
		-ms-transition: color .4s ease;
		transition: color .4s ease;
	}
	
	.bell:hover i {
		color: #e85656;
	}
	
	.envelope:hover i {
		color: #209e91;
	}
	
	.bellNum {
		position: absolute;
		top: 16px;
		left: 12px;
		border-radius: 13px;
		background: #e85656;
		padding: 2px 4px;
		text-align: center;
		font-size: 1.2rem;
		line-height: 0.95rem;
	}
	
	.envelopeNum {
		position: absolute;
		top: 16px;
		left: 12px;
		border-radius: 13px;
		background: #209e91;
		padding: 2px 4px;
		text-align: center;
		font-size: 1.2rem;
		line-height: 0.95rem;
	}
	
	.notification-ring {
		position: absolute;
		top: 2px;
		left: -2px;
		border: 1px solid #e85656;
		border-radius: 50%;
		height: 40px;
		width: 40px;
		-webkit-animation: pulsate 8s ease-out infinite;
		-moz-animation: pulsate 8s ease-out infinite;
		-ms-animation: pulsate 8s ease-out infinite;
		animation: pulsate 8s ease-out infinite;
		opacity: 0;
	}
	
	.envelope .notification-ring {
		border: 1px solid #209e91;
	}
	
	@-webkit-keyframes pulsate {
		30% {
			-webkit-transform: scale(.1, .1);
			opacity: 0
		}
		35% {
			opacity: 1
		}
		40% {
			-webkit-transform: scale(1.2, 1.2);
			opacity: 0
		}
	}
	
	@-moz-keyframes pulsate {
		30% {
			-webkit-transform: scale(.1, .1);
			opacity: 0
		}
		35% {
			opacity: 1
		}
		40% {
			-webkit-transform: scale(1.2, 1.2);
			opacity: 0
		}
	}
	
	@-ms-keyframes pulsate {
		30% {
			-webkit-transform: scale(.1, .1);
			opacity: 0
		}
		35% {
			opacity: 1
		}
		40% {
			-webkit-transform: scale(1.2, 1.2);
			opacity: 0
		}
	}
	
	@keyframes pulsate {
		30% {
			-webkit-transform: scale(.1, .1);
			opacity: 0
		}
		35% {
			opacity: 1
		}
		40% {
			-webkit-transform: scale(1.2, 1.2);
			opacity: 0
		}
	}
	.user-info .el-popover{
		line-height: 40px;
	}
	.topMessage{
		color:#209E91;
	}
</style>