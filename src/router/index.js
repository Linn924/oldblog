const Index = () => import( /* webpackChunkName: "index" */ '../components/Index.vue')

// import Home from '../components/Home/Home.vue'
const Home = () => import( /* webpackChunkName: "home_login_life" */ '../components/Home/Home.vue')
// import Login from '../components/Login/Login.vue'
const Login = () => import( /* webpackChunkName: "home_login_life" */ '../components/Login/Login.vue')
// import Life from '../components/Life/Life.vue'
const Life = () => import( /* webpackChunkName: "home_login_life" */ '../components/Life/Life.vue')


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  { path: '/index', component: Index },
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path:'/life', component: Life }
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫 目的是为了防止用户在未登录的状态下 通过路由直接进入有权限的界面
router.beforeEach((to, from, next) => {
  //to 将要访问的路径 from 代表从哪个路径跳转而来 next 是一个函数，表示放行 next('./login') 强制跳转到登录界面
  if (to.path === '/home' || to.path === '/login' || to.path === "/index") {
    next()
  } else {
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
      next('/login') //tokenStr为空表示没有登录 强制跳转到登录页面
    } else {
      next()
    }
  }
})

export default router
