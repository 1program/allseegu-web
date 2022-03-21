<template>
  <div class="sub-item"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SubItem",
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.sub-item {
  position: relative;

  padding-left: (60/2/16) * 1rem;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: (30/2/16) * 1rem;
    height: (20/2/16) * 1rem;
    border-left: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
  }
}
</style>
