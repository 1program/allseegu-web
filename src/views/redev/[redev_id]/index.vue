<template>
  <!-- TODO: 문의 - 중간에 광고가 들어가는 경우? -->
  <AppScaffold :title="redev.data?.title" has-top-button theme="primary">
    <template v-slot:actions>
      <AppBarAction to="/my">
        <img src="@/images/icons/my-icon-white.svg" width="22" alt="마이" />
      </AppBarAction>
    </template>

    <LoadingFallback v-if="redev.data == null" />
    <div v-else class="redev-detail-page">
      <!-- TODO: 문의중 - 배너 섹션 API 작업중 -->
      <RedevSwiper />
      <div class="container">
        <!-- 사업상세 컨텐츠를 순서/유형에 맞게 반복하여 뿌려준다. -->
        <template v-for="(content, index) in redev.data.contents" :key="content.id">
          <!-- 첫번째 항목이 아니라면 구분선을 표현한다. -->
          <div class="section-divider" v-if="index != 0" />
          <!-- 사업조건 섹션 -->
          <ConditionSection v-if="content.model == 'condition'" :condition="content.data" />
          <!-- 사업개요 섹션 -->
          <OutlineSection
            v-else-if="content.model == 'outline'"
            :redev_id="redev_id"
            :outline="content.data"
          />
          <!-- 전문가 의견 섹션 -->
          <SubscribeSection
            v-else-if="content.model == 'subscribe'"
            :redev_id="redev_id"
            :subscribes="content.data"
          />
          <!-- 영상 섹션 -->
          <VideoSection
            v-else-if="content.model == 'video'"
            :redev_id="redev_id"
            :videos="content.data"
          />
          <!-- 커뮤니티 (ex. 카톡 참여) 섹션 -->
          <CommunitySection
            v-else-if="content.model == 'community'"
            :redev_id="redev_id"
            :child="content.child"
          />
          <!-- 보도자료 섹션 -->
          <NewsSection
            v-else-if="content.model == 'news'"
            :redev_id="redev_id"
            :child="content.child"
          />
          <!-- 부동산 문의 섹션 -->
          <EstateSection
            v-else-if="content.model == 'estate'"
            :redev_id="redev_id"
            :estates="content.data"
          />
          <!-- 공지사항 섹션 -->
          <NoticeSection
            v-else-if="content.model == 'notice'"
            :redev_id="redev_id"
            :notices="content.data"
          />
          <!-- 우리 구역 이야기 섹션 -->
          <!-- TODO: 우리 구역 이야기 등록 후, 우리 구역 이야기 댓글 등록 후 해당 캐시 업데이트 되어야 한다. -->
          <StorySection
            v-else-if="content.model == 'story'"
            :redev_id="redev_id"
            :stories="content.data"
          />
          <!-- 광고 섹션 -->
          <AdSection v-else-if="content.model == 'ad'" :ads="content.data" />
        </template>
      </div>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
// Libraries
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

// Business logic hooks
import { useRedevDetail } from "@/composables/redev/useRedevDetail";

// 글로벌 컴포넌트 임포트
import AppScaffold from "@/components/common/AppScaffold.vue";
import RedevSwiper from "@/components/redev/RedevSwiper.vue";
import AppBarAction from "@/components/common/AppBarAction.vue";
import LoadingFallback from "@/components/common/LoadingFallback.vue";

// 페이지용 지역 컴포넌트 임포트
import NewsSection from "./components/NewsSection.vue";
import EstateSection from "./components/EstateSection.vue";
import VideoSection from "./components/VideoSection.vue";
import SubscribeSection from "./components/SubscribeSection.vue";
import OutlineSection from "./components/OutlineSection.vue";
import NoticeSection from "./components/NoticeSection.vue";
import StorySection from "./components/StorySection.vue";
import ConditionSection from "./components/ConditionSection.vue";
import AdSection from "./components/AdSection.vue";
import CommunitySection from "./components/CommunitySection.vue";

export default defineComponent({
  name: "RedevDetailPage",
  components: {
    AppScaffold,
    RedevSwiper,
    NewsSection,
    EstateSection,
    VideoSection,
    SubscribeSection,
    OutlineSection,
    NoticeSection,
    StorySection,
    ConditionSection,
    AdSection,
    CommunitySection,
    AppBarAction,
    LoadingFallback,
  },
  setup() {
    const route = useRoute();

    const redev_id = computed(() => parseInt(route.params.redev_id as string, 10));

    const redev = useRedevDetail(redev_id);

    return { redev_id, redev };
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
