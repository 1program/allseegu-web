import { CommentUpdateOptions } from "@/api/CommentApi";
import { StoryDetail } from "@/models/story";
import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";
import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";

export function useCommentUpdate() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  const api = useApi();

  return reactive(
    useMutation({
      mutationKey: "COMMENT_CREATE",
      mutationFn: (options: CommentUpdateOptions) => api.comment.update(options),
      onSuccess: (data, options) => {
        alert(data.message);

        console.log(options.model);

        /// 댓글이 업데이트 되면 기존 댓글 캐시에서 찾아 업데이트 해 주어야 한다.
        if (options.model === "story") {
          queryClient.setQueryData<Partial<StoryDetail>>(
            ["STORY_DETAIL", data.data.commentable_id],
            (previous) => ({
              ...previous,
              comments:
                previous?.comments?.map((comment) =>
                  comment.id === data.data.id ? data.data : comment
                ) ?? [],
            })
          );
        }
      },
      onError: (error: any) => alert(error.message),
    })
  );
}
