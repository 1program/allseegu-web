import { computed, reactive, Ref } from "vue";
import { useInfiniteQuery } from "vue-query";

import { RedevSearchOptions } from "@/api/RedevApi";
import { PagedList } from "@/models/common";
import { Redev } from "@/models/redev";

import { useApi } from "../common/useApi";

export function useRedevSearch(options: Ref<RedevSearchOptions>) {
  const api = useApi();

  const query = useInfiniteQuery<PagedList<Redev>>({
    queryKey: computed(() => ["REDEV_SEARCH", options.value]),
    queryFn: (context) =>
      api.redev
        .search({
          take: 20,
          ...options.value,
          page: context.pageParam,
        })
        .then((result) => result.data),
    getNextPageParam: (lastPage) => lastPage.next_page,
    getPreviousPageParam: (firstPage) => firstPage.prev_page,
    enabled: computed(() => options.value.query != null),
  });

  const totalCount = computed(() => query.data.value?.pages[0].total);

  return reactive({
    ...query,
    totalCount,
  });
}
