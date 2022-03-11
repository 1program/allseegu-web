<template>
  <div tabindex="0" class="app-modal" @click="$emit('close')" @keyup.esc="close">
    <div class="backdrop" />
    <div class="paper" @click.stop>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppPopup",
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.app-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  // https://mui.com/customization/z-index/
  z-index: 1300;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;

  .backdrop {
    transition: opacity 0.3s ease;
  }

  .paper {
    transition: transform 0.5s ease;
  }
}

.v-enter-from,
.v-leave-to {
  opacity: 0;

  .backdrop {
    opacity: 0;
  }

  .paper {
    transform: translate(-50%, -50%) scale(90%);
  }
}

.backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  transition: opacity 0.3s ease;
}

.paper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: (600/2/16) * 1rem;
  background-color: white;
  border-radius: (28/2/16) * 1rem;
}
</style>
