<template>
  <a class="link-tile" :href="url" target="_blank">
    <div class="header">
      <div class="title">링크<img src="@/images/icons/link.svg" alt="링크" /></div>
    </div>
    <div class="url">
      {{ url }}
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LinkTile",
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

.link-tile {
  display: block;
  font-size: (26/2/16) * 1rem;
  padding: (32/2/16) * 1rem;
  border: 1px solid #dddddd;

  @include touchable;
}

.header {
  display: flex;

  margin-bottom: (13/2/16) * 1rem;

  .title {
    flex: 1 1 auto;
    color: #777;
    display: inline-flex;
    align-items: center;

    > img {
      margin-left: auto;
      width: (28/2/16) * 1rem;
    }
  }
}

.url {
  word-break: break-all;
}
</style>
