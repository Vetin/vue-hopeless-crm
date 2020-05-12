<template>
	<nav class="navbar orange lighten-1">
		<div class="nav-wrapper">
			<div class="navbar-left">
				<a
					href="#"
					@click.prevent="$emit('sideBarHandler')"
				>
					<i class="material-icons black-text">dehaze</i>
				</a>
				<span class="black-text">{{date}}</span>
			</div>

			<ul class="right hide-on-small-and-down">
				<li>
					<a
						class="dropdown-trigger black-text"
						href="#"
						ref="dropdown"
						data-target="dropdown"
					>
						{{name}}
						<i class="material-icons right">arrow_drop_down</i>
					</a>

					<ul
						id='dropdown'
						class='dropdown-content'
					>
						<li>
							<router-link
								to="/profile"
								active-class="active"
								class="black-text"
							>
								<i class="material-icons">account_circle</i>
								{{ 'ProfileTitle' | localize}}
							</router-link>
						</li>
						<li
							class="divider"
							tabindex="-1"
						></li>
						<li>
							<a
								href="#"
								class="black-text"
								@click.prevent="logoutHandler"
							>
								<i class="material-icons">assignment_return</i>
								{{ 'Logout' | localize}}
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
export default {
	methods: {
		async logoutHandler()		{
			await this.$store.dispatch('logout');
			this.$router.push('/login?message=logout');
		}
	},
	data: () => ({
		date: null,
		interval: null,
		dropdown: null,
	}),
	computed: {
		name()		{
			return this.$store.getters.info.name;
		}
	},
	mounted()	{
		this.interval = setInterval(() => { this.date = new Date().toLocaleString(); }, 1000);
		this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
			constrainWidth: false
		});
	},
	beforeDestroy()	{
		clearInterval(this.interval);
		if (this.dropdown && this.dropdown.destroy) {
			this.dropdown.destroy();
		}
	}
}
</script>

<style>
</style>