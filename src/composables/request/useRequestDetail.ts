import { computed, reactive, Ref } from "vue";
import { useQuery } from "vue-query";

import { RequestDetailOptions } from "@/api/RequestApi";

import { useApi } from "../common/useApi";

export function useRequestDetail(options: Ref<RequestDetailOptions>) {
  const api = useApi();

  const query = useQuery({
    queryKey: computed(() => ["REQUEST_DETAIL", options.value.request_id]),
    queryFn: () => api.request.detail(options.value).then((result) => result.data),
  });

  return reactive(query);
}
