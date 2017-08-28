
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import './style/globalStyle.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import fastclick from 'fastclick'
import store from './store/store'
// // import invoke from '@/libs/fetchLib'
// import { api } from 'libs/fetchConfig'
// Vue.use(invoke)
// Vue.use(api)
Vue.use(ElementUI)
fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 路由
  store, // 状态管理器
  // invoke, // promising函数
  // api, // 接口
  template: '<App/>',
  components: { App }
})

