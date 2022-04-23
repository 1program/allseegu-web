import { ref, Ref, watch } from "vue";

import { RedevGeoSearchOptions } from "@/api/RedevApi";

/**
 * kakao LatLngBounds를 활용하여,
 * 사업상세 위치기반 검색에 필요한 파라메터를 생성한다.
 */
export function useRedevGeoSearchOptions({
  bounds,
}: {
  bounds: Ref<naver.maps.Bounds | undefined>;
}) {
  const options = ref<RedevGeoSearchOptions | null>(null);

  // 구역 bounds가 변경되면 요청 파라메터를 변경한다.
  watch(
    () => bounds.value,
    (newBounds, oldBounds) => {
      // 새로운 영역이 기존영역에 포함되지 않을 때에만 (축소) 요청하도록 한다.
      // 새로운 영역이 기존영역에 포함되면 (확대) 요청하지 않는다.
      if (oldBounds && newBounds && oldBounds.hasBounds(newBounds)) {
        return;
      }

      options.value = {
        sw_lng: bounds.value?.minX() ?? 0.0,
        sw_lat: bounds.value?.minY() ?? 0.0,
        ne_lng: bounds.value?.maxX() ?? 0.0,
        ne_lat: bounds.value?.maxY() ?? 0.0,
      };
    }
  );

  return options;
}
