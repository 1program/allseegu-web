<template>
  <app-scaffold title="아이디 찾기">
    <sliding-router-view />
  </app-scaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppScaffold from "@/components/common/AppScaffold.vue";
import SlidingRouterView from "@/components/common/SlidingRouterView.vue";

export default defineComponent({
  name: "AccountFindId",
  components: { AppScaffold, SlidingRouterView },
});
</script>
