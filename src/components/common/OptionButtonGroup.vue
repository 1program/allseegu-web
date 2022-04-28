<template>
  <div class="option-button-group">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "OptionButtonGroup",
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.option-button-group {
  border: 1px solid $color-light;
  border-right: 0;
  border-bottom: 0;
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
}
</style>
