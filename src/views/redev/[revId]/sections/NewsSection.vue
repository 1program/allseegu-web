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
            :title="news.title"
            :href="news.url"
            target="_blank"
          />
          <ListCard
            :thumbnail="newsThumbnail"
            :title="news.title"
            :href="news.url"
            target="_blank"
          />
        </div>
        <ListDivider />
        <div class="grid-row">
          <ListCard
            :thumbnail="newsThumbnail"
            :title="news.title"
            :href="news.url"
            target="_blank"
          />
          <ListCard
            :thumbnail="newsThumbnail"
            :title="news.title"
            :href="news.url"
            target="_blank"
          />
        </div>
      </template>
      <template v-else>
        <template v-for="index in 5" :key="index">
          <ListDivider v-if="index > 1" />
          <NewsTile :title="blog.title" :content="blog.content" :href="blog.url" target="_blank" />
        </template>
      </template>
    </div>
  </div>
  <MoreButton :to="`1/news/${type}`">{{ tab?.label }} 더보기</MoreButton>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
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

    const tab = computed(() => newsTypeOptions.find((option) => option.value === type.value));

    const news = {
      title: "서울 신림뉴타운, 서남부 최대규모 뉴타운으로 거듭날 준비",
      url: "https://www.businesspost.co.kr/BP?command=article_view&num=271345",
    };

    const blog = {
      title: "신림뉴타운+3개 경전철...신림동에 주목하라",
      content:
        "개발 호재가 겹치면서 최근 신림뉴타운 내 부동산 매물을 찾는 투자자의 발걸음도 크게 늘었다는 게 현지 중개업소들의 설명이다. 개발 호재가 겹치면서 최근 신림뉴타운 내 부동산 매물을 찾는 투자자의 발걸음도 크게 늘었다는 게 현지 중개업소들의 설명이다. ",
      url: "https://post.naver.com/viewer/postView.naver?volumeNo=20827824&memberNo=32662051",
    };

    return {
      type,
      tabs,
      tab,
      NewsType,
      newsThumbnail,
      news,
      blog,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
