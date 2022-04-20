<template>
  <div class="comment-list">
    <div class="top">
      <div class="count">댓글 {{ count }}</div>
      <CommentForm class="form" :parent_uuid="parent_uuid" :model="model" />
    </div>
    <template v-for="comment in comments" :key="comment.id">
      <div class="divider light" />
      <CommentItem class="item" :depth="1" :comment="comment" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, watch, ref, provide, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { diffNewComments } from "@/utils/comment/diffNewComments";

import { Comment } from "@/models/comment";

import CommentForm from "./CommentForm.vue";
import CommentItem from "./CommentItem.vue";

/**
 * CommentList에서 트리간 공유되는 공용 데이터를 식별할 Symbol.
 */
export const COMMENT_LIST_SYMBOL = Symbol("COMMENT_LIST_CONTEXT");

/**
 * CommentList에서 트리간 공유되는 공용 데이터
 */
export interface CommentListContext {
  /**
   * 초점 맞추어진 댓글 id
   * (해당 댓글로 스크롤 된다.)
   */
  comment_id: Ref<number | null>;

  /**
   * 수정되고 있는 댓글 id
   * (해당 댓글로 스크롤 된다.)
   */
  editing_comment_id: Ref<number | null>;

  /**
   * 댓글 수정 (한번에 한 댓글만 수정되도록 한다.)
   */
  edit: (id: number | null) => void;
}

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
    const router = useRouter();
    const route = useRoute();

    // 초점 맞출 comment id
    const comment_id = computed({
      get: () => parseInt(route.query.comment_id as string, 10) || null,
      set: (id: number | null) =>
        router.replace({
          query: {
            comment_id: id,
          },
          state: {
            scrollToTop: false,
          },
        }),
    });

    // 편집중인 comment id
    const editing_comment_id = computed({
      get: () => parseInt(route.query.editing_comment_id as string, 10) || null,
      set: (id: number | null) => {
        router.replace({
          query: {
            editing_comment_id: id ?? undefined,
          },
          state: {
            scrollToTop: false,
          },
        });
      },
    });

    const edit = (id: number | null) => {
      editing_comment_id.value = id;
    };

    // 새로 추가된 댓글 감지 -> 새로운 댓글을 현재 댓글로 설정 (초점 맞춤)
    watch(
      () => props.comments,
      (current, prev) => {
        const newComments = diffNewComments(prev, current);
        comment_id.value = newComments[0]?.id;
      }
    );

    // 자식 트리에 필요한 정보를 공급한다.
    provide(COMMENT_LIST_SYMBOL, {
      comment_id,
      editing_comment_id,
      edit,
    } as CommentListContext);

    return {};
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
