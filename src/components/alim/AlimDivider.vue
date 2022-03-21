<template>
  <div class="alim-divider" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AlimDivider",
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.alim-divider {
  border-top: 1px solid #cccccc;
}
</style>
