import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/questions",
    name: "Questions",
    component: () => import("../components/List.vue"),
  },
  {
    path: "/users/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/users/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/questions/ask",
    name: "Ask",
    component: () => import("../views/Ask.vue"),
    beforeEnter: (from, to, next) => {
      if (store.state.user['name']) next();
      else next("/users/login");
    },
  },
  {
    path: "/users/:username",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/tags",
    name: "Tags",
    component: () => import("../views/Tags.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../components/List.vue"),
  },
  {
    path: "/questions/tagged/:tag",
    name: "Tag",
    component: () => import("../components/List.vue"),
  },
  {
    path: "/questions/:id/:title",
    name: "Question",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/Users.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("../views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
