<template>
	<div>
		<div class="page-title">
			<h3>Новая запись </h3>
		</div>
		<Loader v-if="isLoading" />
		<p
			class="center"
			v-else-if="categories.length === 0"
		>
			Вы еще не добавили ни одной категории
			<router-link
				tag="span"
				to="/categories"
			>Добавить</router-link>
		</p>
		<form
			class="form"
			v-else
			@submit.prevent="submitHandler"
		>
			<div class="input-field">
				<select
					ref="select"
					@change="e => select = e.target.value"
					@blur="$v.select.$touch()"
				>
					<option
						selected
						disabled
						type="hidden"
					>Выберите категорию</option>
					<option
						v-for="category of categories"
						:key="category.id"
						:value="category.id"
					>{{category.title}}</option>
				</select>
				<label>Выберите категорию</label>
				<span
					class="helper-text invalid"
					v-if="$v.select.$dirty && $v.select.$invalid"
				>Выберите категорию</span>
			</div>

			<p>
				<label>
					<input
						class="with-gap"
						name="type"
						type="radio"
						value="income"
						@blur="$v.type.$touch()"
						@click="type = 'income'"
					/>
					<span>Доход</span>
				</label>
			</p>

			<p>
				<label>
					<input
						class="with-gap"
						name="type"
						type="radio"
						value="outcome"
						@blur="$v.type.$touch()"
						@click="type = 'outcome'"
					/>
					<span>Расход</span>
				</label>
			</p>
			<span
				class="helper-text invalid"
				v-if="$v.type.$dirty && $v.type.$invalid"
			>Выберите тип записи</span>
			<div class="input-field">
				<input
					id="amount"
					type="number"
					v-model.number="price"
					@blur="$v.price.$touch()"
					:class="{invalid: $v.price.$dirty && $v.price.$invalid}"
				>
				<label for="amount">Сумма</label>
				<span
					class="helper-text invalid"
					v-if="$v.price.$dirty && $v.price.$invalid"
				>Введите сумму</span>
			</div>

			<div class="input-field">
				<input
					id="description"
					type="text"
					:class="{invalid: $v.description.$dirty && $v.description.$invalid}"
					v-model="description"
					@blur="$v.description.$touch()"
				>
				<label for="description">Описание</label>
				<span
					class="helper-text invalid"
					v-if="$v.description.$dirty && $v.description.$invalid"
				>Введите описание</span>
			</div>

			<button
				class="btn waves-effect waves-light"
				type="submit"
				:disabled="isSubmit"
			>
				Создать
				<i class="material-icons right">send</i>
			</button>
		</form>
	</div>
</template>

<script>
import { required, minValue, minLength } from 'vuelidate/lib/validators';
import msgTypes from '@/utils/messages.types';

export default {
	data: () => ({
		categories: null,
		isLoading: true,
		select: '',
		type: '',
		price: '',
		description: '',
		isSubmit: false

	}),
	validations: {
		select: {
			required
		},
		type: {
			required
		},
		price: {
			required,
			minValue: minValue(1)
		},
		description: {
			required,
			minLength: minLength(3)
		}
	},
	computed: {
		canCreateRecord ()		{
			if (this.type === 'income') {
				return true;
			}
			if (this.$store.getters.info.bill >= this.price) {
				return true;
			}
			return false;
		}
	},
	methods: {
		async submitHandler ()		{
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}
			if (!this.canCreateRecord) {
				this.message(msgTypes['record/have-not-enough-bill']);
				return;
			}
			this.isSubmit = true;
			try {
				const data = {
					categoryId: this.select,
					type: this.type,
					price: this.price,
					description: this.description,
					date: new Date().toJSON()
				};
				await this.$store.dispatch("createRecord", data);
				const bill = this.type === 'income' ?
					this.$store.getters.info.bill + this.price :
					this.$store.getters.info.bill - this.price;
				await this.$store.dispatch("updateInfo", { bill });
				this.$v.$reset();
				this.type = '';
				this.select = '';
				this.price = '';
				this.description = '';
				this.message('Запись успешно создана');
			} catch (error) {
				console.log(error);
			}
			this.isSubmit = false;
		}
	},
	async mounted ()	{
		this.categories = await this.$store.dispatch("getCategories");

		this.isLoading = false;
	},
	updated ()	{
		M.FormSelect.init(this.$refs.select);
	},
	destroyed ()	{
		if (this.$refs.select && this.$refs.select.destroy) {
			this.$refs.select.destroy();
		}
	}

}
</script>

<style>
</style>