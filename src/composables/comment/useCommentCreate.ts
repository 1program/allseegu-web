import { CommentCreateOptions } from "@/api/CommentApi";
import { StoryDetail } from "@/models/story";
import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";
import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";

export function useCommentCreate() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  const api = useApi();

  return reactive(
    useMutation({
      mutationKey: "COMMENT_CREATE",
      mutationFn: (options: CommentCreateOptions) => api.comment.create(options),
      onSuccess: (data, options) => {
        alert(data.message);

        console.log(options.model);

        /// 댓글 작성이 완료되면 댓글 목록에 추가한다.
        if (options.model === "story") {
          queryClient.setQueryData<Partial<StoryDetail>>(
            ["STORY_DETAIL", data.data.commentable_id],
            (previous) => ({ ...previous, comments: [...(previous?.comments ?? []), data.data] })
          );
        }
      },
      onError: (error: any) => alert(error.message),
    })
  );
}
