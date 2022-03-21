<template>
  <a class="attachment-tile" :href="url" target="_blank">
    <slot />
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AttachmentTile",
  props: {
    url: {
      type: String,
      default: null,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.attachment-tile {
  display: block;
  font-size: (26/2/16) * 1rem;
  padding: (20/2/16) * 1rem (32/2/16) * 1rem;
  background-color: #f8f8f8;
  border: 1px solid #dddddd;

  @include touchable;
}
</style>
