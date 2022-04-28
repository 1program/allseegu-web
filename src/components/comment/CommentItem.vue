<template>
  <div ref="element" class="comment-item" :class="{ focused }">
    <CommentForm
      v-if="editing"
      :parent_uuid="comment.parent_uuid"
      :model="commentable_type"
      :comment="comment"
      show-cancel
      ok-label="수정"
      @ok="editing = false"
      @cancel="editing = false"
    />
    <CommentTile
      v-else
      :nickname="comment.nickname"
      :date="new Date(comment.created_at)"
      :images="comment.files?.images ?? []"
      :content="comment.content"
      :comment-count="comment.child?.length ?? 0"
      :comment-enabled="depth < 2"
      :expanded="expanded"
      :mine="comment.user_id === me.data?.id"
      @expand="expanded = $event"
      @edit="editing = !editing"
      @remove="remove"
    >
      <template v-for="subComment in comment.child ?? []" :key="subComment.id">
        <div class="divider light darker margin" />
        <SubItem>
          <CommentItem :model="model" :depth="depth + 1" :comment="subComment" />
        </SubItem>
      </template>
      <div class="divider light darker margin" />
      <SubItem>
        <CommentForm
          class="form"
          :comment_id="comment.id"
          :parent_uuid="comment.parent_uuid"
          :model="commentable_type"
        />
      </SubItem>
    </CommentTile>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, inject, watchEffect } from "vue";

import { useCommentDelete } from "@/composables/comment/useCommentDelete";
import { useConfirm } from "@/composables/common/useConfirm";
import { useUi } from "@/composables/common/useUi";
import { useMe } from "@/composables/user/useMe";
import { Comment, parseCommentableType } from "@/models/comment";

import SubItem from "../common/SubItem.vue";
import CommentForm from "./CommentForm.vue";
import { CommentListContext, COMMENT_LIST_SYMBOL } from "./CommentList.vue";
import CommentTile from "./CommentTile.vue";

export default defineComponent({
  name: "CommentItem",
  components: { CommentForm, CommentTile, SubItem },
  props: {
    model: {
      type: String as PropType<"story" | "qna">,
      required: true,
    },
    depth: {
      type: Number,
      required: true,
    },
    comment: {
      type: Object as PropType<Comment>,
      required: true,
    },
  },
  setup(props) {
    const confirm = useConfirm();

    const { notImplemented } = useUi();

    const commentListContext = inject<CommentListContext>(COMMENT_LIST_SYMBOL);

    const element = ref<HTMLDivElement>();

    const me = useMe();

    const editing = computed({
      get: () => commentListContext?.editing_comment_id.value === props.comment.id,
      set: (enabled: boolean) => commentListContext?.edit(enabled ? props.comment.id : null),
    });

    const expanded = ref(false);

    const commentable_type = computed(() => parseCommentableType(props.comment.commentable_type));

    const commentDelete = useCommentDelete();

    const remove = async () => {
      const yes = await confirm("정말 삭제하시겠습니까?");

      if (yes) {
        commentDelete.mutate({
          commentable_id: props.comment.commentable_id,
          parent_uuid: props.comment.parent_uuid,
          id: props.comment.id,
          model: props.model,
        });
      }
    };

    const focused = computed(
      () =>
        commentListContext?.comment_id.value === props.comment.id ||
        commentListContext?.editing_comment_id.value === props.comment.id
    );

    watchEffect(() => {
      setTimeout(() => {
        if (focused.value && element.value) {
          element.value.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      });
    });

    return {
      focused,
      element,
      editing,
      expanded,
      notImplemented,
      commentable_type,
      me,
      remove,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.comment-item {
  &.focused {
    animation-name: focused;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
    animation-duration: 0.5s;
  }
}

@keyframes focused {
  from {
    opacity: 0;
  }
}
</style>
