<template>
  <AppScaffold title="신림 1구역 도시 정비 사업" has-top-button>
    <template v-slot:actions>
      <AppBarAction to="/my">
        <img src="@/images/icons/my-icon-black.svg" width="22" alt="마이" />
      </AppBarAction>
    </template>
    <div class="redev-detail-page">
      <RedevSwiper />
      <div class="container">
        <!-- 요약 섹션 -->
        <SummarySection />
        <div class="section-divider" />
        <!-- 사업개요 섹션 -->
        <OutlineSection />
        <div class="section-divider" />
        <!-- 전문가 의견 섹션 -->
        <SubscribeSection />
        <AdSwiper />
        <!-- <div class="ad">광고 위치<br />협의예정</div> -->
        <div class="section-divider" />
        <!-- 영상 섹션 -->
        <VideoSection />
        <div class="section-divider" />
        <!-- 커뮤니티 (ex. 카톡 참여) 섹션 -->
        <CommunitySection />
        <div class="section-divider" />
        <!-- 보도자료 섹션 -->
        <NewsSection />
        <div class="section-divider" />
        <!-- 부동산 문의 섹션 -->
        <AgentSection />
        <div class="section-divider" />
        <!-- 공지사항 섹션 -->
        <NoticeSection />
        <div class="section-divider" />
        <!-- 우리 구역 이야기 섹션 -->
        <StorySection />
        <div class="section-divider" />
        <!-- 광고 섹션 -->
        <AdSection />
      </div>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import RedevSwiper from "@/components/redev/RedevSwiper.vue";
import AppBarAction from "@/components/common/AppBarAction.vue";
import AdSwiper from "@/components/ad/AdSwiper.vue";

import NewsSection from "./sections/NewsSection.vue";
import AgentSection from "./sections/AgentSection.vue";
import VideoSection from "./sections/VideoSection.vue";
import SubscribeSection from "./sections/SubscribeSection.vue";
import OutlineSection from "./sections/OutlineSection.vue";
import NoticeSection from "./sections/NoticeSection.vue";
import StorySection from "./sections/StorySection.vue";
import SummarySection from "./sections/SummarySection.vue";
import AdSection from "./sections/AdSection.vue";
import CommunitySection from "./sections/CommunitySection.vue";

export default defineComponent({
  name: "RedevDetailPage",
  components: {
    AppScaffold,
    RedevSwiper,
    NewsSection,
    AgentSection,
    VideoSection,
    SubscribeSection,
    OutlineSection,
    NoticeSection,
    StorySection,
    SummarySection,
    AdSection,
    CommunitySection,
    AppBarAction,
    AdSwiper,
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.ad {
  background-color: #e7e7e7;
  height: (400/2/16) * 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: (30/2/16) * 1rem;
}
</style>
