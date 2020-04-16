import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'

Vue.use(VueRouter)

// 禁止全局路由错误处理打印，这个也是vue-router开发者给出的解决方案：
// 原因在于Vue-router在3.1之后把$router.push()方法改为了Promise。所以假如没有回调函数，
// 错误信息就会交给全局的路由错误处理，因此就会报NavigationDuplicated 的错误

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
