import Vue from 'vue'
import iView from 'view-design'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'view-design/dist/styles/iview.css'
import '@/assets/icons/iconfont.css'
import './index.less'

Vue.config.productionTip = false
Vue.use(iView)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
