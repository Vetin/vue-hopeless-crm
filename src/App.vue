<template>
	<div id="app">
		<component :is="layout">
			<router-view />
		</component>
	</div>
</template>
<script>
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

export default {
	computed: {
		layout()		{
			return this.$route.meta.layout || 'AuthLayout';
		}
	},
	components: {
		AuthLayout,
		MainLayout
	}
}
</script>
<style>
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";

#toast-container {
	left: 40% !important;
	bottom: 0 !important;
	top: 5% !important;
	width: fit-content;
}
</style>
