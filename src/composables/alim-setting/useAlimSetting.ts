import { computed, reactive } from "vue";
import { useQuery } from "vue-query";

import { useApi } from "../common/useApi";
import { useMe } from "../user/useMe";

export function useAlimSetting() {
  const api = useApi();

  const me = useMe();

  const query = useQuery({
    queryKey: computed(() => ["ALIM_SETTING", me.data?.id]),
    queryFn: () => api.alimSetting.get().then((result) => result.data),
  });

  return reactive(query);
}
