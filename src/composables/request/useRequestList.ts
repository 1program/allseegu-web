import { computed, reactive } from "vue";
import { useInfiniteQuery } from "vue-query";

import { PagedList } from "@/models/common";
import { Request } from "@/models/request";

import { useApi } from "../common/useApi";

export function useRequestList() {
  const api = useApi();

  const query = useInfiniteQuery<PagedList<Request>>({
    queryKey: computed(() => ["REQUEST_LIST"]),
    queryFn: (context) =>
      api.request
        .list({
          take: 20,
          page: context.pageParam,
        })
        .then((result) => result.data),
    getNextPageParam: (lastPage) => lastPage.next_page,
    getPreviousPageParam: (firstPage) => firstPage.prev_page,
  });

  return reactive(query);
}
