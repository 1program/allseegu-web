<template>
  <AppScaffold :title="type?.title" :title-loading="type?.title == null" has-top-button>
    <ErrorFallback v-if="newsList.error != null" :error="newsList.error" />
    <LoadingFallback v-else-if="newsList.data == null" />
    <div v-else class="container">
      <div class="page-content">
        <!-- 페이지 반복 -->
        <template v-for="page in newsList.data.pages" :key="page.current_page">
          <!-- 페이지 데이터가 없다면? -->
          <AppFallback v-if="page.total < 1" :message="emptyMessage" />

          <!-- 뉴스라면? -->
          <template v-else-if="type_id === NewsType.NEWS">
            <!-- 2개씩 반복 -->
            <template v-for="(row, index) in chunkArray(page.data, 2)" :key="index">
              <ListDivider v-if="index > 0" />
              <div class="row">
                <!-- 각 항목 반복 -->
                <template v-for="news in row" :key="news.id">
                  <ListCard
                    :thumbnail="news.files.images[0]?.url"
                    :title="news.title"
                    :href="news.link"
                    target="_blank"
                  />
                </template>
              </div>
            </template>
          </template>

          <!-- 그 외의 경우 -->
          <template v-else v-for="(news, index) in page.data" :key="news.id">
            <ListDivider v-if="index > 0" />
            <NewsTile
              :title="news.title"
              :content="news.content"
              :href="news.link"
              target="_blank"
            />
          </template>
        </template>

        <!-- 데이터 더 불러오기 -->
        <InView v-if="newsList.hasNextPage" @in-view="newsList.fetchNextPage">
          <LoadingFallback />
        </InView>
      </div>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import Josa from "josa-js";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

import AppFallback from "@/components/common/AppFallback.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import ErrorFallback from "@/components/common/ErrorFallback.vue";
import InView from "@/components/common/InView.vue";
import ListCard from "@/components/common/ListCard.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import LoadingFallback from "@/components/common/LoadingFallback.vue";
import NewsTile from "@/components/news/NewsTile.vue";
import { useNewsList } from "@/composables/news/useNewsList";
import { useNewsTypes } from "@/composables/news/useNewsTypes";
import { NewsType } from "@/models/news";
import { chunkArray } from "@/utils/common/chunkArray";

export default defineComponent({
  name: "RedevDetailNewsList",
  components: {
    AppScaffold,
    ListDivider,
    ListCard,
    NewsTile,
    ErrorFallback,
    LoadingFallback,
    AppFallback,
    InView,
  },
  setup() {
    const route = useRoute();

    const redev_id = computed(() => parseInt(route.params.redev_id as string, 10));

    const type_id = computed(() => parseInt(route.params.type_id as string, 10) as NewsType);

    const types = useNewsTypes();

    const type = computed(() => types.data?.find((item) => item.id === type_id.value));

    const emptyMessage = computed(() => `등록된 ${Josa.r(type.value?.title, "가")} 없습니다.`);

    const newsList = useNewsList(
      computed(() => ({
        redev_id: redev_id.value,
        type_id: type_id.value,
      }))
    );

    return {
      redev_id,
      type_id,
      type,
      emptyMessage,
      NewsType,
      newsList,
      chunkArray,
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
