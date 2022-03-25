<template>
  <div class="status-label" :class="{ blue, red }">
    {{ label ?? "-" }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StatusLabel",
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

.status-label {
  font-weight: bold;
  color: #777777;

  &.blue {
    color: $color-blue;
  }
  &.red {
    color: $color-red;
  }
}
</style>
