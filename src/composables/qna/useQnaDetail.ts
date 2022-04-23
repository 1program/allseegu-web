import { computed, reactive, Ref } from "vue";
import { useQuery } from "vue-query";

import { QnaDetailOptions } from "@/api/QnaApi";

import { useApi } from "../common/useApi";

export function useQnaDetail(options: Ref<QnaDetailOptions | null>) {
  const api = useApi();

  const query = useQuery({
    queryKey: computed(() => ["QNA_DETAIL", options.value?.qna_id]),
    queryFn: () =>
      options.value == null ? null : api.qna.detail(options.value).then((result) => result.data),
  });

  return reactive(query);
}
