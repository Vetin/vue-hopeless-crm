import Vue from 'vue';
import Vuelidate from 'vuelidate';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import App from '@/App.vue';
import Loader from '@/components/Loader';
import Message from '@/middleware/utils';
import router from '@/router';
import store from '@/store';
import 'materialize-css';
import currencyFilter from '@/filters/currency.filter';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(Message);
Vue.filter('currency', currencyFilter);
Vue.component('Loader', Loader);

firebase.initializeApp({
  apiKey: 'AIzaSyDncEQ6CrM06qCYu-FHS9UAKcbPyRTrNEw',
  authDomain: 'vue-crm-abe77.firebaseapp.com',
  databaseURL: 'https://vue-crm-abe77.firebaseio.com',
  projectId: 'vue-crm-abe77',
  storageBucket: 'vue-crm-abe77.appspot.com',
  messagingSenderId: '843079180417',
  appId: '1:843079180417:web:1b0989624aafe642b2ad80',
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
