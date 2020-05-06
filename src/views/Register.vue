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
		sendFormHandler ()		{
			this.isSubmited = true;
			console.log('register');
		}
	}
}
</script>

<style>
</style>