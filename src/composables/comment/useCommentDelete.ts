import { CommentDeleteOptions } from "@/api/CommentApi";
import { StoryDetail } from "@/models/story";
import { removeComment } from "@/utils/comment/removeComment";
import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";
import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";

export function useCommentDelete() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  const api = useApi();

  return reactive(
    useMutation({
      mutationKey: "COMMENT_DELETE",
      mutationFn: (options: CommentDeleteOptions) => api.comment.delete(options),
      onSuccess: (data, options) => {
        /// 댓글 삭제가 성공하면 댓글 목록에서 제거한다.
        if (options.model === "story") {
          queryClient.setQueryData<Partial<StoryDetail>>(
            ["STORY_DETAIL", options.commentable_id],
            (previous) => ({
              ...previous,
              comments: removeComment(previous?.comments ?? [], options.id),
            })
          );
        }
      },
      onError: (error: any) => alert(error.message),
    })
  );
}
