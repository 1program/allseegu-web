import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";

import { StoryCreateOptions } from "@/api/StoryApi";

import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";

export function useStoryCreate() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  const api = useApi();

  const mutation = useMutation({
    mutationKey: "STORY_CREATE",
    mutationFn: async ({ redev_id, data }: StoryCreateOptions) => {
      return api.story.create({
        redev_id,
        data,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["MY_STORY_LIST"]);
      alert(data.message);
    },
    // TODO: 개선
    onError: (error: any) => alert(error.message),
  });

  return reactive(mutation);
}
