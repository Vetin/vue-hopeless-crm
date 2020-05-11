<template>
	<div>
		<div class="page-title">
			<h3>Категории</h3>
		</div>
		<section>
			<div class="row">
				<Loader v-if="categories === null" />

				<template v-else>
					<Create />
					<Edit
						:categories="categories"
						@updateCategory="updateCategory"
					/>
				</template>
			</div>
		</section>
	</div>
</template>

<script>
import Create from '../components/Category/Create.vue';
import Edit from '../components/Category/Edit.vue';

export default {
	name: 'categories',
	components: {
		Create,
		Edit
	},
	data: () => ({
		categories: null,
	}),
	methods: {
		updateCategory ()		{
			this.categories = this.$store.getters.categories;
		}
	},
	async mounted ()	{
		this.categories = await this.$store.dispatch('getCategories');
	}
}
</script>

<style>
</style>