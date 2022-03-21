<template>
  <div class="section">
    <div class="section-title">영상</div>
    <div class="section-content">
      <div class="grid-row">
        <ListCard
          is-video
          :thumbnail="videoThumbnail"
          title="SBS 뉴스에 소개된 봉천동 재개발 신림뉴타운 사업 SBS 뉴스에 소개된 봉천동 재개발 신림뉴타운 사업"
        />
        <ListCard
          is-video
          :thumbnail="videoThumbnail"
          title="SBS 뉴스에 소개된 봉천동 재개발 신림뉴타운 사업 SBS 뉴스에 소개된 봉천동 재개발 신림뉴타운 사업"
        />
      </div>
      <ListDivider />
      <div class="grid-row">
        <ListCard
          is-video
          :thumbnail="videoThumbnail"
          title="SBS 뉴스에 소개된 봉천동 재개발 신림뉴타운 사업 SBS 뉴스에 소개된 봉천동 재개발 신림뉴타운 사업"
        />
        <ListCard
          is-video
          :thumbnail="videoThumbnail"
          title="SBS 뉴스에 소개된 봉천동 재개발 신림뉴타운 사업 SBS 뉴스에 소개된 봉천동 재개발 신림뉴타운 사업"
        />
      </div>
    </div>
  </div>
  <MoreButton to="1/video">영상 더보기</MoreButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MoreButton from "@/components/common/MoreButton.vue";
import ListCard from "@/components/common/ListCard.vue";
import ListDivider from "@/components/common/ListDivider.vue";

import videoThumbnail from "@/images/mocks/video-thumbnail.png";

export default defineComponent({
  name: "RedevDetailVideoSection",
  components: { MoreButton, ListCard, ListDivider },
  setup() {
    return {
      videoThumbnail,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
