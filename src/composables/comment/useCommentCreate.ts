import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";

import { CommentCreateOptions } from "@/api/CommentApi";
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
    mutationFn: (options: CommentCreateOptions) => api.comment.create(options),
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
      }
    },
    // TODO: any 타입 개선
    onError: (error: any) => alert(error.message),
  });

  return reactive(mutation);
}
