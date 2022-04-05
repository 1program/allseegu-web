<template>
  <Swiper class="ad-swiper">
    <SwiperSlide v-for="image in images" :key="image">
      <div class="ad">
        <img :src="image" alt="광고 이미지" />
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { defineComponent } from "vue";

import ad1 from "@/images/mocks/ad1.jpg";
import ad2 from "@/images/mocks/ad2.jpg";

const images = [ad1, ad2];

export default defineComponent({
  name: "AdSwiper",
  components: { Swiper, SwiperSlide },
  setup() {
    return {
      images,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.ad {
  background-color: rgba(0, 0, 0, 0.1);

  img {
    display: block;
    width: 100%;
  }
}
</style>
