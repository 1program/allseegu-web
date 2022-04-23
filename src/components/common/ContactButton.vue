<template>
  <RouterLinkOrButton class="contact-button" :style="{ backgroundColor: color }">
    <slot />
  </RouterLinkOrButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import RouterLinkOrButton from "./RouterLinkOrButton.vue";

export default defineComponent({
  name: "ContactButton",
  components: { RouterLinkOrButton },
  props: {
    color: {
      type: String,
      default: null,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.contact-button {
  display: inline-flex;
  width: (68/2/16) * 1rem;
  height: (68/2/16) * 1rem;
  border-radius: (15/2/16) * 1rem;
  background-color: $color-blue;
  color: $color-white;

  @include touchable;
}
</style>
