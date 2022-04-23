import { computed, reactive, Ref } from "vue";
import { useQuery } from "vue-query";

import { RedevDetail } from "@/models/redev";

import { useApi } from "../common/useApi";

export function useRedevDetail(redev_id: Ref<number>) {
  const api = useApi();

  const query = useQuery<RedevDetail>({
    queryKey: computed(() => ["REDEV_DETAIL", redev_id.value]),
    queryFn: () =>
      api.redev
        .detail({
          redev_id: redev_id.value,
        })
        .then((result) => result.data),
  });

  return reactive(query);
}
