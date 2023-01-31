import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';
import store from "../store";

const routes = [
    { path: '/', name: 'HomeView', component: Home },
    { path: '/questions', name: 'List', component: () => import('../components/List.vue') },
    { path: '/users/signup', name: 'Signup', component: () => import('../views/Signup.vue') },
    { path: '/users/login', name: 'Login', component: () => import('../views/Login.vue') },
    { path: '/ask', name: 'Ask', component: () => import('../views/Ask.vue'), beforeEnter: (from, to, next) => { if(store.state.user.name)next();else next('/users/login') } },
    { path: '/users/:username', name: 'Profile', component: () => import('../views/Profile.vue') },
    { path: '/questions/:id/:title', name: 'Question', component: () => import('../views/Detail.vue') },
    { path: '/users', name: 'Users', component: () => import('../views/Users.vue') },
    { path: '/:catchAll(.*)', name: '404', component: () => import('../views/404.vue') }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;