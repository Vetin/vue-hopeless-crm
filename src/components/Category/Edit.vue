<template>
	<div class="col s12 m6">
		<div>
			<div class="page-subtitle">
				<h4>Редактировать</h4>
			</div>

			<form @submit.prevent="submitHandler">
				<label for="select_category">Выберите категорию</label>

				<select
					v-model="select"
					id="select_category"
					style="display: block"
					@change="changeInputsHandler"
				>
					<option
						value=""
						disabled
						selected
						hidden
					>Выберите категорию</option>
					<option
						v-for="(cat, index) in categories"
						:value="index"
						:key="cat.id"
					>
						{{cat.title}}
					</option>
				</select>

				<div class="input-field">
					<input
						type="text"
						id="chose_name"
						v-model="title"
						:class="{invalid: $v.title.$invalid && $v.title.$dirty}"
						:disabled="select === ''"
						@blur="$v.title.$touch()"
					>
					<label for="chose_name">Название</label>
					<span
						class="helper-text invalid"
						v-if="$v.title.$invalid && $v.title.$dirty"
					>Введите название</span>
				</div>

				<div class="input-field">
					<input
						id="limit"
						type="number"
						:class="{invalid: $v.limit.$invalid && $v.limit.$dirty}"
						v-model.number="limit"
						:disabled="select === ''"
						@blur="$v.limit.$touch()"
					>
					<label for="limit">Лимит</label>
					<span
						class="helper-text invalid"
						v-if="$v.limit.$invalid &&$v.limit.$dirty"
					>Введите лимит</span>
				</div>

				<button
					class="btn waves-effect waves-light"
					type="submit"
					:disabled="isSubmit"
				>
					Обновить
					<i class="material-icons right">send</i>
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import { minValue, numeric, required } from 'vuelidate/lib/validators';

export default {
	props: {
		categories: {
			type: Array,
			required: true
		}
	},
	data: () => ({
		select: '',
		title: '',
		limit: '',
		isSubmit: false,
	}),
	validations: {
		title: { required },
		limit: { minValue: minValue(1), numeric, required }
	},
	methods: {
		changeInputsHandler ()		{
			this.title = this.categories[this.select].title;
			this.limit = this.categories[this.select].limit;
			setTimeout(() => { M.updateTextFields(); }, 0);
		},
		async submitHandler ()		{
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}
			try {
				const data = {
					title: this.title,
					limit: this.limit,
					id: this.categories[this.select].id
				};
				const response = await this.$store.dispatch('updateCategory', data);
				this.$emit('updateCategory');
				this.message(response.msg);

			} catch (error) {
				console.log(error);
			}
		}
	}
}
</script>

<style>
</style>