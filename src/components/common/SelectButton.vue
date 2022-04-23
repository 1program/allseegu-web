<template>
  <RouterLinkOrButton class="select-button">
    <slot />
  </RouterLinkOrButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import RouterLinkOrButton from "./RouterLinkOrButton.vue";

export default defineComponent({
  name: "SelectButton",
  components: { RouterLinkOrButton },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.select-button {
  font-size: (26/2/16) * 1rem;
}
</style>
