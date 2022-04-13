<template>
  <AppScaffold title="전문가 의견" has-top-button>
    <div class="container page-content">
      <SubscribeBanner class="banner" />
      <ErrorFallback v-if="subscribeList.error != null" :error="subscribeList.error" />
      <LoadingFallback v-else-if="subscribeList.data == null" />
      <!-- 페이지별 순회 -->
      <template v-else v-for="page in subscribeList.data.pages" :key="page.current_page">
        <!-- 페이지 데이터가 없다면? -->
        <template v-if="page.total < 1">
          <AppFallback message="등록된 전문가 의견이 없습니다." />
        </template>
        <!-- 페이지 항목별 순회 -->
        <template v-else v-for="subscribe in page.data" :key="subscribe.id">
          <ListTile
            :title="subscribe.title"
            :to="`/redev/${subscribe.redev_id}/subscribe/${subscribe.id}`"
          />
          <ListDivider />
        </template>
      </template>

      <!-- 다음 페이지가 있는가? -->
      <InView v-if="subscribeList.hasNextPage" @in-view="subscribeList.fetchNextPage">
        <LoadingFallback />
      </InView>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

import AppScaffold from "@/components/common/AppScaffold.vue";
import ErrorFallback from "@/components/common/ErrorFallback.vue";
import SubscribeBanner from "@/components/subscribe/SubscribeBanner.vue";
import ListTile from "@/components/common/ListTile.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import { useSubscribeList } from "@/composables/subscribe/useSubscribeList";
import LoadingFallback from "@/components/common/LoadingFallback.vue";
import InView from "@/components/common/InView.vue";
import AppFallback from "@/components/common/AppFallback.vue";

export default defineComponent({
  name: "RedevDetailSubscribe",
  components: {
    AppScaffold,
    SubscribeBanner,
    ListTile,
    ListDivider,
    LoadingFallback,
    InView,
    ErrorFallback,
    AppFallback,
  },
  setup() {
    const route = useRoute();

    const options = computed(() => ({
      redev_id: parseInt(route.params.redev_id as string, 10),
    }));

    const subscribeList = useSubscribeList(options);

    return {
      subscribeList,
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
