<template>
	<div class="wrapper">
		<v-header></v-header>
		<v-sidebar></v-sidebar>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	import vHeader from '../../common/header/header.vue';
	import vSidebar from '../../common/sidebar/sidebar.vue';
	export default {
		components:{vHeader,vSidebar}
	}
</script>