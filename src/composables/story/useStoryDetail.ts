import { computed, reactive, Ref } from "vue";
import { useQuery } from "vue-query";

import { StoryDetailOptions } from "@/api/StoryApi";
import { useApi } from "../common/useApi";

export function useStoryDetail(options: Ref<StoryDetailOptions>) {
  const api = useApi();

  return reactive(
    useQuery({
      queryKey: computed(() => ["STORY_DETAIL", options.value.story_id]),
      queryFn: () => api.story.detail(options.value).then((result) => result.data),
      retry: 0,
    })
  );
}
