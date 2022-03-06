<template>
  <div class="app">
    <sliding-router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SlidingRouterView from "./components/common/SlidingRouterView.vue";

export default defineComponent({
  name: "App",
  components: { SlidingRouterView },
});
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; // 언제나 최소 화면 높이의 100%를 보장하기 위함이다.
}
</style>
