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
		component: resolve => require(['../../components/pages/login/login.vue'], resolve)
	},
	{
		path: '/forgetPw',
		component: resolve => require(['../../components/pages/forgetPw/forgetPw.vue'], resolve),
	},
	{
		path: '/register',
		component: resolve => require(['../../components/pages/register/register.vue'], resolve)
	},
	
	{
		path: '/main',
		component: resolve => require(['../../components/pages/main/main.vue'], resolve),
		children:[
			{
				path: '/main/userInfo',
				component: resolve => require(['../../components/pages/userInfo/userInfo.vue'], resolve)
			},
			{
				path: '/main/changePwd',
				component: resolve => require(['../../components/pages/changePwd/changePwd.vue'], resolve)
			},
			{
				path: '/main/website',
				component: resolve => require(['../../components/pages/website/website.vue'], resolve)
			},
			{
				path: '/main/problemFeedback',
				component: resolve => require(['../../components/pages/problemFeedback/problemFeedback.vue'], resolve)
			},
			{
				path: '/main/notice',
				component: resolve => require(['../../components/pages/notice/notice.vue'], resolve)
			},
			{
				path: '/main/SafetyAlarm',
				component: resolve => require(['../../components/pages/SafetyAlarm/SafetyAlarm.vue'], resolve)
			},
			{
				path: '/main/welcome',
				component: resolve => require(['../../components/pages/welcome/welcome.vue'], resolve)
			},
			{
				path: '/main/sustainMonitor',
				component: resolve => require(['../../components/pages/sustainMonitor/sustainMonitor.vue'], resolve)
			},
			{
				path: '/main/chaineMonitor',
				component: resolve => require(['../../components/pages/chaineMonitor/chaineMonitor.vue'], resolve)
			},
			{
				path: '/main/report',
				component: resolve => require(['../../components/pages/report/report.vue'], resolve)
			}
		]
	},

	{
		path: '*',
		component: resolve => require(['../../components/pages/notfound/notfound.vue'], resolve)
	}

];

var router = new VueRouter({
	//mode: 'history',
	routes: routesconfig
});

export default router;