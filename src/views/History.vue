<template>
	<div>
		<div class="page-title">
			<h3>История записей</h3>
		</div>

		<div class="history-chart">
			<canvas ref="canvas"></canvas>
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
import { Pie } from 'vue-chartjs';
import Table from '@/components/History/Table';
import paginationMixin from '@/mixins/pagination.mixins';


export default {
	data: () => ({
		records: null,
		isLoading: true,
	}),
	extends: Pie,
	mixins: [paginationMixin],
	components: {
		Table
	},
	methods: {
		async intiPage (categories, records)		{
			this.setupPagination(this.records = Object.keys(records).map(key =>			{
				const category = categories.filter(el => el.id === records[key].categoryId);
				return {
					...records[key],
					id: key,
					title: category[0].title
				};
			}));
		},
		arrayUnique (records)		{
			for (let i = 0; i < records.length; i++) {
				records.forEach((el, index) =>				{
					if (i === index) {
						return;
					}
					if (records[i].title === el.title) {
						records.splice(index, 1);
					}
				});
			}
			return records;
		},
		initChart (categories, records)		{
			const uniqRecords = this.arrayUnique(records);
			this.renderChart({
				labels: uniqRecords.map(record => { console.log(record); return record.title; }),
				datasets: [{
					label: 'Расходы по категориям',
					data: uniqRecords.map(uniq => records.reduce((acc, record) =>					{
						if (record.categoryId === uniq.categoryId && record.type === 'outcome') {

							acc += +record.price;
						}
						return acc;
					}, 0)
					),
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
					],
					borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
					],
					borderWidth: 1
				}]
			}, {
				responsive: true,
				maintainAspectRatio: false
			});
		}
	},
	async mounted ()	{
		const records = await this.$store.dispatch('getRecords');
		const categories = await this.$store.dispatch('getCategories');
		await this.intiPage(categories, records);
		this.initChart(categories, this.records);
		this.isLoading = false;
	}
}
</script>

<style>
</style>