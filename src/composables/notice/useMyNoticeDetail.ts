import { computed, reactive, Ref } from "vue";
import { useQuery } from "vue-query";

import { MyNoticeDetailOptions } from "@/api/NoticeApi";
import { NoticeDetail } from "@/models/notice";

import { useApi } from "../common/useApi";

export function useMyNoticeDetail(options: Ref<MyNoticeDetailOptions>) {
  const api = useApi();

  const query = useQuery<NoticeDetail>({
    queryKey: computed(() => ["MY_NOTICE_DETAIL", options.value.notice_id]),
    queryFn: () => api.notice.myNoticeDetail(options.value).then((result) => result.data),
  });

  return reactive(query);
}
