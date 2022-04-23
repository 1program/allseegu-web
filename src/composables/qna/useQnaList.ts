import { computed, reactive, Ref } from "vue";
import { useInfiniteQuery } from "vue-query";

import { QnaListOptions } from "@/api/QnaApi";
import { PagedList } from "@/models/common";
import { Qna } from "@/models/qna";

import { useApi } from "../common/useApi";

export function useQnaList(options: Ref<QnaListOptions>) {
  const api = useApi();

  const query = useInfiniteQuery<PagedList<Qna>>({
    queryKey: computed(() => ["QNA_LIST", options.value.type_id]),
    queryFn: (context) =>
      api.qna
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
