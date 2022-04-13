import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

/**
 * named route는 사용하지 않고, path로 통일하여 사용합니다.
 *
 * children을 사용하는 경우
 * -> 서브레이아웃으로 표현되어야 할 경우.
 *    부모 페이지에 <router-view />를 삽입해 자식들을 렌더하게 됩니다.
 *
 * children을 사용하지 않는 경우
 * -> 하위 라우트가 맞더라도,
 *    서브레이아웃이 아닌 별도 페이지로 이동되어야 할 경우
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: "/permissions",
    component: () => import("@/views/permissions.vue"),
    meta: { public: true },
  },
  {
    path: "/account",
    component: () => import("@/views/account/index.vue"),
    meta: { public: true },
  },
  {
    path: "/account/login",
    component: () => import("@/views/account/login.vue"),
    meta: { public: true },
  },
  {
    path: "/account/signup",
    component: () => import("@/views/account/signup/index.vue"),
    meta: { public: true },
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
    meta: { public: true },
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
    meta: { public: true },
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
    path: "/my/setting/alim",
    component: () => import("@/views/my/setting/alim.vue"),
  },
  {
    path: "/my/customer/request",
    component: () => import("@/views/my/customer/request/index.vue"),
  },
  {
    path: "/my/customer/request/write",
    component: () => import("@/views/my/customer/request/write.vue"),
  },
  {
    path: "/my/customer/request/:request_id",
    component: () => import("@/views/my/customer/request/[request_id].vue"),
  },
  {
    path: "/my/customer/notice",
    component: () => import("@/views/my/customer/notice/index.vue"),
  },
  {
    path: "/my/customer/notice/:notice_id",
    component: () => import("@/views/my/customer/notice/[notice_id].vue"),
  },
  {
    path: "/my/customer/faq",
    component: () => import("@/views/my/customer/faq.vue"),
  },
  {
    path: "/my/customer/terms/:termId?",
    component: () => import("@/views/my/customer/terms/index.vue"),
  },
  {
    path: "/my/customer/qna",
    component: () => import("@/views/my/customer/qna/index.vue"),
  },
  {
    path: "/my/customer/qna/:qna_id",
    component: () => import("@/views/my/customer/qna/[qna_id].vue"),
  },
  {
    path: "/my/customer/qna/write",
    component: () => import("@/views/my/customer/qna/write.vue"),
  },
  {
    path: "/my/likes",
    component: () => import("@/views/my/likes.vue"),
  },
  {
    path: "/my/posts",
    component: () => import("@/views/my/posts.vue"),
  },
  {
    path: "/alim",
    component: () => import("@/views/alim/index.vue"),
  },
  {
    path: "/redev/:redev_id",
    component: () => import("@/views/redev/[redev_id]/index.vue"),
  },
  {
    path: "/redev/:redev_id/subscribe",
    component: () => import("@/views/redev/[redev_id]/subscribe/index.vue"),
  },
  {
    path: "/redev/:redev_id/subscribe/:subscribe_id",
    component: () => import("@/views/redev/[redev_id]/subscribe/[subscribe_id].vue"),
  },
  {
    path: "/redev/:redev_id/notice",
    component: () => import("@/views/redev/[redev_id]/notice/index.vue"),
  },
  {
    path: "/redev/:redev_id/notice/:notice_id",
    component: () => import("@/views/redev/[redev_id]/notice/[notice_id].vue"),
  },
  {
    path: "/redev/:redev_id/video",
    component: () => import("@/views/redev/[redev_id]/video/index.vue"),
  },
  {
    path: "/redev/:redev_id/community/:type_id",
    component: () => import("@/views/redev/[redev_id]/community/[type_id].vue"),
  },
  {
    path: "/redev/:redev_id/news/:type_id",
    component: () => import("@/views/redev/[redev_id]/news/[type_id].vue"),
  },
  {
    path: "/redev/:redev_id/story",
    component: () => import("@/views/redev/[redev_id]/story/index.vue"),
  },
  {
    path: "/redev/:redev_id/story/write",
    component: () => import("@/views/redev/[redev_id]/story/write.vue"),
  },
  {
    path: "/redev/:redev_id/story/:story_id",
    component: () => import("@/views/redev/[redev_id]/story/[story_id].vue"),
  },
  { path: "/redev", meta: { public: true }, component: () => import("@/views/redev/index.vue") },
  { path: "", redirect: { path: "/permissions" } },
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
