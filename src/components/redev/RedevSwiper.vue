<template>
  <swiper
    class="redev-swiper"
    :modules="modules"
    :pagination="{ clickable: true }"
    :slides-per-view="1"
    :space-between="0"
    :autoplay="{ delay: 3000 }"
  >
    <swiper-slide v-for="slide in slides" :key="slide.id" v-slot="{ isActive }">
      <img v-if="slide.type === 'image'" :src="slide.value" alt="이미지" />
      <vimeo-player
        v-else-if="slide.type === 'vimeo'"
        class="player"
        :id="slide.value"
        :playing="isActive"
      />
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { Pagination, Autoplay } from "swiper";
// eslint-disable-next-line
import "swiper/css";
// eslint-disable-next-line
import "swiper/css/autoplay";
// eslint-disable-next-line
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/vue";
import { defineComponent } from "vue";

import redev1 from "@/images/mocks/redev1.jpg";
import redev2 from "@/images/mocks/redev2.jpg";

import VimeoPlayer from "../common/VimeoPlayer.vue";

type Slide =
  | { id: number; type: "image"; value: string }
  | { id: number; type: "vimeo"; value: number };

export default defineComponent({
  name: "RedevSwiper",
  components: { Swiper, SwiperSlide, VimeoPlayer },
  setup() {
    const slides: Slide[] = [
      { id: 0, type: "image", value: redev1 },
      { id: 1, type: "vimeo", value: 576985879 },
      { id: 2, type: "image", value: redev2 },
    ];

    return {
      modules: [Pagination, Autoplay],
      slides,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.redev-swiper {
  padding-bottom: (50/2/16) * 1rem;

  --swiper-pagination-bullet-horizontal-gap: 5px;
  --swiper-pagination-bullet-inactive-color: #{$color-lighter};
  --swiper-pagination-bullet-inactive-opacity: 1;
  --swiper-pagination-color: #{$color-blue};

  :deep(.swiper-slide) {
    height: (400/2/16) * 1rem;
  }

  :deep(.swiper-pagination) {
    bottom: 0;
  }

  :deep(.swiper-slide) {
    position: relative;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }
  }
}

.player {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  pointer-events: none;
  width: 100%;
  aspect-ratio: 1.77; // 16:9
}
</style>
