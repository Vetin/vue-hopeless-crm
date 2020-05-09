<template>
	<div>
		<div class="page-title">
			<h3>Счет</h3>

			<button class="btn waves-effect waves-light btn-small">
				<i class="material-icons">refresh</i>
			</button>
		</div>

		<Loader v-if="isLoading" />

		<div
			class="row"
			v-else
		>
			<Bill />
			<Currency />
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
	})

}
</script>
