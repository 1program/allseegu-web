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
  background-color: #efefef;
  border-radius: (8/2/16) * 1rem;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.2) 20%,
      rgba(#fff, 0.5) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 5s infinite;
    content: "";
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
