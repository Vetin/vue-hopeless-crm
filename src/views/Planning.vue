<template>
	<div>
		<Loader
			if="isLoading"
			v-if="isLoading"
		/>
		<div
			class="page-title"
			v-else
		>
			<h3>Планирование</h3>
			<h4>{{ info.bill | currency }}</h4>
		</div>

		<section>
			<div
				v-for="category in categories"
				:key="category.id"
			>
				<p>
					<strong>{{category.title}}:</strong>
					{{ category.spend | currency }} из {{ category.limit | currency }}
				</p>
				<div
					class="progress"
					v-tooltip="category.tooltip"
				>
					<div
						:class="`determinate ${category.progressColor}`"
						:style="{width: category.progressPercent + '%'}"
					></div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import currencyFilter from '@/filters/currency.filter';

export default {
	data: () => ({
		isLoading: false,
		info: null,
		categories: null,
	}),
	computed: {
		comparedRecords ()		{
			if (!this.info || !this.records) {
				return false;
			}

		}
	},
	async mounted ()	{
		await this.$store.dispatch("fetchInfo");
		await this.$store.dispatch("getCategories");
		const records = Object.values(await this.$store.dispatch('getRecords'));
		this.info = { ...this.$store.getters.info };
		const categories = this.$store.getters.categories;
		this.categories = categories.map(category =>		{
			const spend = records
				.filter(r => r.categoryId === category.id)
				.filter(r => r.type === 'outcome')
				.reduce((acc, record) => acc += +record.price, 0);
			const percent = 100 * spend / category.limit;
			const progressPercent = percent > 100 ? 100 : percent;
			const progressColor = percent < 60
				? 'green'
				: percent < 100
					? 'yellow'
					: 'red';
			const tooltipValue = category.limit - spend;
			const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'}
			${currencyFilter(Math.abs(tooltipValue))}`;
			return {
				...category,
				spend,
				progressColor,
				progressPercent,
				tooltip
			};
		});
		this.isLoading = false;
	},
	created ()	{
		this.isLoading = true;
	}
}
</script>

<style>
</style>