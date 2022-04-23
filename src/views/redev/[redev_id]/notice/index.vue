<template>
  <AppScaffold title="공지사항" has-top-button>
    <div class="container page-content">
      <ErrorFallback v-if="noticeList.error != null" :error="noticeList.error" />
      <LoadingFallback v-else-if="noticeList.data == null" />
      <!-- 페이지별 순회 -->
      <template v-else v-for="page in noticeList.data.pages" :key="page.current_page">
        <!-- 페이지 데이터가 없다면? -->
        <template v-if="page.total < 1">
          <AppFallback message="등록된 공지사항이 없습니다." />
        </template>

        <!-- 페이지 항목별 순회 -->
        <template v-else v-for="notice in page.data" :key="notice.id">
          <ListTile :title="notice.title" :to="`/redev/${notice.redev_id}/notice/${notice.id}`" />
          <ListDivider />
        </template>
      </template>

      <!-- 다음 페이지 불러오기 -->
      <InView v-if="noticeList.hasNextPage" @in-view="noticeList.fetchNextPage()">
        <LoadingFallback />
      </InView>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

import AppFallback from "@/components/common/AppFallback.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import ErrorFallback from "@/components/common/ErrorFallback.vue";
import InView from "@/components/common/InView.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import ListTile from "@/components/common/ListTile.vue";
import LoadingFallback from "@/components/common/LoadingFallback.vue";
import { useNoticeList } from "@/composables/notice/useNoticeList";

export default defineComponent({
  name: "RedevDetailNotice",
  components: {
    AppScaffold,
    ListTile,
    ListDivider,
    ErrorFallback,
    LoadingFallback,
    AppFallback,
    InView,
  },
  setup() {
    const route = useRoute();

    const options = computed(() => ({
      redev_id: parseInt(route.params.redev_id as string, 10),
    }));

    const noticeList = useNoticeList(options);

    return {
      noticeList,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.banner {
  margin-bottom: (60/2/16) * 1rem;
}
</style>
