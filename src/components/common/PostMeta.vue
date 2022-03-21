<template>
  <div class="post-meta">
    <div class="badge" v-if="badge != null">{{ badge }}</div>
    <div class="title">{{ title }}</div>
    <div class="info">{{ dateText ?? "-" }} / 조회수 {{ hits ?? "-" }}</div>
  </div>
</template>

<script lang="ts">
import { formatDate } from "@/lib/formatters";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PostMeta",
  props: {
    badge: {
      type: String,
      default: null,
    },
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

  .badge {
    display: inline-block;
    margin-bottom: (21/2/16) * 1rem;
    font-size: (26/2/16) * 1rem;
    background-color: $color-blue;
    color: $color-white;
    padding: (7/2/16) * 1rem (23/2/16) * 1rem;
    font-weight: bold;
    border-radius: (100/2/16) * 1rem;
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
