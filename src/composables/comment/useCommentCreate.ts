import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";

import { QnaDetail } from "@/models/qna";
import { StoryDetail } from "@/models/story";
import { addComment } from "@/utils/comment/addComment";

import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";

export function useCommentCreate() {
  const queryClient = useQueryClient();

  const alert = useAlert();

  const api = useApi();

  const mutation = useMutation({
    mutationKey: "COMMENT_CREATE",
    mutationFn: api.comment.create,
    onSuccess: (data, options) => {
      /// 댓글 작성이 완료되면 댓글 목록에 추가한다.
      if (options.model === "story") {
        queryClient.setQueryData<Partial<StoryDetail>>(
          ["STORY_DETAIL", data.data.commentable_id],
          (previous) => ({
            ...previous,
            comments: addComment(previous?.comments ?? [], data.data),
          })
        );
      } else if (options.model === "qna") {
        queryClient.setQueryData<Partial<QnaDetail>>(
          ["QNA_DETAIL", data.data.commentable_id],
          (previous) => ({
            ...previous,
            comments: addComment(previous?.comments ?? [], data.data),
          })
        );
      }
    },
    // TODO: any 개선
    // eslint-disable-next-line
    onError: (error: any) => alert(error.message),
  });

  return reactive(mutation);
}
