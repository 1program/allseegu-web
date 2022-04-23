import { computed, reactive } from "vue";
import { useInfiniteQuery } from "vue-query";

import { PagedList } from "@/models/common";
import { Story } from "@/models/story";

import { useApi } from "../common/useApi";
import { useMe } from "../user/useMe";

// TODO: Key naming 고민
// TODO: 글쓰면 invalidate
export function useMyStoryList() {
  const me = useMe();
  const api = useApi();

  const query = useInfiniteQuery<PagedList<Story>>({
    queryKey: computed(() => ["MY_STORY_LIST", me.data?.id]),
    queryFn: (context) =>
      api.post
        .storyList({
          take: 20,
          page: context.pageParam,
        })
        .then((result) => result.data),
    getNextPageParam: (lastPage) => lastPage.next_page,
    getPreviousPageParam: (firstPage) => firstPage.prev_page,
  });

  return reactive(query);
}
