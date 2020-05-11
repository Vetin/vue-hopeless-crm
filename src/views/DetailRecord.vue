<template>
	<div>
		<div>
			<Loader v-if="isLoading" />
			<div
				class="center"
				v-else-if="!record"
			>
				<p>
					Запись не найдена
				</p>
				<router-link
					tag="p"
					to="/"
				>Вернуться на главную старнциу</router-link>
			</div>
			<template v-else>
				<div class="breadcrumb-wrap">
					<router-link
						to="/history"
						class="breadcrumb"
					>История</router-link>
					<a class="breadcrumb">
						{{ record.type === 'income' ? 'Доход' : 'Расход'}}
					</a>
				</div>
				<div class="row">
					<div class="col s12 m6">
						<div
							class="card"
							:class="record.type === 'income' ? 'green' : 'red'"
						>
							<div class="card-content white-text">
								<p>Описание: {{ record.description }}</p>
								<p>Сумма: {{ record.price }}</p>
								<p>Категория: {{ record.title 	}}</p>

								<small>{{ new Date(record.date).toLocaleDateString()}}</small>
							</div>
						</div>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		record: null,
		isLoading: true,
	}),
	async mounted ()	{
		try {

			const recordId = this.$route.params.id;
			const record = await this.$store.dispatch('getRecordById', recordId);
			const { title } = await this.$store.dispatch('getCategoryById', record.categoryId);
			this.record = {
				...record,
				title
			};
		} catch (error) {
		}
		this.isLoading = false;
	}
}
</script>

<style>
</style>