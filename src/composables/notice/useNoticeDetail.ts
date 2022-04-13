import { NoticeDetailOptions } from "@/api/NoticeApi";
import { NoticeDetail } from "@/models/notice";
import { computed, reactive, Ref } from "vue";
import { useQuery } from "vue-query";
import { useApi } from "../common/useApi";

export function useNoticeDetail(options: Ref<NoticeDetailOptions>) {
  const api = useApi();

  const query = useQuery<NoticeDetail>({
    queryKey: computed(() => ["NOTICE_DETAIL", options.value.notice_id]),
    queryFn: () => api.notice.noticeDetail(options.value).then((result) => result.data),
  });

  return reactive(query);
}
