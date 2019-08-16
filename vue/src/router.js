import Vue from 'vue';
import Router from 'vue-router';
// import Login from '@/router/login.router.js'
// import Learning from '@/router/learning.router.js'

Vue.use(Router);

// const routes = [
//   {
//     path: '/index',
//     name: 'Index',
//     component: () => import('@/views/netease/Index.vue')
//   },
//   Login,
//   Learning,
//   {
//     path: '*',
//     component: () => import('@/views/netease/Index.vue')
//   }
// ]

// 进阶写法
const subRouters = []
function importAll(r) {
  console.log(r)
  r.keys().forEach(key => {
    console.log(key)
    subRouters.push(r(key).default)
  });
}

importAll(require.context('.', true, /\.router\.js/))

const routes = [
  ...subRouters,
  {
    path: '*',
    component: () => import('@/views/netease/Index.vue')
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});
