<template>
  <div class="app-balloon">
    <slot />
    <transition>
      <div v-if="message != null" class="overlay">
        <div class="balloon">
          <div class="tail" />
          <div class="message">{{ message }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppBalloon",
  props: {
    message: {
      type: String,
      default: null,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.app-balloon {
  position: relative;
}

.overlay {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  text-align: center;

  &.v-enter-active,
  &.v-leave-active {
    transition: opacity 0.2s, transform 0.15s ease;
    transform-origin: center top;
  }

  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
  }

  &.v-enter-from {
    transform: scale(0.5);
  }
}

.balloon {
  position: relative;
  display: inline-block;
  margin-top: (20/2/16) * 1rem;
  background-color: $color-blue;
  color: $color-white;
  padding: (16/2/16) * 1rem (34/2/16) * 1rem;
  border-radius: (10/2/16) * 1rem;
  font-size: (26/2/16) * 1rem;
}

.tail {
  position: absolute;
  top: 0;
  left: 50%;
  width: (32/2/16) * 1rem;
  height: (32/2/16) * 1rem;
  border-radius: (4/2/16) * 1rem;
  transform: translate(-50%, -25%) rotate(-45deg);
  background-color: $color-blue;
}

.message {
  position: relative;
}
</style>
