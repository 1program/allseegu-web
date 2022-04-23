import { computed, reactive } from "vue";
import { useQuery } from "vue-query";

import { FaqType } from "@/models/faq/FaqType";

import { useApi } from "../common/useApi";
import { useMe } from "../user/useMe";

export function useFaqTypes() {
  const api = useApi();
  const me = useMe();

  const query = useQuery<FaqType[]>({
    queryKey: computed(() => ["FAQ_TYPES", me.data?.id]),
    queryFn: () => api.faq.types().then((result) => result.data),
  });

  return reactive(query);
}
