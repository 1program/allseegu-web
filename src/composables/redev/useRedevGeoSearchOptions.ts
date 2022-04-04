import { ref, Ref, watch } from "vue";

import { RedevGeoSearchOptions } from "@/api/RedevApi";
import { checkContainsBounds } from "@/utils/common/checkContainsBounds";

/**
 * kakao LatLngBounds를 활용하여,
 * 사업상세 위치기반 검색에 필요한 파라메터를 생성한다.
 */
export function useRedevGeoSearchOptions({
  bounds,
}: {
  bounds: Ref<kakao.maps.LatLngBounds | undefined>;
}) {
  const options = ref<RedevGeoSearchOptions | null>(null);

  // 구역 bounds가 변경되면 요청 파라메터를 변경한다.
  watch(
    () => bounds.value,
    (newBounds, oldBounds) => {
      // 새로운 영역이 기존영역에 포함되지 않을 때에만 요청하도록 한다.
      // 새로운 영역이 기존영역에 포함되면 요청하지 않는다.
      if (newBounds && oldBounds && checkContainsBounds(oldBounds, newBounds)) {
        return;
      }

      const sw = newBounds?.getSouthWest();
      const ne = newBounds?.getNorthEast();

      options.value = {
        sw_lng: sw?.getLng() ?? 0.0,
        sw_lat: sw?.getLat() ?? 0.0,
        ne_lng: ne?.getLng() ?? 0.0,
        ne_lat: ne?.getLat() ?? 0.0,
      };
    }
  );

  return options;
}
