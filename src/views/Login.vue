<template>
	<div>
		<AuthForm
			:email="form.email"
			:password="form.password"
			@sendFormHandler="sendFormHandler"
			@change="({ value, variable }) => {this.form[variable] = value}"
			:isSubmited="isSubmited"
			type="login"
		/>
	</div>
</template>

<script>
import AuthForm from '@/components/AuthForm';

export default {
	components: {
		AuthForm,
	},
	data: () => ({
		form: {
			email: '',
			password: '',
		},
		isSubmited: false,
	}),
	methods: {
		sendFormHandler ()		{
			this.isSubmited = true;
			console.log('make request and other logic here');
			// this.$router.push('/');
		},
		change ()		{
			this.form[variable] = value;
		}
	},

	mounted ()	{
		M.updateTextFields();
	},
};
</script>

<style></style>
