import { RedevSearchOptions } from "@/api/RedevApi";
import { PagedList } from "@/models/common";
import { Redev } from "@/models/redev";
import { computed, reactive, Ref } from "vue";
import { useInfiniteQuery } from "vue-query";
import { useApi } from "../common/useApi";

export function useRedevSearch(options: Ref<RedevSearchOptions>) {
  const api = useApi();

  const query = useInfiniteQuery<PagedList<Redev>>({
    queryKey: computed(() => ["redevSearch", options.value]),
    queryFn: (context) =>
      api.redev
        .search({
          ...options.value,
          page: context.pageParam,
          take: 20,
        })
        .then((result) => result.data),
    getNextPageParam: (lastPage) =>
      lastPage.next_page_url != null ? lastPage.current_page + 1 : undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage.prev_page_url != null ? firstPage.current_page - 1 : undefined,
    retry: 0,
    retryDelay: 10,
    enabled: computed(() => options.value.query != null),
  });

  const totalCount = computed(() => query.data.value?.pages[0].total);

  return reactive({
    ...query,
    totalCount,
  });
}
