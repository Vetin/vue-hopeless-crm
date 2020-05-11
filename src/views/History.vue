<template>
	<div>
		<div class="page-title">
			<h3>История записей</h3>
		</div>

		<div class="history-chart">
			<canvas></canvas>
		</div>
		<Loader v-if="isLoading" />
		<EmptyCategory v-else-if="records.length === 0" />

		<section v-else>
			<Table :records="items" />
			<Paginate
				v-model="page"
				:page-count="pageCount"
				:click-handler="pageChangeHandler"
				:prev-text="'Предыдущая'"
				:next-text="'Следующая'"
				:container-class="'pagination'"
				:page-class="'waves-effect'"
			/>
		</section>
	</div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixins';
import Table from '@/components/History/Table';


export default {
	data: () => ({
		records: null,
		isLoading: true,
	}),
	mixins: [paginationMixin],
	components: {
		Table
	},
	methods: {
	},
	async mounted ()	{
		const categories = await this.$store.dispatch('getCategories');
		const records = await this.$store.dispatch('getRecords');
		this.setupPagination(this.records = Object.keys(records).map(key =>		{
			const category = categories.filter(el => el.id === records[key].categoryId);
			return {
				...records[key],
				id: key,
				title: category[0].title
			};
		}));

		this.isLoading = false;
	}
}
</script>

<style>
</style>