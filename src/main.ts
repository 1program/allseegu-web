import { createApp } from "vue";
import { VueQueryPlugin } from "vue-query";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import { realVh } from "./utils/common/vh";

// 스타일 Normalize
import "normalize.css";
import "@/styles/global.scss";

realVh();

window.addEventListener("resize", realVh);

createApp(App)
  // http 리퀘스트 캐시 / invalidate 를 쉽게 해 주는 vue-query 플러그인
  .use(VueQueryPlugin)
  .use(store)
  .use(router)
  .mount("#app");
