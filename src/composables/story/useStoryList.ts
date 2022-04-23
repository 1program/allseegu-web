import { computed, reactive, Ref } from "vue";
import { useInfiniteQuery } from "vue-query";

import { StoryListOptions } from "@/api/StoryApi";
import { PagedList } from "@/models/common";
import { Story } from "@/models/story";

import { useApi } from "../common/useApi";

export function useStoryList(options: Ref<StoryListOptions>) {
  const api = useApi();

  const query = useInfiniteQuery<PagedList<Story>>({
    queryKey: computed(() => ["STORY_LIST", options.value.redev_id]),
    queryFn: (context) =>
      api.story
        .list({
          take: 20,
          ...options.value,
          page: context.pageParam,
        })
        .then((result) => result.data),
    getNextPageParam: (lastPage) => lastPage.next_page,
    getPreviousPageParam: (firstPage) => firstPage.prev_page,
  });

  return reactive(query);
}
