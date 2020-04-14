import Vue from 'vue'
import iView from 'view-design'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import config from '@/config'

import 'view-design/dist/styles/iview.css'
import '@/assets/icons/iconfont.css'
import './index.less'

// 生产环境下不引入mock
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.config.productionTip = false
Vue.use(iView)

/**
 * 全局注册应用配置
 */
Vue.prototype.$config = config

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
