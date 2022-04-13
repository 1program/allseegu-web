import { NewsListOptions } from "@/api/NewsApi";
import { PagedList } from "@/models/common";
import { News } from "@/models/news";
import { computed, reactive, Ref } from "vue";
import { useInfiniteQuery } from "vue-query";
import { useApi } from "../common/useApi";

export function useNewsList(options: Ref<NewsListOptions>) {
  const api = useApi();

  const query = useInfiniteQuery<PagedList<News>>({
    queryKey: computed(() => ["NEWS_LIST", options.value.redev_id, options.value.type_id]),
    queryFn: (context) =>
      api.news
        .newsList({
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
