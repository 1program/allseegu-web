<template>
  <AppScaffold :title="title" has-top-button>
    <div class="container">
      <div class="page-content">
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
            <NewsTile
              :title="blog.title"
              :content="blog.content"
              :href="blog.url"
              target="_blank"
            />
          </template>
        </template>
      </div>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import { useRoute } from "vue-router";
import ListDivider from "@/components/common/ListDivider.vue";
import { NewsType, newsTypeNames } from "@/models/news";
import ListCard from "@/components/common/ListCard.vue";
import NewsTile from "@/components/news/NewsTile.vue";

import newsThumbnail from "@/images/mocks/news-thumbnail.png";

export default defineComponent({
  name: "RedevDetailNewsList",
  components: { AppScaffold, ListDivider, ListCard, NewsTile },
  setup() {
    const route = useRoute();

    const type = parseInt(route.params.typeId as string, 10) as NewsType;

    const title = computed(() => newsTypeNames[type] ?? "-");

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
      title,
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

.filter {
  padding: $padding-x;
  padding-bottom: 0;
  text-align: right;
}
</style>
