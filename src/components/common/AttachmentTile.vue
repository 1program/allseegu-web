<template>
  <a class="attachment-tile" :href="url" target="_blank">
    <div class="main">
      <slot />
    </div>
    <button v-if="removable" class="close" @click.prevent="$emit('remove')">
      <img src="@/images/icons/close.svg" alt="삭제" />
    </button>
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
    removable: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.attachment-tile {
  display: flex;
  align-items: center;
  padding: (20/2/16) * 1rem (32/2/16) * 1rem;
  background-color: #f8f8f8;
  border: 1px solid #dddddd;

  @include touchable;

  .main {
    flex: 1 1 auto;
    font-size: (26/2/16) * 1rem;
    @include ellipsis;
  }

  .close {
    img {
      display: block;
      width: (17/2/16) * 1rem;
    }
  }
}
</style>
