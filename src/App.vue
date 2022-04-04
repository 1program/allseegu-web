<template>
  <div class="app">
    <sliding-router-view />
  </div>
  <alert-renderer />
  <confirm-renderer />
  <toast-renderer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import SlidingRouterView from "./components/common/SlidingRouterView.vue";
import { provideAlerts } from "./composables/common/useAlert";
import { provideToasts } from "./composables/common/useToast";
import AlertRenderer from "./components/common/AlertRenderer.vue";
import ToastRenderer from "./components/common/ToastRenderer.vue";
import { provideApi } from "./composables/common/useApi";
import { provideUi } from "./composables/common/useUi";
import { provideAuth } from "./composables/auth/useAuth";
import { provideConfirm } from "./composables/common/useConfirm";
import ConfirmRenderer from "./components/common/ConfirmRenderer.vue";

export default defineComponent({
  name: "App",
  components: { SlidingRouterView, AlertRenderer, ToastRenderer, ConfirmRenderer },
  setup() {
    const router = useRouter();

    const alerts = provideAlerts();

    provideConfirm();

    const toasts = provideToasts();

    provideUi({
      onMessage: toasts.open,
    });

    const auth = provideAuth();

    provideApi({
      accessToken: auth.accessToken,
    });

    router.beforeEach(async (to) => {
      if (to.meta.public !== true && auth.isLogged.value === false) {
        alerts.open("로그인이 필요합니다.");
        return { path: "/account" };
      }

      return undefined;
    });
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; // 언제나 최소 화면 높이의 100%를 보장하기 위함이다.
  min-height: $vh-100;
}
</style>
