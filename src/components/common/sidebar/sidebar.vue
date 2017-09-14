<template>
    <div class="sidebar">
        <el-menu :default-active="welcome" class="sidebar-menu" theme="dark" unique-opened router >
            <el-menu-item index="welcome"><i class="fa fa-home"></i>概览</el-menu-item>
            <el-menu-item index="website"><i class="fa fa-globe"></i>站点维护</el-menu-item>
            <el-menu-item index="notice"><i class="fa fa-envelope"></i>消息通知</el-menu-item>
            <el-menu-item index="SafetyAlarm"><i class="fa fa-bell"></i>安全报警</el-menu-item>
            <el-submenu index="4">
                <template slot="title"><i class="fa fa-cube"></i>性能监控</template>
                <el-menu-item index="sustainMonitor"><span class="subcates">持续性监测</span></el-menu-item>
                <el-menu-item index="chaineMonitor"><span class="subcates">外链监测</span></el-menu-item>
            </el-submenu>
            <el-menu-item index="report"><i class="fa fa-print"></i>报表输出</el-menu-item>
            <el-submenu index="6">
                <template slot="title"><i class="fa fa-cog"></i>系统管理</template>
                <el-menu-item index="userInfo"><span class="subcates">用户信息</span></el-menu-item>
                <el-menu-item index="changePwd"><span class="subcates">修改密码</span></el-menu-item>
                <el-menu-item index="problemFeedback"><span class="subcates">问题反馈</span></el-menu-item>
            </el-submenu>
        </el-menu>
        <div class="menu-toggle" @click="menuToggle">
        	隐藏菜单
        </div>
    </div>
</template>

<script>
    export default {
    	data (){
    		return {
    		}
    	},
    	methods:{
    		menuToggle(){
    			$('.sidebar').toggleClass('sidebarW0');
    			if($('.sidebar').hasClass('sidebarW0')){
    				$('.menu-toggle').html('显示菜单');
    			}else{
    				$('.menu-toggle').html('隐藏菜单');
    			}
    			
    			$('.content').toggleClass('contentOpen');
    		}
    	}
    }
</script>

<style>
    .sidebar{
        display: block;
        position: fixed;
        width: 220px;
        left: 0;
        top: 66px;
        height:100%;
        background: rgba(0,0,0,.5);
        -webkit-transition:all 0.3s linear;
		-moz-transition:all 0.3s linear;
		-o-transition:all 0.3s linear;
		-ms-transition:all 0.3s linear;
		transition:all 0.3s linear;
		z-index:999;
    }
    .sidebar-menu{
    	overflow:hidden;
    }
    .sidebarW0{
    	width:0;
    }
    .el-menu--collapse {
	    width: 64px !important;
    }
    .menu-toggle{
    	position:absolute;
    	width:20px;
    	padding:10px 0;
    	top:50%;
    	left:100%;
    	transform: translateY(-50%);
    	background:#209e91;
    	color:#fff;
    	text-align: center;
    	border-radius:0 6px 6px 0;
    	cursor:pointer;
    	font-size:1.4rem;
    }
    .el-menu-item.is-active{
    	background:#209e91;
    }
    .el-menu-item.is-active:hover{
    	background:#209e91 !important;
    	color:#fff !important;
    }
    .subcates{
    	padding-left:9px;
    }
</style>
