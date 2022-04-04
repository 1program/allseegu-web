<template>
  <div class="loading-dots">
    <div class="dot dot1" />
    <div class="dot dot2" />
    <div class="dot dot3" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingDots",
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.loading-dots {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.dot {
  width: 0.5em;
  height: 0.5em;
  margin: 0 0.1em;
  border-radius: 0.5em;
  background-color: $color-blue;
  color: $color-blue;
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 0s;
}

.dot1 {
  animation-delay: 0s;
}

.dot2 {
  animation-delay: 0.5s;
}

.dot3 {
  animation-delay: 1s;
}

@keyframes dotFlashing {
  0% {
    background-color: $color-blue;
  }
  50%,
  100% {
    background-color: #ebe6ff;
  }
}
</style>
