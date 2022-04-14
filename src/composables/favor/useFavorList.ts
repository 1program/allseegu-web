import { computed, reactive } from "vue";
import { useQuery } from "vue-query";

import { useApi } from "../common/useApi";
import { useMe } from "../user/useMe";

export function useFavorList() {
  const me = useMe();

  const api = useApi();

  const query = useQuery({
    /// 새로 로그인하면 갱신하도록 키 구성
    queryKey: computed(() => ["FAVOR_LIST", me.data?.id]),
    queryFn: () => api.favor.favorList().then((result) => result.data),
    /// 로그인 했을 때만 사용하도록
    enabled: computed(() => me.data?.id != null),
    // 초기값은 밴배열이다.
    placeholderData: [],
  });

  return reactive(query);
}
