<template>
  <div class="error-fallback">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

export default defineComponent({
  name: "ErrorFallback",
  props: {
    error: {
      type: Object as PropType<unknown>,
    },
  },
  setup(props) {
    const message = computed(() => {
      if (props.error instanceof Error) {
        return props.error.message;
      }

      return "";
    });

    return {
      message,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.error-fallback {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: (60/2/16) * 1rem (40/2/16) * 1rem;
  text-align: center;
  color: #666;
  min-height: 10rem;
  font-size: (30/2/16) * 1rem;
}
</style>
