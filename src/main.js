import App from './App.vue'
import router from './router'
import VueJsonp from 'vue-jsonp'
import store from './store'
import './assets/css/global.css'
import axios from 'axios'
import './assets/css/atom-one-dark.css'
import animate from 'animate.css'


// axios.defaults.baseURL='http://139.196.210.43:0924/'
axios.defaults.baseURL='http://127.0.0.1:8888/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

axios.interceptors.response.use(config => {
  return config
})

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VueJsonp)
Vue.use(animate)
Vue.use(VueLazyload)

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

//解决路由跳转报错（Avoided redundant navigation to current location ）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
