import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import info from './info';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const response = await fetch(
        `http://data.fixer.io/api/latest?access_key=${key}&symbols=EUR,RUB,USD`
      );
      return await response.json();
    },
  },
  getters: {
    error: (state) => state.error,
  },
  modules: {
    auth,
    info,
  },
});
