<template>
	<div>
		<AuthForm
			:email="form.email"
			:password="form.password"
			@sendFormHandler="sendFormHandler"
			ndFormHandler="sendFormHandler"
			@change="({ value, variable }) => {this.form[variable] = value}"
			:isSubmited="isSubmited"
			type="login"
		/>
	</div>
</template>

<script>
import AuthForm from '@/components/AuthForm';
import msgTypes from '@/utils/messages.types';

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
		async sendFormHandler()		{
			this.isSubmited = true;
			const data = {
				email: this.form.email,
				password: this.form.password,
			};
			try {
				await this.$store.dispatch('login', data);
				this.$router.push('/');
			} catch (error) {
				this.$store.dispatch('setError', error.message);
			}
			this.isSubmited = false;
		},
		change()		{
			this.form[variable] = value;
		}
	},
	mounted()	{
		if (this.$route.query.message) {
			this.message(msgTypes[this.$route.query.message]);
			// this.$route.query;
		}
	}
};
</script>

<style></style>
