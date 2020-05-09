<template>
	<AuthForm
		@change="({value, variable}) => {form[variable] = value}"
		@sendFormHandler="sendFormHandler"
		:password="form.password"
		:email="form.email"
		:name="form.name"
		:rights="form.rights"
		:isSubmited="isSubmited"
		type="register"
	/>
</template>

<script>
import AuthForm from '../components/AuthForm.vue';

export default {
	components: {
		AuthForm,
	},
	data: () => ({
		isSubmited: false,
		form: {
			name: '',
			email: '',
			password: '',
			rights: false
		},
	}),
	methods: {
		async sendFormHandler ()		{
			this.isSubmited = true;
			const data = {
				email: this.form.email,
				password: this.form.password,
				name: this.form.name
			};
			try {
				await this.$store.dispatch('register', data);
				this.$router.push("/");
			} catch (error) {
				this.$store.commit('setError', error.message);
			}
			this.isSubmited = false;
		}
	}
}
</script>

<style>
</style>