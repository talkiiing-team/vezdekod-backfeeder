import { createRouter, createWebHistory } from 'vue-router';
import api from '@/api';
import Home from '@/views/Home.vue';
import Auth from '@/views/admin/Auth.vue';
import Panel from '@/views/admin/Panel.vue';
import Stats from '@/views/admin/Stats.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Auth,
    meta: {
      requiresNotAuth: true,
    },
  },
  {
    path: '/admin/panel',
    component: Panel,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin/stats',
    component: Stats,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const { authorized } = api.getters;
    if (!authorized.value) {
      console.log('not auth, checkin');
      await api.attemptToAuthorize();
    }
    if (!authorized.value) {
      console.log('not auth after checkin');
      next('/admin');
      return;
    }
    next();
    return;
  }
  if (to.meta.requiresNotAuth) {
    const { authorized } = api.getters;
    await api.attemptToAuthorize();
    if (authorized.value) {
      next('/admin/panel');
      return;
    }
    next();
    return;
  }
  next();
});

export default router;
