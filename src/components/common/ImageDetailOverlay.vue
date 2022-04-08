<template>
  <div class="image-detail-overlay">
    <div class="header">
      <div class="title">{{ index + 1 }} / {{ images.length }}</div>
      <button class="close" @click="close">
        <img src="@/images/icons/close-white.svg" alt="닫기" />
      </button>
    </div>
    <div class="container content">
      <img class="image" alt="상세 이미지" :src="image.url" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { FileInfo } from "@/models/file";

export default defineComponent({
  name: "ImageDetailOverlay",
  props: {
    initialIndex: {
      type: Number,
    },
    images: {
      type: Array as PropType<FileInfo[]>,
      default: () => [],
    },
  },
  setup(props, context) {
    const index = ref<number>(props.initialIndex ?? 0);

    const image = computed(() => (props.images ?? [])[index.value]);

    return {
      index,
      image,
      close() {
        context.emit("close");
      },
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.image-detail-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1300;
  color: white;
}

.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: (111/2/16) * 1rem;
  padding: 0 (40/2/16) * 1rem;
  display: flex;
  align-items: center;
  background-color: black;

  .title {
    flex: 1 1 auto;
    font-size: (34/2/16) * 1rem;
  }

  .close {
    margin-left: auto;

    @include touchable;

    img {
      display: block;
      width: (38/2/16) * 1rem;
    }
  }
}

.content {
  width: 100%;
  height: 100%;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
}
</style>
