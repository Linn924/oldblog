import App from './App.vue'
import router from './router'
import VueJsonp from 'vue-jsonp'
import store from './store'
import './assets/css/global.css'
import './assets/css/atom-one-dark.css'
import animate from 'animate.css'
import './assets/font/iconfont.css'
import './assets/font/iconfont.js'

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

//处理时间格式的过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
