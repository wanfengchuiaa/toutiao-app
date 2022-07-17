import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login"),
  },
  {
    path: "/userprofile",
    name: "userprofile",
    component: () => import("@/views/userprofile"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search"),
  },
  {
    path: "/article/:articleId",
    name: "article",
    component: () => import("@/views/article"),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true,
  },
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "my",
        component: () => import("@/views/my"),
      },
      {
        path: "qa",
        component: () => import("@/views/qa"),
      },
      {
        path: "video",
        component: () => import("@/views/video"),
      },
      {
        path: "home",
        component: () => import("@/views/home"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
