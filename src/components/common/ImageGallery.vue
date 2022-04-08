<template>
  <div class="image-gallery" v-if="images.length > 0">
    <template v-for="(image, index) in topImages" :key="image">
      <div class="item">
        <img class="image" :src="image.url" alt="이미지" />
        <button class="expand" v-if="index < 2" @click="activeIndex = index">
          <img class="expand-icon" src="@/images/icons/expand-white.svg" alt="크게 보기" />
        </button>
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
import { FileInfo } from "@/models/file";
import { defineComponent, PropType, ref } from "vue";
import ImageDetailOverlay from "./ImageDetailOverlay.vue";

export default defineComponent({
  name: "ImageGallery",
  components: { ImageDetailOverlay },
  props: {
    class: {
      type: String,
      default: null,
    },
    images: {
      type: Array as PropType<FileInfo[]>,
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
  width: 100%;

  .expand {
    position: absolute;
    bottom: (19/2/16) * 1rem;
    right: (19/2/16) * 1rem;
    width: (56/2/16) * 1rem;
    height: (56/2/16) * 1rem;
    background-color: rgba(black, 0.6);
    border-radius: (10/2/16) * 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    @include touchable;
  }

  .more {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(black, 0.6);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: (26/2/16) * 1rem;
    text-align: center;

    @include touchable;
  }
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

.expand-icon {
  display: block;
  width: (24/2/16) * 1rem;
  height: (24/2/16) * 1rem;
}

.plus-icon {
  display: block;
  width: (32/2/16) * 1rem;
  height: (32/2/16) * 1rem;
  margin-bottom: (10/2/16) * 1rem;
}
</style>
