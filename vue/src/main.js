import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './plugins/custom/'
import './plugins/element.js'

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

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

// 路由拦截
const a = 1; // 一般在缓存里面（登录用户数据）vuex（store）
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (a === 1) {
      next();
      console.log('main', '我进入了此路由');
    } else {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});

// axios拦截
axios.defaults.timeout = 3000;
// 添加一个请求拦截器
axios.interceptors.request.use((config) => {
  return config;
}, (error) => {
  console.log('请求错误', error);
  return Promise.reject(error);
});

// 移除拦截器
const intercep = axios.interceptors.response.use((response) => {
  // 移除拦截器
  return response;
});

axios.interceptors.request.eject(intercep);
