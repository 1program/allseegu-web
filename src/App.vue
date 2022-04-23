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

import AlertRenderer from "./components/common/AlertRenderer.vue";
import ConfirmRenderer from "./components/common/ConfirmRenderer.vue";
import SlidingRouterView from "./components/common/SlidingRouterView.vue";
import ToastRenderer from "./components/common/ToastRenderer.vue";
import { provideAuth } from "./composables/auth/useAuth";
import { provideAlerts } from "./composables/common/useAlert";
import { provideApi } from "./composables/common/useApi";
import { provideConfirm } from "./composables/common/useConfirm";
import { provideToasts } from "./composables/common/useToast";
import { provideUi } from "./composables/common/useUi";

export default defineComponent({
  name: "App",
  components: { SlidingRouterView, AlertRenderer, ToastRenderer, ConfirmRenderer },
  setup() {
    const router = useRouter();

    const alerts = provideAlerts();

    provideConfirm();

    provideToasts();

    provideUi({
      onMessage: alerts.open,
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
  @include min-height-100vh;
}
</style>
