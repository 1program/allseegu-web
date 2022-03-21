<template>
  <AppScaffold title="영상" has-top-button>
    <div class="container page-content">
      <template v-for="row in 10" :key="row">
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
      </template>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import ListCard from "@/components/common/ListCard.vue";
import ListDivider from "@/components/common/ListDivider.vue";

import videoThumbnail from "@/images/mocks/video-thumbnail.png";

export default defineComponent({
  name: "RedevDetailVideoList",
  components: { AppScaffold, ListCard, ListDivider },
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
