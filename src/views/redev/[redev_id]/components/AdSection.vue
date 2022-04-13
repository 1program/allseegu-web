<template>
  <div class="section">
    <div class="section-title">광고</div>
    <div class="section-content content">
      <AppFallback v-if="ads.length < 1" message="등록된 광고가 없습니다." />
      <Swiper
        v-else
        class="ad-swiper"
        :modules="modules"
        :pagination="{ el: paginationEl, clickable: true }"
      >
        <SwiperSlide v-for="ad in ads" :key="ad.id">
          <a class="ad" :href="ad.link" target="_blank">
            <img :src="ad.files.images[0]?.url" :alt="ad.title" />
          </a>
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
import { defineComponent, PropType, ref } from "vue";

import { Ad } from "@/models/ad";
import AppFallback from "@/components/common/AppFallback.vue";

export default defineComponent({
  name: "RedevDetailAdSection",
  components: { Swiper, SwiperSlide, AppFallback },
  props: {
    ads: {
      type: Array as PropType<Ad[]>,
      required: true,
    },
  },
  setup() {
    const paginationEl = ref<HTMLDivElement | null>(null);

    return {
      modules: [Pagination],
      paginationEl,
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
  display: block;
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
