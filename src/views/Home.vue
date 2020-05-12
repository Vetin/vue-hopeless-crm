<template>
	<div>
		<div class="page-title">
			<h3>Счет</h3>

			<button
				class="btn waves-effect waves-light btn-small"
				@click="refresh"
			>
				<i class="material-icons">refresh</i>
			</button>
		</div>

		<Loader v-if="isLoading" />

		<div
			class="row"
			v-else
		>
			<Bill :rates="currency.rates" />
			<Currency
				:rates="currency.rates"
				:date="currency.date"
			/>
		</div>
	</div>
</template>

<script>
import Bill from '../components/Home/Bill.vue';
import Currency from '../components/Home/Currency.vue';

export default {
	components: {
		Bill,
		Currency
	},
	data: () => ({
		isLoading: true,
		currency: null,
	}),
	methods: {
		async refresh()		{
			await this.getCurrency();
		},
		async getCurrency()		{
			this.isLoading = true;
			this.currency = await this.$store.dispatch('fetchCurrency');
			this.currency.rates.EUR = 1;
			this.isLoading = false;
		}
	},
	async mounted()	{
		await this.getCurrency();
	},
}
</script>
