<template>
  <div class="comment-form-tile">
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
    <!-- TODO: 닉네임 필요 -->
    <CommentTile
      v-else
      :nickname="'테스트'"
      :date="new Date(comment.created_at)"
      :images="comment.files?.images ?? []"
      :content="comment.content"
      :comment-count="comment.child?.length"
      :expanded="expanded"
      :mine="comment.user_id === me.data?.id"
      @expand="expanded = $event"
      @edit="editing = !editing"
      @remove="remove"
    >
      <template v-for="subComment in comment.child" :key="subComment.id">
        <div class="divider light darker margin" />
        <SubItem>
          <CommentItem :comment="subComment" />
        </SubItem>
      </template>
    </CommentTile>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from "vue";
import { Comment, parseCommentableType } from "@/models/comment";
import { useUi } from "@/composables/common/useUi";
import { useMe } from "@/composables/user/useMe";
import { useCommentDelete } from "@/composables/comment/useCommentDelete";

import CommentForm from "./CommentForm.vue";
import CommentTile from "./CommentTile.vue";
import SubItem from "../common/SubItem.vue";

export default defineComponent({
  name: "CommentItem",
  props: {
    comment: {
      type: Object as PropType<Comment>,
      required: true,
    },
  },
  setup(props) {
    const { notImplemented } = useUi();

    const me = useMe();

    const editing = ref(false);

    const expanded = ref(false);

    const commentable_type = computed(() => parseCommentableType(props.comment.commentable_type));

    const commentDelete = useCommentDelete();

    const remove = () => {
      commentDelete.mutate({
        commentable_id: props.comment.commentable_id,
        parent_uuid: props.comment.parent_uuid,
        id: props.comment.id,
        model: "story",
      });
    };

    return {
      date: new Date(),
      editing,
      expanded,
      notImplemented,
      commentable_type,
      me,
      remove,
    };
  },
  components: { CommentForm, CommentTile, SubItem },
});
</script>
