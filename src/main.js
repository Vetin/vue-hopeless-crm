import Vue from 'vue';
import Vuelidate from 'vuelidate';
import firebase from 'firebase/app';
import Paginate from 'vuejs-paginate';
import 'firebase/auth';
import 'firebase/database';

import App from '@/App.vue';
import currencyFilter from '@/filters/currency.filter';
import localizeFilter from '@/filters/localize.filter';
import EmptyCategory from '@/components/EmptyCategory';
import Loader from '@/components/Loader';
import Message from '@/middleware/utils';
import router from '@/router';
import store from '@/store';
import tooltipDirective from '@/directives/tooltip.directives';
import 'materialize-css';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(Message);
Vue.directive('tooltip', tooltipDirective);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.component('Loader', Loader);
Vue.component('EmptyCategory', EmptyCategory);
Vue.component('Paginate', Paginate);

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE,
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
