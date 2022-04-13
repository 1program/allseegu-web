import { computed, reactive, Ref } from "vue";
import { useQuery } from "vue-query";

import { SubscribeDetailOptions } from "@/api/SubscribeApi";

import { useApi } from "../common/useApi";

export function useSubscribeDetail(options: Ref<SubscribeDetailOptions>) {
  const api = useApi();

  const query = useQuery({
    queryKey: computed(() => ["SUBSCRIBE_DETAIL", options.value.subscribe_id]),
    queryFn: () => api.subscribe.subscribeDetail(options.value).then((result) => result.data),
  });

  return reactive(query);
}
