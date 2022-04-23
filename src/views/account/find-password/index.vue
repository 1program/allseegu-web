<template>
  <app-scaffold title="비밀번호 찾기">
    <sliding-router-view />
  </app-scaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppScaffold from "@/components/common/AppScaffold.vue";
import SlidingRouterView from "@/components/common/SlidingRouterView.vue";

export default defineComponent({
  name: "AccountFindPassword",
  components: { AppScaffold, SlidingRouterView },
});
</script>
