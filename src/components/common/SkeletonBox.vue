<template>
  <span class="skeleton-box" :style="{ width: length * 0.9 + 'em' }" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SkeletonBox",
  props: {
    length: {
      type: Number,
      default: 3,
      description: "모방할 글자 수, em 단위이다.",
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.skeleton-box {
  display: inline-block;
  vertical-align: middle;
  max-width: 100%; // 사이즈는 한 줄을 넘을 수 없음.
  height: 1em;
  overflow: hidden;
  background-color: currentColor;
  border-radius: (8/2/16) * 1rem;
  animation: blink 1s infinite;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 0;
  }
}
</style>
