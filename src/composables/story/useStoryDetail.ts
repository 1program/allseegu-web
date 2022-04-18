import { computed, reactive, Ref } from "vue";
import { useQuery } from "vue-query";

import { StoryDetailOptions } from "@/api/StoryApi";
import { useApi } from "../common/useApi";

export function useStoryDetail(options: Ref<StoryDetailOptions | null>) {
  const api = useApi();

  const query = useQuery({
    queryKey: computed(() => ["STORY_DETAIL", options.value?.story_id]),
    queryFn: () =>
      options.value == null ? null : api.story.detail(options.value).then((result) => result.data),
  });

  return reactive(query);
}
