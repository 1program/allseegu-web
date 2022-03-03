import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/account",
    name: "Account",
    component: () => import("@/views/account/index.vue"),
  },
  {
    path: "/account/login",
    name: "AccountLogin",
    component: () => import("@/views/account/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
