<template>
  <div ref="element" class="redev-map" />
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, watch } from "vue";
import { useRedevGeoSearch } from "@/composables/redev/useRedevGeoSearch";
import { useRedevKakaoMap } from "@/composables/redev/useRedevKakaoMap";
import { useRouter } from "vue-router";
import { useRedevGeoSearchOptions } from "@/composables/redev/useRedevGeoSearchOptions";

export default defineComponent({
  name: "RedevMap",
  props: {
    relayoutKey: {
      type: String,
      description: "해당 키 기반으로 카카오 지도를 업데이트한다.",
    },
    position: {
      type: Object as PropType<GeolocationPosition | null>,
      default: null,
      description: "사용자 현재 위치. 해당 값이 변경되면 지도의 초점이 맞추어진다.",
    },
  },
  setup(props) {
    const router = useRouter();
    // 카카오맵이 올라갈 엘리먼트
    const element = ref<HTMLDivElement>();
    // 요청시 사용할 경계선이다.
    const requestBounds = ref<kakao.maps.LatLngBounds>();
    // 구역목록 요청시 사용할 옵션값.
    const options = useRedevGeoSearchOptions({
      bounds: requestBounds,
    });
    // 구역목록. options가 바뀌면 자동으로 재요청 된다.
    const redevList = useRedevGeoSearch(options);
    // 구역 카카오맵 사용
    const { bounds } = useRedevKakaoMap({
      element,
      redevList: computed(() => redevList.data ?? []),
      relayoutKey: computed(() => props.relayoutKey),
      position: computed(() => props.position),
      onClickRedev: (redev) => router.push(`/redev/${redev.id}`),
    });
    // 지도의 바운드를 요청바운드에 할당한다.
    watch(
      () => bounds.value,
      (newBound) => {
        requestBounds.value = newBound;
      }
    );
    return {
      // 렌더시 카카오맵이 마운트될 div를 얻기 위해 ref를 노출한다.
      element,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.redev-map {
  width: 100%;
  height: 100%;
  background-color: #9dbad1;
}
</style>
