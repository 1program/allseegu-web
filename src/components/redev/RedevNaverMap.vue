<template>
  <div ref="element" />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, shallowRef, watch } from "vue";

import { RedevGeometry } from "@/models/redev";
import { MarkerClustering } from "@/utils/naver-maps/MarkerClustering";
import { NewtownMarker } from "@/utils/redev/NewtownMarker";
import { NewtownPolygon } from "@/utils/redev/NewtownPolygon";
import { RedevClustering } from "@/utils/redev/RedevClustering";
import { RedevMarker } from "@/utils/redev/RedevMarker";
import { RedevPolygon } from "@/utils/redev/RedevPolygon";
import { zoomPresets } from "@/utils/redev/zoomPresets";

export default defineComponent({
  name: "RedevNaverMap",
  props: {
    redevs: {
      type: Array as PropType<RedevGeometry[]>,
      default: () => [],
      description: "지도에서 사용될 재개발 정보 배열",
    },
    position: {
      type: Object as PropType<GeolocationPosition | null>,
      default: null,
      description: "사용자 현재 위치. 해당 값이 변경되면 지도의 초점이 맞추어진다.",
    },
    relayoutKey: {
      type: String,
      description: "레이아웃이 변경될 시 해당 키 기반으로 지도를 재렌더한다.",
    },
  },
  emits: {
    "click-redev": (id: number) => true,
    "bounds-change": (bounds: naver.maps.Bounds) => true,
  },
  setup(props, context) {
    const element = ref<HTMLDivElement>();

    const map = shallowRef<naver.maps.Map>();

    const clustering = shallowRef<InstanceType<typeof MarkerClustering>>();

    // 확대레벨
    const zoom = ref<number>();

    const center = ref<naver.maps.Coord>();

    const bounds = ref<naver.maps.Bounds>();

    watch(
      () => element.value,
      (newElement) => {
        if (window.naver?.maps != null && newElement != null) {
          map.value?.destroy();

          const naverMap = new window.naver.maps.Map(newElement, {
            center: new window.naver.maps.LatLng(37.484282426045304, 126.9297012649466),
            zoom: zoomPresets["100m"],
            minZoom: 8,
            scaleControlOptions: {
              position: naver.maps.Position.TOP_LEFT,
            },
          });

          clustering.value = new RedevClustering(naverMap);

          map.value = naverMap;

          const handleIdle = () => {
            center.value = naverMap.getCenter();
            bounds.value = naverMap.getBounds();
            context.emit("bounds-change", naverMap.getBounds());
          };

          const handleZoom = () => {
            zoom.value = naverMap.getZoom();
          };

          handleIdle();

          handleZoom();

          naverMap.addListener("idle", handleIdle);

          naverMap.addListener("zoom_changed", handleZoom);
        }
      }
    );

    /*
    맵을 visibility hidden으로 가림 처리 해 두었기 때문에
    검색창에서 복귀하여 다시 보여질 시 relayout이 필요하다.
    */
    watch(
      () => props.relayoutKey,
      () => setTimeout(() => map.value?.refresh())
    );

    /*
    사용자의 현재 위치가 변경되면 지도를 업데이트 한다.
    */
    watch(
      () => [props.position, map.value],
      () => {
        if (map.value && props.position) {
          map.value.setCenter({
            lat: props.position.coords.latitude,
            lng: props.position.coords.longitude,
          });

          map.value.setZoom(zoomPresets["100m"]);
        }
      }
    );

    const polygons = shallowRef<naver.maps.Polygon[]>([]);

    watch(
      () => [map.value, clustering.value, props.redevs],
      () => {
        if (map.value && clustering.value) {
          polygons.value.forEach((polygon) => polygon.setMap(null));
          const newMarkers: naver.maps.OverlayView[] = [];
          const newPolygons: naver.maps.Polygon[] = [];
          props.redevs.forEach((redev) => {
            if (redev.is_newtown === 1) {
              newMarkers.push(new NewtownMarker(redev));
              newPolygons.push(new NewtownPolygon(redev, map.value!));
            } else {
              newMarkers.push(new RedevMarker(redev, () => context.emit("click-redev", redev.id)));
              newPolygons.push(new RedevPolygon(redev, map.value!));
            }
          });
          (clustering.value as any).setMarkers(newMarkers);
          polygons.value = newPolygons;
        }
      }
    );

    return {
      element,
    };
  },
});
</script>
