<template>
  <div class="badge" :class="{ blue, red }">{{ label ?? "-" }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppBadge",
  props: {
    label: {
      type: String,
      default: null,
    },
    blue: {
      type: Boolean,
      default: false,
    },
    red: {
      type: Boolean,
      default: false,
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

  &.blue {
    background-color: $color-blue;
  }

  &.red {
    background-color: $color-red;
  }
}
</style>
