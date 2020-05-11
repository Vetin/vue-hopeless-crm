<template>
	<table>
		<thead>
			<tr>
				<th>#</th>
				<th>Сумма</th>
				<th>Дата</th>
				<th>Категория</th>
				<th>Тип</th>
				<th>Открыть</th>
			</tr>
		</thead>

		<tbody>
			<tr
				v-for="(record, index) in records"
				:key="record.id"
			>
				<td>{{ index + 1 }}</td>
				<td>{{record.price}}</td>
				<td>{{new Date(record.date).toLocaleDateString()}}</td>
				<td>{{record.title}}</td>
				<td>
					<span
						class="white-text badge red"
						v-if="record.type === 'outcome'"
					>Расход</span>
					<span
						class="white-text badge green"
						v-else
					>Доход</span>
				</td>
				<td>
					<button
						class="btn-small btn"
						v-tooltip="'Посмотреть запись'"
						@click="$router.push(`/detail/${record.id}`)"
					>
						<i class="material-icons">open_in_new</i>
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	props: {
		records: {
			type: Array,
			required: true
		}
	}
}
</script>

<style>
</style>