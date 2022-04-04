<template>
  <div class="contact-tile">
    <div class="content">
      <div class="name">{{ name }}</div>
      <div class="address" v-if="description != null">{{ description }}</div>
    </div>
    <div class="button">
      <slot name="button" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContactTile",
  props: {
    name: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.contact-tile {
  padding: (14/2/16) * 1rem (30/2/16) * 1rem;
  background-color: #f8f8f8;
  border-radius: (10/2/16) * 1rem;

  display: flex;
  align-items: center;

  .content {
    flex: 1 1 auto;
    min-width: 0;
    padding: (14/2/16) * 1rem 0;

    .name {
      font-size: (30/2/16) * 1rem;
      line-height: 1;
    }

    .address {
      margin-top: (15/2/16) * 1rem;
      font-size: (26/2/16) * 1rem;
      color: #777;
      line-height: 1;

      @include ellipsis;
    }
  }

  .button {
    flex: 0 0 auto;
    margin-left: (15/2/16) * 1rem;
  }
}
</style>
