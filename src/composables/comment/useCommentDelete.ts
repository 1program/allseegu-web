import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";

import { QnaDetail } from "@/models/qna";
import { StoryDetail } from "@/models/story";
import { removeComment } from "@/utils/comment/removeComment";

import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";

export function useCommentDelete() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  const api = useApi();

  return reactive(
    useMutation({
      mutationKey: "COMMENT_DELETE",
      mutationFn: api.comment.delete,
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
        } else if (options.model === "qna") {
          queryClient.setQueryData<Partial<QnaDetail>>(
            ["QNA_DETAIL", options.commentable_id],
            (previous) => ({
              ...previous,
              comments: removeComment(previous?.comments ?? [], options.id),
            })
          );
        }
      },
      // eslint-disable-next-line
      onError: (error: any) => alert(error.message),
    })
  );
}
