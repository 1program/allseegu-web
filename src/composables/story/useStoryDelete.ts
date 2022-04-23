import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";

import { StoryDeleteOptions } from "@/api/StoryApi";

import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";

// TODO: 스토리 목록, 내 스토리 목록 invalidate
export function useStoryDelete() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  const api = useApi();

  const mutation = useMutation({
    mutationKey: "STORY_DELETE",
    mutationFn: async (options: StoryDeleteOptions) => {
      return api.story.delete(options);
    },
    onSuccess: (data, options) => {
      queryClient.invalidateQueries(["STORY_LIST"]);
      queryClient.invalidateQueries(["MY_STORY_LIST"]);
      queryClient.invalidateQueries(["STORY_DETAIL", options.story_id]);
      alert(data.message);
    },
    // TODO: 개선
    onError: (error: any) => alert(error.message),
  });

  return reactive(mutation);
}
