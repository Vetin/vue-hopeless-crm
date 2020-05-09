<template>
	<div class="grey darken-1 empty-layout">
		<router-view />
	</div>
</template>

<script>
import msgTypes from '@/utils/messages.types';

export default {
	computed: {
		error ()		{
			return this.$store.getters.error;
		}
	},
	watch: {
		error (backendError)		{
			if (backendError === null) {
				return;
			}
			this.$error(msgTypes[backendError] || 'Что-то пошло не так');
			this.$store.commit('setError', null);
		}
	}
}
</script>

<style scoped>
</style>