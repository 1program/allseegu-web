import { StoryCreateOptions } from "@/api/StoryApi";
import { reactive } from "vue";
import { useMutation } from "vue-query";
import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";

export function useStoryCreate() {
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
    onSuccess: (data) => alert(data.message),
    // TODO: 개선
    onError: (error: any) => alert(error.message),
  });

  return reactive(mutation);
}
