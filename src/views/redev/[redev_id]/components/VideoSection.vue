<template>
  <div class="section">
    <div class="section-title">영상</div>
    <div class="section-content">
      <AppFallback v-if="rows.length < 1" message="등록된 영상이 없습니다." />
      <template v-for="(row, index) in rows" :key="row">
        <ListDivider v-if="index > 0" />
        <div class="row">
          <ListCard
            v-for="video in row"
            :key="video.id"
            is-video
            :thumbnail="video.files.images[0]?.url"
            :title="video.title"
            :href="video.link"
            target="_blank"
          />
        </div>
      </template>
    </div>
  </div>
  <MoreButton v-if="videos.length > 0" :to="`/redev/${redev_id}/video`">영상 더보기</MoreButton>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

import { chunkArray } from "@/utils/common/chunkArray";

import { Video } from "@/models/video";

import MoreButton from "@/components/common/MoreButton.vue";
import ListCard from "@/components/common/ListCard.vue";
import ListDivider from "@/components/common/ListDivider.vue";

import videoThumbnail from "@/images/mocks/video-thumbnail.png";
import AppFallback from "@/components/common/AppFallback.vue";

export default defineComponent({
  name: "RedevDetailVideoSection",
  components: { MoreButton, ListCard, ListDivider, AppFallback },
  props: {
    redev_id: {
      type: Number,
      required: true,
    },
    videos: {
      type: Array as PropType<Video[]>,
      required: true,
    },
  },
  setup(props) {
    const rows = computed(() => chunkArray(props.videos, 2));

    return {
      rows,
      videoThumbnail,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: (19/2/16) * 1rem;
}
</style>
