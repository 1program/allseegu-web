import { computed, reactive, Ref } from "vue";
import { useInfiniteQuery } from "vue-query";

import { FaqListOptions } from "@/api/FaqApi";
import { PagedList } from "@/models/common";
import { Faq } from "@/models/faq";

import { useApi } from "../common/useApi";

export function useFaqList(options: Ref<FaqListOptions>, enabled: Ref<boolean>) {
  const api = useApi();

  const query = useInfiniteQuery<PagedList<Faq>>({
    queryKey: computed(() => ["FAQ_LIST", options.value.type_id]),
    queryFn: (context) =>
      api.faq
        .list({
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
