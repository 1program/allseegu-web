<template>
  <div class="loading-fallback">
    <LoadingDots class="dots" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoadingDots from "./LoadingDots.vue";

export default defineComponent({
  name: "LoadingFallback",
  components: { LoadingDots },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.loading-fallback {
  // 평소, 세로로 꽉 채우도록
  flex: 1 1 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: (60/2/16) * 1rem (40/2/16) * 1rem;
  min-height: 10rem;
}

.dots {
  flex: 0 0 auto;
}
</style>
