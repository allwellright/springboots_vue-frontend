import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入Login组件
import Login from '../components/Login.vue'
import Home  from '../components/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"/login"
  },

  {
    path:"/login",
    component: Login
  },

  {
    path:"/home",
    component: Home
  }
]

const router = new VueRouter({
  routes
})
//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  // to 将要访问
  // from 从哪访问
  // next 接着干 next(url) 重定向到url next()继续访问 to路径
  if(to.path=='/login') return next();
  //获取user
  const userFlag = window.sessionStorage.getItem("user");
  if(!userFlag){
    //无值返回登陆页
      return next('/login');
  }
  next(); //符合要求
})
export default router
