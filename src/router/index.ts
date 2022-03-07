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
  {
    path: "/account/signup",
    name: "AccountSignup",
    component: () => import("@/views/account/signup/index.vue"),
    children: [
      {
        path: "terms",
        name: "AccountSignupTerms",
        meta: {
          step: 1,
        },
        component: () => import("@/views/account/signup/terms/index.vue"),
        children: [
          {
            path: ":id",
            name: "AccountSignupTermsDetail",
            meta: { scrollToTop: false },
            component: () => import("@/views/account/signup/terms/detail.vue"),
          },
        ],
      },
      {
        path: "email",
        name: "AccountSignupEmail",
        meta: { step: 2 },
        component: () => import("@/views/account/signup/email.vue"),
      },
      {
        path: "password",
        name: "AccountSignupPassword",
        meta: { step: 3 },
        component: () => import("@/views/account/signup/password.vue"),
      },
      {
        path: "nickname",
        name: "AccountSignupNickname",
        meta: { step: 4 },
        component: () => import("@/views/account/signup/nickname.vue"),
      },
      {
        path: "done",
        name: "AccountSignupDone",
        meta: { step: 5 },
        component: () => import("@/views/account/signup/done.vue"),
      },
      {
        path: "",
        redirect: { path: "/account/signup/terms" },
      },
    ],
  },
  {
    path: "/account/find-id",
    name: "AccountFindId",
    component: () => import("@/views/account/find-id/index.vue"),
    children: [
      {
        path: "cert",
        name: "AccountFindIdCert",
        component: () => import("@/views/account/find-id/cert.vue"),
      },
      {
        path: "no-result",
        name: "AccountFindIdNoResult",
        component: () => import("@/views/account/find-id/no-result.vue"),
      },
      {
        path: "result",
        name: "AccountFindIdResult",
        component: () => import("@/views/account/find-id/result.vue"),
      },
      { path: "", redirect: { path: "/account/find-id/cert" } },
    ],
  },
  {
    path: "/account/find-password",
    name: "AccountFindPassword",
    component: () => import("@/views/account/find-password/index.vue"),
    children: [
      {
        path: "cert",
        name: "AccountFindPasswordCert",
        component: () => import("@/views/account/find-password/cert.vue"),
      },
      {
        path: "result",
        name: "AccountFindPasswordResult",
        component: () => import("@/views/account/find-password/result.vue"),
      },
      { path: "", redirect: { path: "/account/find-password/cert" } },
    ],
  },
  { path: "", redirect: { path: "/account" } },
];

// https://dev.to/uwutrinket/fix-scroll-jump---vue-router-45ja
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    return savedPosition ?? (to.meta.scrollToTop ? { top: 0, left: 0 } : undefined);
  },
});

export default router;
