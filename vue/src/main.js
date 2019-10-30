import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './plugins/custom/'
import './plugins/element.js'
import GUI from '../packages/index'
import '../packages/theme/src/index.scss'
Vue.use(GUI)

import gc from 'gw-clipboard'
Vue.use(gc)

import { checkRights } from './common/userRights.js'

Vue.config.productionTip = false;

// 路由拦截
let token = sessionStorage.getItem('token')

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

// 自定义指令，控制权限
Vue.directive('display-key', {
  inserted(el, binding) {
    const displayKey = binding.value
    if (displayKey) {
      const isHas = checkRights(displayKey)
      // 没有权限
      if (!isHas) {
        // 判断父节点存在，存在的话移除子节点
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('你应该添加display-key')
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
