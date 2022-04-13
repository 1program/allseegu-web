<template>
  <div class="status-label" :class="[palette]">
    {{ label ?? "-" }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "StatusLabel",
  props: {
    label: {
      type: String,
      default: null,
    },
    palette: {
      type: String as PropType<"default" | "primary" | "danger">,
      default: "default",
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.status-label {
  font-weight: bold;
  color: #777777;

  &.primary {
    color: $color-blue;
  }
  &.danger {
    color: $color-red;
  }
}
</style>
