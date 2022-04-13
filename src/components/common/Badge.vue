<template>
  <div class="badge" :class="[palette]">{{ label ?? "-" }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "AppBadge",
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

.badge {
  display: inline-block;
  font-size: (26/2/16) * 1rem;
  background-color: $color-gray;
  color: $color-white;
  padding: (7/2/16) * 1rem (23/2/16) * 1rem;
  font-weight: bold;
  border-radius: (100/2/16) * 1rem;

  &.primary {
    background-color: $color-blue;
  }

  &.danger {
    background-color: $color-red;
  }
}
</style>
