import { computed, reactive, Ref } from "vue";
import { useInfiniteQuery } from "vue-query";

import { FaqSearchOptions } from "@/api/FaqApi";
import { PagedList } from "@/models/common";
import { Faq } from "@/models/faq";

import { useApi } from "../common/useApi";

export function useFaqSearch(options: Ref<FaqSearchOptions>, enabled: Ref<boolean>) {
  const api = useApi();

  const query = useInfiniteQuery<PagedList<Faq>>({
    queryKey: computed(() => ["FAQ_SEARCH", options.value.query]),
    queryFn: (context) =>
      api.faq
        .search({
          take: 20,
          ...options.value,
          page: context.pageParam,
        })
        .then((result) => result.data),
    getNextPageParam: (lastPage) => lastPage.next_page,
    getPreviousPageParam: (firstPage) => firstPage.prev_page,
    enabled,
  });

  return reactive(query);
}
