// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'    //导入vueRouter
import './http'    //导入axios相关
import config from "./config"
import Vuetify from 'vuetify' //导入vuetify
import 'vuetify/dist/vuetify.min.css'   //导入vuetifyCSS
import './assets/material.css'
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// post请求是格式化数据
import qs from 'qs';

Vue.prototype.$qs = qs;
Vue.use(elementUI);
Vue.use(Vuetify, { theme: config.theme})
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  template: '<App/>'
})
