<template>
  <AppScaffold title="을씨구 공지사항" has-top-button>
    <ErrorFallback v-if="myNoticeList.error != null" :error="myNoticeList.error" />
    <LoadingFallback v-else-if="myNoticeList.data == null" />
    <!-- 페이지별 순회 -->
    <div v-else class="page-wrapper container page-content-medium">
      <!-- 페이지별 순회 -->
      <template v-for="page in myNoticeList.data.pages" :key="page.current_page">
        <!-- 페이지 데이터가 없다면? -->
        <template v-if="page.total < 1">
          <AppFallback message="등록된 공지사항이 없습니다." />
        </template>

        <!-- 페이지 항목별 순회 -->
        <template v-else v-for="notice in page.data" :key="notice.id">
          <ListTile badge="공지" :title="notice.title" :to="`/my/customer/notice/${notice.id}`" />
          <ListDivider />
        </template>
      </template>

      <!-- 다음 페이지 불러오기 -->
      <InView v-if="myNoticeList.hasNextPage" @in-view="myNoticeList.fetchNextPage()">
        <LoadingFallback />
      </InView>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import AppFallback from "@/components/common/AppFallback.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import ErrorFallback from "@/components/common/ErrorFallback.vue";
import InView from "@/components/common/InView.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import ListTile from "@/components/common/ListTile.vue";
import LoadingFallback from "@/components/common/LoadingFallback.vue";
import { useMyNoticeList } from "@/composables/notice/useMyNoticeList";

export default defineComponent({
  name: "MyCustomerNoticeList",
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
    const myNoticeList = useMyNoticeList(
      computed(() => ({
        take: 10,
      }))
    );

    return { myNoticeList };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
