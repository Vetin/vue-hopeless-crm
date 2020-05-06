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

			<div class="fixed-action-btn">
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

export default {
	components: {
		Navbar,
		Sidebar,
	},
	data: () => ({
		showSidebar: true,
	}),

}
</script>

<style>
</style>