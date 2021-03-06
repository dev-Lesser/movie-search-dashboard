import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import axios from 'axios'
import router from './router'
import Carousel3d from 'vue-carousel-3d';

import VueKinesis from "vue-kinesis";

Vue.use(Carousel3d);
Vue.config.productionTip = false
Vue.use(VueKinesis);

new Vue({
  router,
  axios,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
