// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// API 套件
import axios from 'axios';
import VueAxios from 'vue-axios';
// Bootstrap 套件
import 'bootstrap';
// loading 套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';
// 驗證套件
import VeeValidate from 'vee-validate';
import zh_TW from 'vee-validate/dist/locale/zh_TW';
// currency filter



Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW', zh_TW);



Vue.component('Loading', Loading);
Vue.component('Pagination', Pagination);
Vue.component('AlertMessage', AlertMessage);
Vue.filter('currency', currencyFilter);
Vue.filter('prodCategory', prodCategory);


import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import prodCategory from './filters/prodCategory';
import Pagination from './components/Pagination';
import AlertMessage from './components/AlertMessage';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
