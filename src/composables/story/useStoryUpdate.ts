import { StoryUpdateOptions } from "@/api/StoryApi";
import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";
import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";

// TODO: 스토리 목록, 내 스토리 목록 invalidate
// TODO: 스토리 업데이트 후 상세에 files 필드 필요
export function useStoryUpdate() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  const api = useApi();

  const mutation = useMutation({
    mutationKey: "STORY_UPDATE",
    mutationFn: async (options: StoryUpdateOptions) => {
      return api.story.update(options);
    },
    onSuccess: (data, options) => {
      queryClient.invalidateQueries(["MY_STORY_LIST"]);
      queryClient.invalidateQueries(["STORY_DETAIL", options.story_id]);
      alert(data.message);
    },
    // TODO: 개선
    onError: (error: any) => alert(error.message),
  });

  return reactive(mutation);
}
