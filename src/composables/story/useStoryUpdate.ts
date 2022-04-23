import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";

import { StoryUpdateOptions } from "@/api/StoryApi";

import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";

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
