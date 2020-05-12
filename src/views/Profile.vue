<template>
	<div>

		<div class="page-title">
			<h3>{{'ProfileTitle' | localize}} </h3>
		</div>
		<Loader v-if="isLoading" />
		<form
			class="form"
			@submit.prevent="submitHandler"
			v-else
		>
			<div class="input-field">
				<input
					id="description"
					type="text"
					v-model="name"
					@blur="$v.name.$touch()"
				>
				<label for="description">{{'Name' | localize}}</label>
				<span
					class="helper-text invalid"
					v-if="$v.name.$invalid && $v.name.$dirty"
				>{{!$v.name.required ?  ('NameBlank' | localize)  : ('NameLength' | localize)}}</span>
			</div>

			<div class="switch">
				<label>
					English
					<input
						type="checkbox"
						@change="locale = locale === 'ru-RU' ? 'en-EN': 'ru-RU'"
						:checked="locale === 'ru-RU'"
					>
					<span class="lever"></span>
					Русский
				</label>
			</div>

			<button
				class="btn waves-effect waves-light"
				type="submit"
			>
				{{'Update'| localize}}
				<i class="material-icons right">send</i>
			</button>
		</form>
	</div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import msgType from '@/utils/messages.types';

export default {
	data: () => ({
		locale: '',
		name: '',
		isLoading: true,
	}),
	validations: {
		name: {
			required,
			minLength: minLength(3)
		}
	},
	methods: {
		async submitHandler()		{
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}
			try {
				const data = { name: this.name, locale: this.locale };
				const response = await this.$store.dispatch('updateInfo', data);
				this.name = response.name;
				this.message(msgType['changeProfile/success']);
			} catch (error) {
				console.log(error);
			}

		}
	},
	async mounted()	{
		const { name, locale } = this.$store.getters.info;
		this.name = name;
		this.locale = locale;
		if (!name && !locale) {
			const info = await this.$store.dispatch('fetchInfo');
			this.name = info.name;
			this.locale = info.locale;
		}
		this.isLoading = false;
		setTimeout(() => M.updateTextFields());
	},
}
</script>

<style scoped>
.switch {
	margin: 2rem 0;
}
</style>
