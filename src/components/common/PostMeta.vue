<template>
  <div class="post-meta">
    <slot />
    <div class="title">{{ title }}</div>
    <div class="info">{{ dateText ?? "-" }} {{ hits && "/ 조회수" + hits }}</div>
  </div>
</template>

<script lang="ts">
import { formatDate } from "@/lib/formatters";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PostMeta",
  props: {
    title: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
      default: null,
    },
    hits: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    return {
      dateText: formatDate(props.date),
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.post-meta {
  text-align: center;

  .title {
    font-size: (34/2/16) * 1rem;
  }

  .info {
    margin-top: (21/2/16) * 1rem;
    font-size: (26/2/16) * 1rem;
    color: #ddd;
  }
}
</style>
