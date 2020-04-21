import Vue from 'vue'
import VueRouter from 'vue-router'
import iView from 'view-design'

import routes from './routers'
import { canTurnTo, getToken, setToken, setTitle } from '@/libs/util'
import config from '@/config'
import store from '@/store'

const { homeName } = config
const LOGIN_PAGE_NAME = 'login'

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

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next()
  else next({ replace: true, name: 'error_401' })
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    next({
      name: LOGIN_PAGE_NAME
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    next()
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    next({
      name: homeName
    })
  } else {
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } else {
      store.dispatch('getUserInfo').then(user => {
        turnTo(to, user.access, next)
      }).catch(() => {
        setToken('')
        next({
          name: 'login'
        })
      })
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
