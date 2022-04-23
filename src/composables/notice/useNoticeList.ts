import { computed, reactive, Ref } from "vue";
import { useInfiniteQuery } from "vue-query";

import { NoticeListOptions } from "@/api/NoticeApi";
import { PagedList } from "@/models/common";
import { Notice } from "@/models/notice";

import { useApi } from "../common/useApi";

export function useNoticeList(options: Ref<NoticeListOptions>) {
  const api = useApi();

  const query = useInfiniteQuery<PagedList<Notice>>({
    queryKey: computed(() => ["NOTICE_LIST", options.value.redev_id]),
    queryFn: (context) =>
      api.notice
        .noticeList({
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
