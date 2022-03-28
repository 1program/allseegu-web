<template>
  <div class="image-gallery" v-if="images.length > 0">
    <template v-for="(image, index) in topImages" :key="image">
      <div class="item">
        <img :src="image" alt="우리 구역 이야기 이미지" />
        <button class="magnify" v-if="index < 2" @click="activeIndex = index"></button>
        <button class="more" v-else @click="activeIndex = index">
          <img class="plus-icon" src="@/images/icons/plus-thick-white.svg" alt="더보기" />
          더보기
        </button>
      </div>
    </template>

    <ImageDetailOverlay
      v-if="activeIndex != null"
      :images="images"
      :initial-index="activeIndex"
      @close="activeIndex = null"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import ImageDetailOverlay from "./ImageDetailOverlay.vue";

export default defineComponent({
  name: "ImageGallery",
  props: {
    class: {
      type: String,
      default: null,
    },
    images: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props) {
    const topImages = props.images?.slice(0, 3);

    const activeIndex = ref<number | null>(null);

    return {
      topImages,
      activeIndex,
    };
  },
  components: { ImageDetailOverlay },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.image-gallery {
  display: flex;
  align-items: stretch;
  border-left: 1px solid #ddd;
  border-top: 1px solid #ddd;
}

.item {
  position: relative;
  aspect-ratio: 1;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: #333;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }

  .magnify {
    position: absolute;
    bottom: (19/2/16) * 1rem;
    right: (19/2/16) * 1rem;
    width: (56/2/16) * 1rem;
    height: (56/2/16) * 1rem;
    background-color: rgba(black, 0.6);
    border-radius: (10/2/16) * 1rem;

    @include touchable;
  }

  .more {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(black, 0.6);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: (26/2/16) * 1rem;
    text-align: center;

    @include touchable;

    .plus-icon {
      width: (32/2/16) * 1rem;
      height: (32/2/16) * 1rem;
      margin-bottom: (10/2/16) * 1rem;
    }
  }
}
</style>
