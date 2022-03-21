<template>
  <RouterLinkOrButton class="news-tile">
    <div class="title">{{ title }}</div>
    <div class="content">{{ content }}</div>
  </RouterLinkOrButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouterLinkOrButton from "../common/RouterLinkOrButton.vue";

export default defineComponent({
  name: "NewsTile",
  components: { RouterLinkOrButton },
  props: {
    title: {
      type: String,
      description: "보도자료 제목",
      default: null,
    },
    content: {
      type: String,
      description: "보도자료 내용 (2줄)",
      default: null,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.news-tile {
  text-align: left;

  @include touchable;

  .title {
    font-size: (30/2/16) * 1rem;
  }

  .content {
    margin-top: (15/2/16) * 1rem;
    font-size: (26/2/16) * 1rem;
    color: #777;

    @include ellipsis(2);
  }
}
</style>
