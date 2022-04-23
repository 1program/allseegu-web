import { computed, reactive } from "vue";
import { useQuery } from "vue-query";

import { QnaType } from "@/models/qna/QnaType";

import { useApi } from "../common/useApi";
import { useMe } from "../user/useMe";

export function useQnaTypes() {
  const api = useApi();
  const me = useMe();

  const query = useQuery<QnaType[]>({
    queryKey: computed(() => ["QNA_TYPES", me.data?.id]),
    queryFn: () => api.qna.types().then((result) => result.data),
  });

  return reactive(query);
}
