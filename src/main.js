import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from "echarts";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '../static/common.css'
import store from './store'

import dataExport from "@/components/dataExport";
Vue.component('dataExport', dataExport)

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;
window.APP_INFO = process.env.APP_INFO

// 注册导航守卫(回调函数)
// router.beforeEach((to, from, next) => {
//   if (to.path === "/login") {
//     next();
//     return;
//   }
//   let token = window.localStorage.getItem('token');
//   if (token) {
//     next()
//   } else {
//     Vue.prototype.$message.error('请先登录');
//     next('/login')
//   }
// })

var whiteList = ['applyAccount', 'login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  let token = window.localStorage.getItem('token');
  if (!token && whiteList.indexOf(to.name) === -1) {
    Vue.prototype.$message.error('请先登录');
    NProgress.done()
    return next({
      name: 'login'
    })
  }
  return next()
})
router.afterEach(() => {
  setTimeout(() => {
    NProgress.done()
  })
})
// let userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}
// let role_id = userInfo.role_id
// Vue.prototype.role_id = role_id


Vue.config.productionTip = false
Vue.prototype.$store = store
/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
}).$mount("#app")
window.app = app
