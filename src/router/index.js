import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Category from '../views/Category.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'MainLayout' },
    component: Home,
  },
  {
    path: '/category',
    name: 'Category',
    meta: { layout: 'MainLayout' },
    component: () => import('../views/Category.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'AuthLayout' },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/detailRecord',
    name: 'Detail',
    meta: { layout: 'MainLayout' },
    component: () => import('../views/DetailRecord.vue'),
  },
  {
    path: '/history',
    name: 'History',
    meta: { layout: 'MainLayout' },
    component: () => import('../views/History.vue'),
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: { layout: 'MainLayout' },
    component: () => import('../views/Planning.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'MainLayout' },
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/record',
    name: 'Record',
    meta: { layout: 'MainLayout' },
    component: () => import('../views/Record.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'AuthLayout' },
    component: () => import('../views/Register.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
