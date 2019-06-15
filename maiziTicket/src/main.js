// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VuePaginate from "vue-paginate";
import axios from "axios";
import store from "./store";
import 'url-search-params-polyfill';

Vue.use(VuePaginate);

Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;
axios.defaults.baseURL = 'http://192.168.43.9:520'

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
});

