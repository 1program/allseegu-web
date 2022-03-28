<template>
  <RouterLinkOrButton class="list-card">
    <div class="thumbnail">
      <img v-if="thumbnail != null" class="thumbnail-image" :src="thumbnail" alt="썸네일" />
      <div v-if="isVideo" class="video-cover">
        <img class="play-icon" src="@/images/icons/play.svg" alt="재생 아이콘" />
      </div>
    </div>
    <div class="title">{{ title }}</div>
  </RouterLinkOrButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouterLinkOrButton from "./RouterLinkOrButton.vue";

export default defineComponent({
  name: "ListCard",
  props: {
    title: {
      type: String,
      default: null,
    },
    isVideo: {
      type: Boolean,
      default: false,
    },
    thumbnail: {
      type: String,
      default: null,
    },
  },
  components: { RouterLinkOrButton },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.list-card {
  text-align: left;

  @include touchable;

  .thumbnail {
    position: relative;
    aspect-ratio: (324 / 184);
    background-color: #eee;

    .thumbnail-image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }

    .video-cover {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(black, 0.3);

      display: flex;
      align-items: center;
      justify-content: center;

      .play-icon {
        width: (32/2/16) * 1rem;
      }
    }
  }

  .title {
    margin-top: (28/2/16) * 1rem;
    font-size: (30/2/16) * 1rem;

    @include ellipsis(2);
  }
}
</style>
