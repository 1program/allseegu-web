<template>
  <div class="section">
    <div class="section-title">
      <TabBar :current-tab="type" @change-tab="type = $event" :tabs="tabs" />
    </div>
    <div class="section-content">
      <template v-if="type === NewsType.NEWS">
        <div class="grid-row">
          <ListCard
            :thumbnail="newsThumbnail"
            title="SBS 뉴스에 소개된 봉천동 재개발 신림뉴타운 사업 SBS 뉴스에 소개된 봉천동 재개발 신림뉴타운 사업"
          />
          <ListCard
            :thumbnail="newsThumbnail"
            title="SBS 뉴스에 소개된 봉천동 재개발 신림뉴타운 사업 SBS 뉴스에 소개된 봉천동 재개발 신림뉴타운 사업"
          />
        </div>
        <ListDivider />
        <div class="grid-row">
          <ListCard
            :thumbnail="newsThumbnail"
            title="SBS 뉴스에 소개된 봉천동 재개발 신림뉴타운 사업 SBS 뉴스에 소개된 봉천동 재개발 신림뉴타운 사업"
          />
          <ListCard
            :thumbnail="newsThumbnail"
            title="SBS 뉴스에 소개된 봉천동 재개발 신림뉴타운 사업 SBS 뉴스에 소개된 봉천동 재개발 신림뉴타운 사업"
          />
        </div>
      </template>
      <template v-else>
        <template v-for="index in 5" :key="index">
          <ListDivider v-if="index > 1" />
          <NewsTile
            title="신림뉴타운+3개 경전철...신림동에 주목하라"
            content="개발 호재가 겹치면서 최근 신림뉴타운 내 부동산 매물을 찾는 투자자의 발걸음도 크게 늘었다는 게 현지 중개업소들의 설명이다. 개발 호재가 겹치면서 최근 신림뉴타운 내 부동산 매물을 찾는 투자자의 발걸음도 크게 늘었다는 게 현지 중개업소들의 설명이다. "
          />
        </template>
      </template>
    </div>
  </div>
  <MoreButton :to="`1/news/${type}`">보도자료 더보기</MoreButton>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ListDivider from "@/components/common/ListDivider.vue";
import ListCard from "@/components/common/ListCard.vue";
import MoreButton from "@/components/common/MoreButton.vue";
import TabBar from "@/components/common/TabBar.vue";
import { NewsType, newsTypeOptions } from "@/models/news";
import NewsTile from "@/components/news/NewsTile.vue";

import newsThumbnail from "@/images/mocks/news-thumbnail.png";

export default defineComponent({
  name: "RedevDetailNewsSection",
  components: { ListDivider, ListCard, MoreButton, TabBar, NewsTile },
  setup() {
    const type = ref(NewsType.NEWS);

    const tabs = newsTypeOptions.map((option) => ({ id: option.value, title: option.label }));

    return {
      type,
      tabs,
      NewsType,
      newsThumbnail,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
