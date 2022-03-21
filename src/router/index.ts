import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

/**
 * named route는 사용하지 않고, path로 통일하여 사용합니다.
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: "/account",
    component: () => import("@/views/account/index.vue"),
  },
  {
    path: "/account/login",
    component: () => import("@/views/account/login.vue"),
  },
  {
    path: "/account/signup",
    component: () => import("@/views/account/signup/index.vue"),
    children: [
      {
        path: "terms",
        meta: {
          step: 1,
        },
        component: () => import("@/views/account/signup/terms/index.vue"),
        children: [
          {
            path: ":id",
            meta: { scrollToTop: false },
            component: () => import("@/views/account/signup/terms/detail.vue"),
          },
        ],
      },
      {
        path: "email",
        meta: { step: 2 },
        component: () => import("@/views/account/signup/email.vue"),
      },
      {
        path: "password",
        meta: { step: 3 },
        component: () => import("@/views/account/signup/password.vue"),
      },
      {
        path: "nickname",
        meta: { step: 4 },
        component: () => import("@/views/account/signup/nickname.vue"),
      },
      {
        path: "done",
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
    component: () => import("@/views/account/find-id/index.vue"),
    children: [
      {
        path: "cert",
        component: () => import("@/views/account/find-id/cert.vue"),
      },
      {
        path: "no-result",
        component: () => import("@/views/account/find-id/no-result.vue"),
      },
      {
        path: "result",
        component: () => import("@/views/account/find-id/result.vue"),
      },
      { path: "", redirect: { path: "/account/find-id/cert" } },
    ],
  },
  {
    path: "/account/find-password",
    component: () => import("@/views/account/find-password/index.vue"),
    children: [
      {
        path: "cert",
        component: () => import("@/views/account/find-password/cert.vue"),
      },
      {
        path: "no-result",
        component: () => import("@/views/account/find-password/no-result.vue"),
      },
      {
        path: "result",
        component: () => import("@/views/account/find-password/result.vue"),
      },
      { path: "", redirect: { path: "/account/find-password/cert" } },
    ],
  },
  { path: "/my", component: () => import("@/views/my/index.vue") },
  {
    path: "/my/setting",
    component: () => import("@/views/my/setting/index.vue"),
  },
  {
    path: "/my/setting/email",
    component: () => import("@/views/my/setting/email.vue"),
  },
  {
    path: "/my/setting/mobile",
    component: () => import("@/views/my/setting/mobile.vue"),
  },
  {
    path: "/my/setting/nickname",
    component: () => import("@/views/my/setting/nickname.vue"),
  },
  {
    path: "/my/setting/password",
    component: () => import("@/views/my/setting/password.vue"),
  },
  {
    path: "/my/setting/push",
    component: () => import("@/views/my/setting/push.vue"),
  },
  {
    path: "/my/customer/request-community",
    component: () => import("@/views/my/customer/request-community.vue"),
  },
  {
    path: "/my/likes",
    component: () => import("@/views/my/likes.vue"),
  },
  {
    path: "/redev/:revId",
    component: () => import("@/views/redev/[revId]/index.vue"),
  },
  {
    path: "/redev/:revId/subscribe",
    component: () => import("@/views/redev/[revId]/subscribe/index.vue"),
  },
  {
    path: "/redev/:revId/subscribe/:subscribeId",
    component: () => import("@/views/redev/[revId]/subscribe/[subscribeId].vue"),
  },
  {
    path: "/redev/:revId/video",
    component: () => import("@/views/redev/[revId]/video/index.vue"),
  },
  {
    path: "/redev/:revId/community/:typeId",
    component: () => import("@/views/redev/[revId]/community/[typeId].vue"),
  },
  {
    path: "/redev/:revId/news/:typeId",
    component: () => import("@/views/redev/[revId]/news/[typeId].vue"),
  },
  {
    path: "/redev/:revId/story",
    component: () => import("@/views/redev/[revId]/story/index.vue"),
  },
  {
    path: "/redev/:revId/story/write",
    component: () => import("@/views/redev/[revId]/story/write.vue"),
  },
  {
    path: "/redev/:revId/story/:storyId",
    component: () => import("@/views/redev/[revId]/story/[storyId].vue"),
  },
  { path: "", component: () => import("@/views/index.vue") },
];

// https://dev.to/uwutrinket/fix-scroll-jump---vue-router-45ja
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition != null) {
      return savedPosition;
    }

    if (to.meta.scrollToTop !== false) {
      return { top: 0, left: 0 };
    }

    return undefined;
  },
});

export default router;
