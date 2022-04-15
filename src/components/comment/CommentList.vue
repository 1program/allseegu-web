<template>
  <div class="comment-list">
    <div class="top">
      <div class="count">댓글 {{ count }}</div>
      <CommentForm class="form" :parent_uuid="parent_uuid" :model="model" />
    </div>
    <template v-for="comment in comments" :key="comment.id">
      <div class="divider light" />
      <CommentItem
        class="item"
        :depth="1"
        :comment="comment"
        :added="comment.id === firstAddedComment?.id"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

import { useAddedItem } from "@/composables/common/useAddedItem";
import { Comment } from "@/models/comment";

import CommentForm from "./CommentForm.vue";
import CommentItem from "./CommentItem.vue";

export default defineComponent({
  name: "CommentList",
  components: { CommentForm, CommentItem },
  props: {
    count: {
      type: Number,
      default: 0,
    },
    parent_uuid: {
      type: String,
      required: true,
    },
    model: {
      type: String as PropType<"story">,
      required: true,
    },
    comments: {
      type: Array as PropType<Comment[]>,
      required: true,
    },
  },
  setup(props) {
    const added = useAddedItem(
      computed(() => props.comments),
      (comment) => comment.id.toString()
    );

    const firstAddedComment = computed(() => added.value?.[0]);

    return { firstAddedComment };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.comment-list {
  flex: 1 1 auto;
  background-color: #f3f3f3;
}

.top {
  padding: $padding;
  padding-bottom: $padding-x;
}

.form {
  background-color: white;
}

.count {
  font-size: (26/2/16) * 1rem;
  margin-bottom: (30/2/16) * 1rem;
}

.item {
  padding: $padding-x;
}
</style>
