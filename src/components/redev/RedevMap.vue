<template>
  <div ref="element" class="redev-map" />
</template>

<script lang="ts">
import { useApi } from "@/composables/api";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useAsyncInfiniteList } from "@/composables/async-infinite-list";
import { boundsFromLatLngs, centerFromBounds } from "@/lib/kakao-map-helpers";

export const REDEV_MAP_BLUE = "#2170fe";

export const REDEV_MAP_GREEN = "#00d23c";

export default defineComponent({
  name: "RedevMap",
  setup() {
    const api = useApi();

    const element = ref<HTMLDivElement>();

    // eslint-disable-next-line
    const kakaoMap = ref<kakao.maps.Map>();

    onMounted(() => {
      if (element.value != null) {
        kakaoMap.value = new window.kakao.maps.Map(element.value, {
          center: new window.kakao.maps.LatLng(37.54625801910263, 127.04814858320067),
          level: 12,
        });
      }
    });

    const redevList = useAsyncInfiniteList({
      using: ref(true),
      params: ref({
        page: 0,
        take: 10,
      }),
      loader: api.redev.redevList,
    });

    watch(
      () => ({ map: kakaoMap.value, list: redevList.list }),
      ({ map, list }) => {
        if (map != null && list.length > 0) {
          /// 목록 전체 바운더리
          const totalBounds = new window.kakao.maps.LatLngBounds();

          list.forEach((redev) => {
            const points = redev.geometry_points.map(
              (point) => new window.kakao.maps.LatLng(point.y, point.x)
            );

            const bounds = boundsFromLatLngs(points);

            const center = centerFromBounds(bounds);

            const polygonColor = redev.is_issue ? REDEV_MAP_BLUE : REDEV_MAP_GREEN;

            const poly = new window.kakao.maps.Polygon({
              path: points,
              fillColor: polygonColor,
              fillOpacity: 0.6,
              strokeColor: polygonColor,
              strokeWeight: 1,
            });

            points.forEach((point) => totalBounds.extend(point));

            const overlay = new window.kakao.maps.CustomOverlay({
              content: `<div class="redev-map-text">
                <div class="stroke">${redev.district}</div>
                <div class="text" style="color: ${polygonColor}">${redev.district}</div>
              </div>`,
              xAnchor: 0.5,
              yAnchor: 0.5,
              position: center,
              map,
            });

            poly.setMap(map);
          });

          map.setBounds(totalBounds);
        }
      }
    );

    return {
      element,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.redev-map {
  width: 100%;
  height: 100%;
}
</style>

<style lang="scss">
.redev-map-text {
  position: relative;
  font-size: 13px;

  .stroke {
    -webkit-text-stroke: 3px white;
  }

  .text {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
