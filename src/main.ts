import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 스타일 Normalize
import "normalize.css";
import "@/styles/global.scss";

createApp(App).use(store).use(router).mount("#app");
