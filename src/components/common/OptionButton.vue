<template>
  <button type="button" class="option-button" :class="{ active }">
    <span class="icon" v-if="$slots.icon"><slot name="icon" /></span>
    <span class="label" :class="{ center: labelCenter }" v-if="$slots.default"
      ><slot name="default"
    /></span>
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
    labelCenter: {
      type: Boolean,
      default: false,
      description: "라벨 텍스트 중앙정렬 여부",
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.option-button {
  padding: (30/2/16) * 1rem (40/2/16) * 1rem;
  width: 50%;
  min-height: (125/2/16) * 1rem;
  border-right: 1px solid $color-light;
  border-bottom: 1px solid $color-light;
  transition: background-color 0.15s ease;
  background-color: $color-lightest;

  display: inline-flex;
  align-items: center;

  &.active {
    background-color: $color-blue;
    color: white;
  }
}

.icon {
  display: block;
  margin-right: (16/2/16) * 1rem;

  :deep(img) {
    max-width: (68/2/16) * 1rem;
    margin-bottom: -5px;
  }
}

.label {
  display: block;
  font-size: (30/2/16) * 1rem;
  flex: 1 1 auto;
  text-align: left;

  &.center {
    text-align: center;
  }
}
</style>
