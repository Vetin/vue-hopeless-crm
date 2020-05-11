import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';

import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'MainLayout', auth: true },
    component: Home,
  },
  {
    path: '/category',
    name: 'Category',
    meta: { layout: 'MainLayout', auth: true },
    component: () => import('../views/Category.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'AuthLayout' },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'AuthLayout' },
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    meta: { layout: 'MainLayout', auth: true },
    component: () => import('../views/DetailRecord.vue'),
  },
  {
    path: '/history',
    name: 'History',
    meta: { layout: 'MainLayout', auth: true },
    component: () => import('../views/History.vue'),
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: { layout: 'MainLayout', auth: true },
    component: () => import('../views/Planning.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'MainLayout', auth: true },
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/record',
    name: 'Record',
    meta: { layout: 'MainLayout', auth: true },
    component: () => import('../views/Record.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some((route) => route.meta.auth);
  if (requireAuth && !currentUser) {
    return next('/login?message=login');
  }
  next();
});

export default router;
