import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        requireAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/keep',
      name: 'keep',
      component:() => import('./views/KeepAliveDemo.vue')
    },
    {
      path: '/kr',
      name: 'keepRouter',
      component:() => import('./views/KeepRouter.vue'),
      children: [
        {
          path: '/kr/a',
          name: 'KRA',
          component: () => import('./components/A.vue')
        },
        {
          path: '/kr/b',
          name: 'KRB',
          component: () => import('./components/B.vue')
        }
      ]
    },
    {
      path: '/da',
      name: 'DemoA',
      component:() => import('./views/DemoA.vue')
    },
    {
      path: '/db',
      name: 'DemoB',
      component:() => import('./views/DemoB.vue')
    },
    {
      path: '/extends',
      name: 'Extends',
      component:() => import('./views/Extends.vue')
    },
    {
      path: '/plugin',
      name: 'Plugin',
      component:() => import('./views/Plugin.vue')
    },
    {
      path: '/render',
      name: 'RenderDemo',
      component:() => import('./views/RenderDemo.vue')
    }
  ],
});
