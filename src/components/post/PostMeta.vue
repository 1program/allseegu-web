<template>
  <div class="post-meta">
    <slot />
    <div class="title">{{ title }}</div>
    <div class="info">{{ dateText ?? "-" }} / 조회수 {{ hits.toLocaleString() }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { formatDate } from "@/lib/formatters";

/**
 * 글 정보 헤더 컴포넌트.
 *
 * binding시 누락을 방지하기 위해 모든 필드를 required로 지정하였음.
 */
export default defineComponent({
  name: "PostMeta",
  props: {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    hits: {
      type: Number,
      required: true,
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
