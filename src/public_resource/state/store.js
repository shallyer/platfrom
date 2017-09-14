import "babel-polyfill";
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLogin: false,
		userinfo: {
			username: '',
		},
		portrait: ''
	},
	mutations: {
		userIsLogin(state, user) {
			state.isLogin = true;
			state.userinfo.username = user;
		},
		userIsLoginOut(state) {
			state.isLogin = false;
		}
	}
});