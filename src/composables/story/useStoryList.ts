import { computed, reactive, Ref } from "vue";
import { useInfiniteQuery } from "vue-query";
import { StoryListOptions } from "@/api/StoryApi";
import { PagedList } from "@/models/common";
import { Story } from "@/models/story";
import { useApi } from "../common/useApi";

export function useStoryList(options: Ref<StoryListOptions>) {
  const api = useApi();

  return reactive(
    useInfiniteQuery<PagedList<Story>>({
      queryKey: computed(() => ["storyList", options.value.redev_id]),
      queryFn: (context) =>
        api.story
          .list({
            ...options.value,
            page: context.pageParam,
            take: 20,
          })
          .then((result) => result.data),
      // TODO: 간소화
      getNextPageParam: (lastPage) =>
        lastPage.next_page_url != null ? lastPage.current_page + 1 : undefined,
      // TODO: 간소화
      getPreviousPageParam: (firstPage) =>
        firstPage.prev_page_url != null ? firstPage.current_page - 1 : undefined,
      retry: 0,
      retryDelay: 0,
    })
  );
}
