import Vue from 'vue';
import Vuelidate from 'vuelidate';

import App from '@/App.vue';
import Message from '@/middleware/utils';
import router from '@/router';
import store from '@/store';
import 'materialize-css';

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(Message);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
