import Vue from 'vue';
import Router from 'vue-router';
import Netease from './views/netease/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Netease',
      component: Netease,
      children: [
        {
          path: '/index',
          name: 'Index',
          component: () => import('./views/netease/Index.vue')
        }
      ]
    },
    {
      path: '/learning',
      name: 'Learning',
      component:() => import('./views/learning/Index.vue'),
      children: [
        {
          path: '/learning/demoHome',
          name: 'DemoHome',
          component:() => import('./views/learning/Home.vue')
        },
        {
          path: '/learning/about',
          name: 'about',
          meta: {
            requireAuth: true
          },
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/learning/About.vue'),
        },
        {
          path: '/learning/keep',
          name: 'keep',
          component:() => import('./views/learning/KeepAliveDemo.vue')
        },
        {
          path: '/learning/kr',
          name: 'keepRouter',
          component:() => import('./views/learning/KeepRouter.vue'),
          children: [
            {
              path: '/learning/kr/a',
              name: 'KRA',
              component: () => import('./components/learning/A.vue')
            },
            {
              path: '/learning/kr/b',
              name: 'KRB',
              component: () => import('./components/learning/B.vue')
            }
          ]
        },
        {
          path: '/learning/da',
          name: 'DemoA',
          component:() => import('./views/learning/DemoA.vue')
        },
        {
          path: '/learning/db',
          name: 'DemoB',
          component:() => import('./views/learning/DemoB.vue')
        },
        {
          path: '/learning/extends',
          name: 'Extends',
          component:() => import('./views/learning/Extends.vue')
        },
        {
          path: '/learning/plugin',
          name: 'Plugin',
          component:() => import('./views/learning/Plugin.vue')
        },
        {
          path: '/learning/render',
          name: 'RenderDemo',
          component:() => import('./views/learning/RenderDemo.vue')
        }
      ]
    }
  ],
});
