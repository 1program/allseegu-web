<template>
  <div class="list-divider" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListDivider",
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.list-divider {
  border-top: 1px solid #f3f3f3;
  margin: (35/2/16) * 1rem 0;
}
</style>
