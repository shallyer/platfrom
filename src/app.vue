<template>
	 <div id="app">
    	<router-view></router-view>	
	 </div>
</template>
<script>
	require('mainCss');
	import store from "store";
	
	export default {
		name: 'app',
    	data:function(){
    		return{
    		}
    	}
		
	}
	
</script>
<style>
	@import "./public_resource/css/main.css";
</style>