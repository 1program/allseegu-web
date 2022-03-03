<template>
  <button class="app-toggle" :class="{ checked }" @click="handleToggle">
    <span class="knob" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppToggle",
  props: {
    checked: {
      type: Boolean,
      description: "체크되었는가?",
    },
  },
  setup(props, context) {
    return {
      handleToggle: () => {
        context.emit("update:checked", !props.checked);
      },
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.app-toggle {
  width: 3.125rem;
  height: 1.75rem;
  border-radius: 0.875rem;
  background-color: #deeded;
  border: 0;
  outline: none;
  transition: background-color 0.15 ease;
  padding: 0.1875rem;

  &.checked {
    background-color: $color-blue;
  }
}

.knob {
  display: block;
  width: 1.375rem;
  height: 1.375rem;
  border-radius: 0.6875rem;
  background-color: $color-white;
  transition: transform 0.15s ease-out;

  .checked & {
    transform: translateX(100%);
  }
}
</style>
