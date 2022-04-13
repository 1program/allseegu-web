<template>
  <AppScaffold title="영상" has-top-button>
    <div class="container page-content">
      <ErrorFallback v-if="videoList.error != null" :error="videoList.error" />
      <LoadingFallback v-else-if="videoList.data == null" />
      <!-- 페이지별 순회 -->
      <template v-else v-for="page in videoList.data.pages" :key="page.current_page">
        <!-- 페이지 데이터가 없다면? -->
        <template v-if="page.total < 1">
          <AppFallback message="등록된 영상이 없습니다." />
        </template>
        <!-- 줄별 순회 -->
        <template v-else v-for="(row, rowIndex) in chunkArray(page.data, 2)" :key="rowIndex">
          <!-- 항목별 순회 -->
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
          <ListDivider />
        </template>
      </template>

      <!-- 다음 페이지가 있다면 더 불러온다. -->
      <InView v-if="videoList.hasNextPage" @in-view="videoList.fetchNextPage">
        <LoadingFallback />
      </InView>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import ListCard from "@/components/common/ListCard.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import { chunkArray } from "@/utils/common/chunkArray";

import { useRoute } from "vue-router";
import { useVideoList } from "@/composables/video/useVideoList";
import ErrorFallback from "@/components/common/ErrorFallback.vue";
import AppFallback from "@/components/common/AppFallback.vue";
import InView from "@/components/common/InView.vue";
import LoadingFallback from "@/components/common/LoadingFallback.vue";

export default defineComponent({
  name: "RedevDetailVideoList",
  components: {
    AppScaffold,
    ListCard,
    ListDivider,
    ErrorFallback,
    AppFallback,
    InView,
    LoadingFallback,
  },
  setup() {
    const route = useRoute();

    const options = computed(() => ({
      redev_id: parseInt(route.params.redev_id as string, 10),
    }));

    const videoList = useVideoList(options);

    return {
      videoList,
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
