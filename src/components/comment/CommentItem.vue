<template>
  <div ref="element" class="comment-item" :class="{ added }">
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
          <CommentItem
            :depth="depth + 1"
            :comment="subComment"
            :added="subComment.id === firstAddedSubComment?.id"
          />
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
import { defineComponent, PropType, ref, computed, watch } from "vue";
import { Comment, parseCommentableType } from "@/models/comment";
import { useUi } from "@/composables/common/useUi";
import { useMe } from "@/composables/user/useMe";
import { useCommentDelete } from "@/composables/comment/useCommentDelete";
import { useConfirm } from "@/composables/common/useConfirm";
import { useAddedItem } from "@/composables/common/useAddedItem";

import CommentForm from "./CommentForm.vue";
import CommentTile from "./CommentTile.vue";
import SubItem from "../common/SubItem.vue";

export default defineComponent({
  name: "CommentItem",
  components: { CommentForm, CommentTile, SubItem },
  props: {
    depth: {
      type: Number,
      required: true,
    },
    comment: {
      type: Object as PropType<Comment>,
      required: true,
    },
    added: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const confirm = useConfirm();

    const { notImplemented } = useUi();

    const element = ref<HTMLDivElement>();

    const me = useMe();

    const editing = ref(false);

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
          model: "story",
        });
      }
    };

    const addedSubComments = useAddedItem(
      computed(() => props.comment?.child ?? []),
      (comment) => comment.id.toString()
    );

    const firstAddedSubComment = computed(() => addedSubComments.value?.[0]);

    watch(
      () => ({ isAdded: props.added, elem: element.value }),
      ({ isAdded, elem }) => {
        // 새로 추가된 댓글에게 초점을 맞춘다.
        if (isAdded && elem) {
          elem.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      },
      { immediate: true }
    );

    return {
      element,
      editing,
      expanded,
      notImplemented,
      commentable_type,
      me,
      remove,
      addedSubComments,
      firstAddedSubComment,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.comment-item {
  &.added {
    animation-name: added;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
    animation-duration: 0.5s;
  }
}

@keyframes added {
  from {
    opacity: 0;
  }
}
</style>
