<template>
	<div class="col s12 m6">
		<div>
			<div class="page-subtitle">
				<h4>Создать</h4>
			</div>

			<form
				@submit.prevent="submitHandler"
				ref="createForm"
			>
				<div class="input-field">
					<input
						id="name"
						type="text"
						v-model="title"
						:class="{invalid: $v.title.$invalid && $v.title.$dirty}"
						@blur="$v.title.$touch()"
					>
					<label for="name">Название</label>
					<span
						class="helper-text invalid"
						v-if="$v.title.$invalid && $v.title.$dirty"
					>Введите название</span>
				</div>

				<div class="input-field">
					<input
						id="limit"
						type="number"
						v-model.number="limit"
						:class="{invalid: $v.limit.$invalid && $v.limit.$dirty}"
						@blur="$v.limit.$touch()"
					>
					<label for="limit">Лимит</label>
					<span
						class="helper-text invalid"
						v-if="$v.limit.$invalid && $v.limit.$dirty"
					>Введите лимит</span>
				</div>

				<button
					class="btn waves-effect waves-light"
					type="submit"
					:disalbed="isSubmit"
				>
					Создать
					<i class="material-icons right">send</i>
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import { required, minValue, numeric } from 'vuelidate/lib/validators';


export default {
	data: () => ({
		title: '',
		limit: '',
		isSubmit: false,
	}),
	validations: {
		title: { required },
		limit: { minValue: minValue(1), numeric, required }
	},

	methods: {
		async submitHandler ()		{
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}
			try {
				this.isSubmit = true;
				const data = { title: this.title, limit: this.limit };
				const category = await this.$store.dispatch("createCategory", data);
				this.title = '';
				this.limit = '';
				this.$v.$reset();
				this.message('Категория успешно добавлена');
			} catch (error) {
				console.log(error);
			}
			this.isSubmit = false;
		}
	},
	mounted ()	{
		M.updateTextFields();
	},
}
</script>

<style>
</style>