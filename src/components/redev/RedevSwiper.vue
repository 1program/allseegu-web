<template>
  <swiper
    class="redev-swiper"
    :modules="modules"
    :pagination="{ clickable: true }"
    :slides-per-view="1"
    :space-between="0"
    autoplay
  >
    <swiper-slide v-for="image in images" :key="image">
      <img :src="image" :alt="image" />
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { defineComponent } from "vue";
import redev1 from "@/images/mocks/redev1.jpg";
import redev2 from "@/images/mocks/redev2.jpg";

// eslint-disable-next-line
import "swiper/css";
// eslint-disable-next-line
import "swiper/css/pagination";

const images = [redev1, redev2];

export default defineComponent({
  name: "RedevSwiper",
  components: { Swiper, SwiperSlide },
  setup() {
    return {
      modules: [Pagination],
      images,
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
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }
  }
}
</style>
