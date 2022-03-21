<template>
  <button type="button" class="option-button" :class="{ active }">
    <span class="icon" v-if="$slots.icon"><slot name="icon" /></span>
    <span class="label" v-if="$slots.default"><slot name="default" /></span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "OptionButton",
  props: {
    active: {
      type: Boolean,
      default: false,
      description: "선택 되었는가?",
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.option-button {
  padding: (30/2/16) * 1rem;
  flex: 1 0;
  border-right: 1px solid $color-light;
  border-bottom: 1px solid $color-light;
  transition: background-color 0.15s ease;

  &.active {
    background-color: $color-blue;
    color: white;
  }
}

.icon {
  display: block;
  margin-bottom: (16/2/16) * 1rem;

  :deep(img) {
    max-width: (68/2/16) * 1rem;
  }
}

.label {
  display: block;
  font-size: (30/2/16) * 1rem;
}
</style>
