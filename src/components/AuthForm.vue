<template>
	<form
		class="card auth-card"
		@submit.prevent="validateForm"
	>
		<div class="card-content">
			<span class="card-title">Домашняя бухгалтерия </span>
			<div class="input-field">
				<input
					id="email"
					type="text"
					class="validate"
					:value="email"
					@input="e => {$emit('change', {value :e.target.value, variable: 'email'})}"
					@blur="$v.email.$touch"
				/>
				<label for="email">Email</label>
				<small
					class="helper-text invalid"
					v-if="$v.email.$invalid && $v.email.$dirty && !$v.email.$email"
				>Введите корректный имейл</small>
				<small
					class="helper-text invalid"
					v-if="isClick && !$v.email.$required && $v.email.$invalid "
				>Поле email обязательно к заполнению</small>
			</div>
			<div class="input-field">
				<input
					id="password"
					type="password"
					class="validate"
					:value="password"
					@input="e => {$emit('change', {value :e.target.value, variable: 'password'})}"
					@blur="$v.password.$touch"
				/>
				<label for="password">Пароль</label>
				<small
					class="helper-text invalid"
					v-if="$v.password.$invalid && $v.password.$dirty && !$v.password.minLength"
				>Пароль должен включать минимум шесть символов</small>
				<small
					class="helper-text invalid"
					v-if="isClick && !$v.password.$required && $v.password.$invalid"
				>Поле пароль обязательно к заполнению</small>
			</div>
			<template v-if="type === 'register'">
				<div class="input-field">
					<input
						id="text"
						type="text"
						class="validate"
						:value="name"
						@input="e => {$emit('change', {value :e.target.value, variable: 'name'})}"
						@blur="$v.password.$touch"
					/>
					<label for="password">Имя</label>
					<small
						class="helper-text invalid"
						v-if="$v.name.$invalid && $v.name.$dirty && !$v.name.minLength"
					>Имя должно быть длинее трех</small>
					<small
						class="helper-text invalid"
						v-if="isClick && !$v.name.$required && $v.name.$invalid"
					>Имя обязательно к заполнению</small>
				</div>
				<p>
					<label>
						<input
							type="checkbox"
							:checked="rights"
							@change="(e) => {$emit('change', {value : !rights, variable: 'rights'})}"
						/>
						<span>С правилами согласен</span>

					</label>
				</p>
				<small
					class="helper-text invalid"
					v-if="isClick && !$v.rights.checked"
				>Соглашение с правилами обязательно</small>
			</template>
		</div>
		<div class="card-action">
			<div>
				<button
					class="btn waves-effect waves-light auth-submit"
					type="submit"
					:disabled="isSubmited"
				>
					{{type === 'register' ? 'Зарегистрироваться' : 'Войти'}}
					<i class="material-icons right">send</i>
				</button>
			</div>

			<p class="center">
				{{type === 'register' ? 'Уже есть аккаунт?':'Нет аккаунта?'}}
				<router-link :to="type === 'register' ? '/login' : '/register' ">{{type === 'register' ?'Войти' : 'Зарегистрироваться'}}</router-link>
			</p>
		</div>
	</form>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';

export default {
	props: {
		email: {
			type: String,
			required
		},
		password: {
			type: String,
			required
		},
		isSubmited: {
			type: Boolean,
			required
		},
		type: {
			type: String,
			required
		},
		name: {
			type: String,
		},
		rights: {
			type: Boolean,
		}
	},
	data ()	{
		return {
			propsType: this.type,
			isClick: false
		};
	},
	validations: {
		email: {
			required,
			email,
		},
		password: {
			minLength: minLength(6),
			required,
		},
		name: {
			minLength: minLength(3),
			required
		},
		rights: {
			checked: v => v,
		}
	},
	created ()	{
		if (this.$props.type === 'register' && this.$props.name === undefined) {
			throw new Error('You should bind name params in register form');

		}
	},
	methods: {
		validateForm ()		{
			this.$v.email.$touch();
			if (this.$v.$invalid) {
				this.isClick = true;
				return;
			}
			this.$emit('sendFormHandler');
		}
	}
}
</script>

<style>
</style>