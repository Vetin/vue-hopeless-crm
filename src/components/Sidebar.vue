<template>
	<ul
		class="sidenav app-sidenav"
		:class="{open : show}"
	>
		<router-link
			to="/"
			tag="li"
			active-class="active"
			exact
		>
			<a
				href="#"
				class="waves-effect waves-orange pointer"
			>
				{{'Bill' | localize}}</a>
		</router-link>
		<router-link
			to="/history"
			tag="li"
			active-class="active"
		>
			<a
				href="#"
				class="waves-effect waves-orange pointer"
			>{{"History" | localize}}</a>
		</router-link>
		<router-link
			to="/planning"
			tag="li"
			active-class="active"
		>
			<a
				href="#"
				class="waves-effect waves-orange pointer"
			>{{"Planning" | localize}}</a>
		</router-link>
		<router-link
			to="/record"
			tag="li"
			active-class="active"
		>
			<a
				href="#"
				class="waves-effect waves-orange pointer"
			>{{"NewRecord" | localize}}</a>
		</router-link>
		<router-link
			to="/category"
			tag="li"
			active-class="active"
		>
			<a
				href="#"
				class="waves-effect waves-orange pointer"
			>{{"Categories" | localize}}</a>
		</router-link>
	</ul>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			required: true,
		}
	}
}
</script>

<style>
</style>