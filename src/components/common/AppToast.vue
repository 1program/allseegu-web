<template>
  <div
    class="app-toast"
    ref="element"
    @touchstart="swipeStart"
    @touchmove="swipe"
    @touchend="swipeEnd"
    @touchcancel="swipeEnd"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AppToast",
  setup(props, context) {
    const element = ref<HTMLDivElement | null>(null);

    let startY: number | null = null;
    let dY: number | null = null;

    const swipeStart = (event: TouchEvent) => {
      startY = event.touches[0].clientY;
    };

    const swipe = (event: TouchEvent) => {
      dY = event.touches[0].clientY - (startY ?? 0);

      if (element.value != null) {
        if (dY > 0) {
          element.value.style.transition = "transform 0s";
          element.value.style.transform = `translateY(${dY}px)`;
          element.value.style.opacity = `${(100 - dY) / 100}`;
        }
      }
    };

    const swipeEnd = () => {
      startY = null;

      if (element.value != null) {
        element.value.style.transition = "";

        if ((dY ?? 0) > 0) {
          element.value.style.transform = "translateY(100%)";
          element.value.style.opacity = "0";
          context.emit("close");
        } else {
          element.value.style.transform = "";
          element.value.style.opacity = "";
        }
      }
    };
    return {
      element,
      swipeStart,
      swipe,
      swipeEnd,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.app-toast {
  position: fixed;
  bottom: (40/2/16) * 1rem;
  left: (40/2/16) * 1rem;
  right: (40/2/16) * 1rem;
  background-color: rgba($color-red, 0.15);
  color: $color-red;
  border-radius: (10/2/16) * 1rem;
  padding: (25/2/16) * 1rem;
  font-size: (30/2/16) * 1rem;
  text-align: center;
  max-width: (670/2/16) * 1rem;
  margin: 0 auto;
  user-select: none;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
