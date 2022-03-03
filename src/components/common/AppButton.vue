<template>
  <component :is="is" class="app-button" :class="[full && 'full', palette]" :to="to">
    <slot />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

export type AppButtonPalettes = "blue" | "white" | "outlined-white";

export default defineComponent({
  name: "AppButton",
  props: {
    palette: {
      type: String as PropType<AppButtonPalettes>,
      description: "버튼의 색상 팔레트",
      default: "blue",
    },
    full: {
      type: Boolean,
      description: "화면을 꽉 채울 것인가?",
      default: false,
    },
    to: {
      type: String,
      description: "<router-link />의 to. to를 지정하면 <router-link />로 변경된다.",
      default: null,
    },
  },
  setup(props) {
    // component type
    const is = computed(() => (props.to != null ? "router-link" : "button"));

    return {
      is,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.app-button {
  /* Defaults */
  position: relative;
  display: inline-flex;
  padding: 1rem;
  text-align: center;
  border: 1px solid transparent;
  align-items: center;
  justify-content: center;
  font-size: 0.9375rem;
  border-radius: 0.3125rem;
  background-color: transparent;
  line-height: 1;
  user-select: none;

  /* Transition */
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active,
  &.active {
    opacity: 0.5;
  }

  /* Is full? */
  &.full {
    display: flex;
    width: 100%;
  }

  /* Palettes */
  &.blue {
    background-color: $color-blue;
    color: $color-white;
  }

  &.white {
    background-color: $color-white;
    color: $color-blue;
  }

  &.outlined-white {
    border: 1px solid $color-white;
    color: $color-white;
  }
}
</style>
