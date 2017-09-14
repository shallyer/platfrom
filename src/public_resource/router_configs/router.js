//this is router config

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
var routesconfig = [{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		component: function (resolve) {
            require(['../../components/pages/login/login.vue'], resolve)
      	}
	},
	{
		path: '/forgetPw',
		component: function (resolve) {
            require(['../../components/pages/forgetPw/forgetPw.vue'], resolve)
      	}
	},
	{
		path: '/register',
		component: function (resolve) {
            require(['../../components/pages/register/register.vue'], resolve)
      	}
	},
	{
		path: '/main',
		component: function (resolve) {
            require(['../../components/pages/main/main.vue'], resolve)
     	},
		children:[
			{
				path: '/welcome',
				component: function (resolve) {
		            require(['../../components/pages/welcome/welcome.vue'], resolve)
		       }
			},
			{
				path: '/userInfo',
				component: function (resolve) {
		            require(['../../components/pages/userInfo/userInfo.vue'], resolve)
		       }
			},
			{
				path: '/changePwd',
				component: function (resolve) {
		            require(['../../components/pages/changePwd/changePwd.vue'], resolve)
		       }
			},
			{
				path: '/website',
				component: function (resolve) {
		            require(['../../components/pages/website/website.vue'], resolve)
		       }
			},
			{
				path: '/problemFeedback',
				component: function (resolve) {
		            require(['../../components/pages/problemFeedback/problemFeedback.vue'], resolve)
		       }
			},
			{
				path: '/notice',
				component: function (resolve) {
		            require(['../../components/pages/notice/notice.vue'], resolve)
		       }
			},
			{
				path: '/SafetyAlarm',
				component: function (resolve) {
		            require(['../../components/pages/SafetyAlarm/SafetyAlarm.vue'], resolve)
		       }
			},
			{
				path: '/sustainMonitor',
				component: function (resolve) {
		            require(['../../components/pages/sustainMonitor/sustainMonitor.vue'], resolve)
		       }
			},
			{
				path: '/chaineMonitor',
				component: function (resolve) {
		            require(['../../components/pages/chaineMonitor/chaineMonitor.vue'], resolve)
		       }
			},
			 // {
			 // 	path:'/report',
			 // 	component:function(resolve){
			 // 		require(['../../component/pages/report/report.vue'],resolve)
			 // 	}
			 // },
			{
				path: '/',
				redirect: '/welcome'
			},
		]
	},

	{
		path: '*',
		component: resolve => require(['../../components/pages/notfound/notfound.vue'], resolve)
	}

];

var router = new VueRouter({
	routes: routesconfig
});

export default router;