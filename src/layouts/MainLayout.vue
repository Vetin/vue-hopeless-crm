<template>
	<div>
		<div class="app-main-layout">
			<Navbar @sideBarHandler="showSidebar = !showSidebar" />
			<Sidebar
				v-if="showSidebar"
				:show="showSidebar"
			/>
			<main
				class="app-content"
				:class="{full: !showSidebar}"
			>
				<div class="app-page">
					<router-view />

				</div>
			</main>

			<div
				class="fixed-action-btn"
				v-tooltip="'Добавить новую запись'"
			>
				<router-link
					class="btn-floating btn-large blue"
					to="/record"
					v-if="$route.path !== '/record'"
				>
					<i class="large material-icons">add</i>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Sidebar from '@/components/Sidebar';
import msgTypes from '@/utils/messages.types';

export default {
	components: {
		Navbar,
		Sidebar,
	},
	data: () => ({
		showSidebar: true,
	}),
	computed: {
		error()		{
			return this.$store.getters.error;
		}
	},
	watch: {
		error(backendError)		{
			if (backendError === null) {
				return;
			}
			this.$error(msgTypes[backendError] || 'Что-то пошло не так');
			this.$store.dispatch('setError', null);
		}
	},
	async mounted()	{
		if (!Object.keys(this.$store.getters.info).length) {
			await this.$store.dispatch('fetchInfo');
		}
	}
}
</script>

<style>
</style>