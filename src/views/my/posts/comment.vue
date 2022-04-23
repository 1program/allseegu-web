<template>
  <ErrorFallback v-if="commentList.error != null" :error="commentList.error" />
  <LoadingFallback v-else-if="commentList.data == null" />
  <template v-else v-for="page in commentList.data.pages" :key="page.current_page">
    <!-- 데이터 없을 경우 -->
    <AppFallback v-if="page.total < 1" message="등록된 이야기가 없습니다." />

    <!-- 각 데이터 반복 -->
    <template v-else v-for="(comment, index) in page.data" :key="comment.id">
      <ListDivider v-if="index > 0" />
      <ListTile
        :category="comment.parent.redev_title?.replace('\\n', ' ')"
        :title="comment.parent.title"
        :show-tools="false"
        :show-footer="false"
        :to="`/redev/${comment.parent.redev_id}`"
      />
      <CommentSimpleTile
        :content="comment.content"
        @edit="editComment(comment)"
        @remove="removeComment(comment)"
        :to="`/redev/${comment.parent.redev_id}/story/${comment.parent.id}?comment_id=${comment.id}`"
      />
    </template>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import CommentSimpleTile from "@/components/comment/CommentSimpleTile.vue";
import ErrorFallback from "@/components/common/ErrorFallback.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import ListTile from "@/components/common/ListTile.vue";
import LoadingFallback from "@/components/common/LoadingFallback.vue";
import { useCommentDelete } from "@/composables/comment/useCommentDelete";
import { useMyCommentList } from "@/composables/comment/useMyCommentList";
import { useConfirm } from "@/composables/common/useConfirm";
import { Comment } from "@/models/comment";
import { Story } from "@/models/story";

export default defineComponent({
  name: "MyPostsComment",
  components: { ListTile, CommentSimpleTile, ListDivider, ErrorFallback, LoadingFallback },
  setup() {
    const router = useRouter();
    const confirm = useConfirm();

    const commentList = useMyCommentList();

    const removeMutation = useCommentDelete();

    const removeComment = async (comment: Comment<Story>) => {
      if (await confirm("정말 삭제하시겠습니까?", { okLabel: "삭제" })) {
        removeMutation.mutate({
          id: comment.id,
          parent_uuid: comment.parent_uuid,
          model: "story",
          commentable_id: comment.commentable_id,
        });
      }
    };

    const editComment = (comment: Comment<Story>) => {
      router.push(
        `/redev/${comment.parent.redev_id}/story/${comment.parent.id}?editing_comment_id=${comment.id}`
      );
    };

    return { commentList, removeComment, editComment };
  },
});
</script>
