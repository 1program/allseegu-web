import { RedevGeometry } from "@/models/redev";
import { getClustererStyle } from "@/utils/common/getClustererStyle";
import { getRedevOverlay } from "@/utils/redev/getRedevOverlay";
import { getRedevPolygon } from "@/utils/redev/getRedevPolygon";
import { computed, ref, Ref, shallowRef, watch, watchEffect } from "vue";
import { watchLog } from "../common/watchLog";

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
  const map = shallowRef<kakao.maps.Map>();

  const clusterer = shallowRef<kakao.maps.MarkerClusterer>();

  const level = ref<number>();

  const levelUnder5 = computed(() => level.value && level.value < 5);

  const center = ref<kakao.maps.LatLng>();

  const bounds = ref<kakao.maps.LatLngBounds>();

  watchEffect((onCleanup) => {
    if (window.kakao != null && element.value != null) {
      map.value = new window.kakao.maps.Map(element.value, {
        center: new window.kakao.maps.LatLng(37.484282426045304, 126.9297012649466),
        level: 8,
      });

      map.value.setMaxLevel(12);

      clusterer.value = new window.kakao.maps.MarkerClusterer({
        map: map.value,
        gridSize: 160,
        minLevel: 5,
        minClusterSize: 1,
        calculator: [50, 100, 150],
        styles: [getClustererStyle(50), getClustererStyle(100), getClustererStyle(150)],
      });

      const handleIdle = () => {
        center.value = map.value?.getCenter();
        bounds.value = map.value?.getBounds();
      };

      const handleZoom = () => {
        level.value = map.value?.getLevel();
      };

      kakao.maps.event.addListener(map.value, "idle", handleIdle);
      kakao.maps.event.addListener(map.value, "zoom_changed", handleZoom);

      handleIdle();
      handleZoom();

      onCleanup(() => {
        if (map.value) {
          kakao.maps.event.removeListener(map.value, "idle", handleIdle);
          kakao.maps.event.removeListener(map.value, "zoom_changed", handleZoom);
        }
      });
    }
  });

  /*
  카카오맵을 visibility hidden으로 가림 처리 해 두었기 때문에
  검색창에서 복귀하여 다시 보여질 시 relayout이 필요하다.
  */
  watch(
    () => relayoutKey?.value,
    () => {
      setTimeout(() => map.value?.relayout(), 1);
    }
  );

  /*
  사용자의 현재 위치가 변경되면 지도를 업데이트 한다.
  */
  watch(
    () => [position.value, map.value],
    () => {
      if (map.value && position.value) {
        map.value.setCenter(
          new kakao.maps.LatLng(position.value.coords.latitude, position.value.coords.longitude)
        );

        map.value.setLevel(3);
      }
    }
  );

  const overlays = shallowRef<kakao.maps.CustomOverlay[]>([]);

  const polygons = shallowRef<kakao.maps.Polygon[]>([]);

  watch(
    () => [map.value, clusterer.value, redevList.value, levelUnder5.value],
    () => {
      if (map.value && clusterer.value) {
        polygons.value.forEach((polygon) => polygon.setMap(null));

        clusterer.value.clear();

        overlays.value = redevList.value.map((redev) =>
          getRedevOverlay({
            redev,
            map: map.value,
            onClick: () => onClickRedev(redev),
          })
        );

        // CustomOverlay도 clusterer에 추가될 수 있다.
        // 타입 정의 부재로 any 사용.
        clusterer.value.addMarkers(overlays.value as any);

        if (levelUnder5.value) {
          /// 줌 5 이하일 때에만
          polygons.value = redevList.value.map((redev) =>
            getRedevPolygon({ redev, map: map.value, onClick: () => onClickRedev(redev) })
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
