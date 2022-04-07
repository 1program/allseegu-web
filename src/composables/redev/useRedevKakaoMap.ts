import { RedevGeometry } from "@/models/redev";
import { getClustererStyle } from "@/utils/common/getClustererStyle";
import { getRedevOverlay } from "@/utils/redev/getRedevOverlay";
import { getRedevPolygon } from "@/utils/redev/getRedevPolygon";
import { computed, onMounted, ref, Ref, watch } from "vue";

export interface UseRedevKakaoMapOptions {
  /**
   * 카카오맵을 마운트할 DOM Element
   */
  element: Ref<HTMLDivElement | undefined>;

  /**
   * RedevGeometry 목록 반응형 객체
   */
  redevList: Ref<RedevGeometry[]>;

  /**
   * relayoutKey가 바뀌면 kakao map이 relayout 된다.
   */
  relayoutKey?: Ref<string | undefined>;

  position: Ref<GeolocationPosition | null>;

  onClickRedev: (redev: RedevGeometry) => void;
}

/**
 * 'RedevGeometry' 객체들을 카카오맵에 표현한다.
 *
 * https://devtalk.kakao.com/t/vue-js-api/121269
 *
 * Vue3의 reactive API와 Kakao Maps를 함께 사용하면..
 * 오류가 난다.
 * https://github.com/vuejs/core/pull/1060
 * 해결법 => mutable(ex. let map = ...) OR shallowRef
 */
export function useRedevKakaoMap({
  element,
  redevList,
  relayoutKey,
  position,
  onClickRedev,
}: UseRedevKakaoMapOptions) {
  let map: kakao.maps.Map;

  let clusterer: kakao.maps.MarkerClusterer;

  const level = ref<number>();

  const levelUnder5 = computed(() => level.value && level.value < 5);

  const center = ref<kakao.maps.LatLng>();

  const bounds = ref<kakao.maps.LatLngBounds>();

  onMounted(() => {
    if (window.kakao != null && element.value != null) {
      const newMap = new window.kakao.maps.Map(element.value, {
        center: new window.kakao.maps.LatLng(37.484282426045304, 126.9297012649466),
        level: 8,
      });

      newMap.setMaxLevel(12);

      map = newMap;

      const newClusterer = new window.kakao.maps.MarkerClusterer({
        map: newMap,
        gridSize: 160,
        minLevel: 5,
        minClusterSize: 1,
        calculator: [50, 100, 150],
        styles: [getClustererStyle(50), getClustererStyle(100), getClustererStyle(150)],
      });

      clusterer = newClusterer;

      const handleIdle = () => {
        center.value = newMap.getCenter();
        bounds.value = newMap.getBounds();
      };

      const handleZoom = () => {
        level.value = newMap.getLevel();
      };

      kakao.maps.event.addListener(newMap, "idle", handleIdle);
      kakao.maps.event.addListener(newMap, "zoom_changed", handleZoom);

      handleIdle();
      handleZoom();

      return () => {
        kakao.maps.event.removeListener(newMap, "idle", handleIdle);
        kakao.maps.event.removeListener(newMap, "zoom_changed", handleZoom);
      };
    }

    return undefined;
  });

  /*
  카카오맵을 visibility hidden으로 가림 처리 해 두었기 때문에
  검색창에서 복귀하여 다시 보여질 시 relayout이 필요하다.
  */
  watch(
    () => relayoutKey?.value,
    () => {
      setTimeout(() => map?.relayout(), 1);
    }
  );

  /*
  사용자의 현재 위치가 변경되면 지도를 업데이트 한다.
  */
  watch(
    () => position.value,
    (newPosition) => {
      const kakaoMap = map;
      if (kakaoMap && newPosition) {
        kakaoMap.setCenter(
          new kakao.maps.LatLng(newPosition.coords.latitude, newPosition.coords.longitude)
        );
        kakaoMap.setLevel(3);
      }
    }
  );

  let overlays: kakao.maps.CustomOverlay[] = [];
  let polygons: kakao.maps.Polygon[] = [];

  watch(
    () => [redevList.value, levelUnder5.value],
    () => {
      if (map && clusterer) {
        if ((clusterer as any).getMarkers().length > 0) {
          clusterer.clear();
          polygons.forEach((polygon) => polygon.setMap(null));
        }

        overlays = redevList.value.map((redev) =>
          getRedevOverlay(redev, map, () => onClickRedev(redev))
        );

        clusterer.addMarkers(overlays as any);

        if (levelUnder5.value) {
          /// 줌 5 이하일 때에만
          polygons = redevList.value.map((redev) =>
            getRedevPolygon(redev, map, () => onClickRedev(redev))
          );
        }
      }

      return undefined;
    }
  );

  return {
    level,
    center,
    bounds,
  };
}
