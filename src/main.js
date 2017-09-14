//application entry
import "babel-polyfill";
import Vue from "vue";
import store from "store";
import App from './app';
import Router from "./public_resource/router_configs/router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import echarts from 'echarts';
import 'font-awesome/css/font-awesome.min.css';
import animate from 'animate.css';
Vue.prototype.$echarts=echarts;
Vue.use(ElementUI);
new Vue({
    el: '#app',
    store,
    router: Router,
    render: h => h(App),
    mounted:function(){
    	var ishasusername = sessionStorage.getItem("userName"); 
    	if(typeof(ishasusername) ==='string'){
    		store.commit('userIsLogin',ishasusername);
    	};
    }
})
