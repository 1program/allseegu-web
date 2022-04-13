import { computed, reactive, Ref } from "vue";

import { useQuery } from "vue-query";

import { RedevGeoSearchOptions } from "@/api/RedevApi";

import { useApi } from "../common/useApi";

/**
 * 위치기반으로 사업목록을 검색한다.
 * options가 바뀌면 자동으로 재요청 된다.
 */
export function useRedevGeoSearch(options: Ref<RedevGeoSearchOptions | null>) {
  const api = useApi();

  // `useQuery`가 리턴하는 데이터들은 Ref 즉 .value로 접근해야 하는 데이터들이다.
  // `reactive`를 사용해 이를 평면화 시켜준다.
  return reactive(
    useQuery({
      queryKey: ["REDEV_GEO_SEARCH", options],
      queryFn: () =>
        options.value == null
          ? []
          : api.redev.geoSearch(options.value).then((result) => result.data),
      enabled: computed(() => options.value != null),
    })
  );
}
