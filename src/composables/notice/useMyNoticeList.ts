import { computed, reactive, Ref } from "vue";
import { useInfiniteQuery } from "vue-query";

import { MyNoticeListOptions } from "@/api/NoticeApi";
import { PagedList } from "@/models/common";
import { Notice } from "@/models/notice";

import { useApi } from "../common/useApi";
import { useMe } from "../user/useMe";

export function useMyNoticeList(options: Ref<MyNoticeListOptions>) {
  const api = useApi();
  const me = useMe();

  const query = useInfiniteQuery<PagedList<Notice>>({
    queryKey: computed(() => ["MY_NOTICE_LIST", me.data?.id]),
    queryFn: (context) =>
      api.notice
        .myNoticeList({
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
