<template>
  <div class="section">
    <div class="section-title">광고</div>
    <div class="section-content content">
      <Swiper
        class="ad-swiper"
        :modules="modules"
        :pagination="{ el: paginationEl, clickable: true }"
      >
        <SwiperSlide v-for="image in images" :key="image">
          <div class="ad">
            <img :src="image" alt="광고 이미지" />
          </div>
        </SwiperSlide>
      </Swiper>
      <div class="pagination">
        <div ref="paginationEl" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { defineComponent, ref } from "vue";

import ad1 from "@/images/mocks/ad1.jpg";
import ad2 from "@/images/mocks/ad2.jpg";

const images = [ad1, ad2];

export default defineComponent({
  name: "AdSection",
  components: { Swiper, SwiperSlide },
  setup() {
    const paginationEl = ref<HTMLDivElement | null>(null);

    return {
      modules: [Pagination],
      paginationEl,

      images,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.content {
  position: relative;
}

.ad-swiper {
  border-radius: (10/2/16) * 1rem;
  overflow: hidden;
}

.ad {
  aspect-ratio: (670 / 281);
  background-color: rgba(0, 0, 0, 0.1);

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
}

.pagination {
  position: absolute;
  top: -2rem;
  right: 0;
  bottom: auto;
  width: auto;
}
</style>
