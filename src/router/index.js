const Index = () => import( /* webpackChunkName: "index" */ '../components/Index.vue')

// import Home from '../components/Home/Home.vue'
const Home = () => import( /* webpackChunkName: "home_login_life" */ '../components/Home/Home.vue')
// import Login from '../components/Login/Login.vue'
const Login = () => import( /* webpackChunkName: "home_login_life" */ '../components/Login/Login.vue')
// import Life from '../components/Life/Life.vue'
const Life = () => import( /* webpackChunkName: "home_login_life" */ '../components/Life/Life.vue')

// import Blog from '../components/Blog/Blog.vue'
const Blog = () => import( /* webpackChunkName: "blog_content_template_demo" */ '../components/Blog/Blog.vue')
// import Content from '../components/Blog/Content.vue'
const Content = () => import( /* webpackChunkName: "blog_content_template_demo" */ '../components/Blog/Content.vue')
// import Template from '../components/Blog/Template.vue'
const Template = () => import( /* webpackChunkName: "blog_content_template_demo" */ '../components/Blog/Template.vue')
// import Demo from '../components/Blog/Demo.vue'
const Demo = () => import( /* webpackChunkName: "blog_content_template_demo" */ '../components/Blog/Demo.vue')

// import Nav from '../components/Nav/Nav.vue'
const Nav = () => import( /* webpackChunkName: "nav_link_message" */ '../components/Nav/Nav.vue')
// import Link from '../components/Nav/Link.vue'
const Link = () => import( /* webpackChunkName: "nav_link_message" */ '../components/Nav/Link.vue')
// import Message from '../components/Nav/Message.vue'
const Message = () => import( /* webpackChunkName: "nav_link_message" */ '../components/Nav/Message.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/blog' },
  { path: '/index', component: Index },
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path:'/life', component: Life },
  {
    path: '/blog',
    component: Blog,
    redirect: '/content',
    children: [
      { path: '/content', component: Content },
      { path: '/template', component: Template },
      { path: '/demo', component: Demo }
    ]
  },
  { 
    path: '/nav', 
    component: Nav,
    redirect:'/link',
    children:[
      {path:'/link',component:Link},
      {path:'/message',component:Message}
    ]
  },
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫 目的是为了防止用户在未登录的状态下 通过路由直接进入有权限的界面
router.beforeEach((to, from, next) => {
  //to 将要访问的路径 from 代表从哪个路径跳转而来 next 是一个函数，表示放行 next('./login') 强制跳转到登录界面
  if (to.path === '/index' || to.path === '/login' || to.path === '/content' || to.path === '/template' || to.path === '/link') {
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
