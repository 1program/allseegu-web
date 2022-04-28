<template>
  <div class="post-meta">
    <Badge v-if="badge != null" class="badge" :label="badge" :palette="badgeColor" />
    <div class="title">{{ title }}</div>
    <div class="info">
      {{ dateText ?? "-" }}
      <template v-if="hits != null"> / 조회수 {{ hits.toLocaleString() }}</template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { formatDate } from "@/lib/formatters";

import Badge from "../common/Badge.vue";

/**
 * 글 정보 헤더 컴포넌트.
 *
 * binding시 누락을 방지하기 위해 모든 필드를 required로 지정하였음.
 */
export default defineComponent({
  name: "PostMeta",
  components: { Badge },
  props: {
    badge: {
      type: String,
    },
    badgeColor: {
      type: String as PropType<"default" | "primary" | "danger">,
      default: "primary",
    },
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
      required: false,
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

  .badge {
    margin-bottom: (20/2/16) * 1rem;
  }

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
