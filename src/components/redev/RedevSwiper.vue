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
// eslint-disable-next-line
import "swiper/css";
// eslint-disable-next-line
import "swiper/css/pagination";

const images = [
  "https://img.freepik.com/free-photo/day-city-view_1417-1777.jpg?t=st=1647683215~exp=1647683815~hmac=dc29ce39703a4a6837442078dc8164f33d4dc93fa7c84bca1b4fb0fa192ada9b&w=740",
  "https://img.freepik.com/free-photo/skyscraper_1112-1088.jpg?t=st=1647683215~exp=1647683815~hmac=050c508702959b2c3e11842e81b17a76bb092ffb4d90dff9432f43111f98cc5f&w=740",
];

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
