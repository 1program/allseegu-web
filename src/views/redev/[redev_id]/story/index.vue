<template>
  <AppScaffold title="우리 구역 이야기" has-top-button>
    <div class="container page-content">
      <AppButton class="button" palette="outlined-blue" full to="story/write">
        <img class="plus-icon" src="@/images/icons/plus-thick.svg" alt="등록하기" />
        이야기 등록하기
      </AppButton>

      <ErrorFallback v-if="storyList.error != null" :error="storyList.error" />
      <LoadingFallback v-else-if="storyList.data == null" />
      <template v-else v-for="page in storyList.data.pages" :key="page.current_page">
        <!-- 데이터 없을 경우 -->
        <AppFallback v-if="page.total < 1" message="등록된 이야기가 없습니다." />

        <!-- 각 데이터 반복 -->
        <template v-else v-for="story in page.data" :key="story.id">
          <ListTile
            :title="story.title"
            :nickname="story.nickname"
            :comments="story.comments_count"
            :to="`story/${story.id}`"
            :mine="me.data?.id == story.user_id"
          />
          <ListDivider />
        </template>
      </template>

      <!-- 다음 페이지 불러오기 -->
      <InView v-if="storyList.hasNextPage" @in-view="storyList.fetchNextPage()">
        <LoadingFallback />
      </InView>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

import AppButton from "@/components/common/AppButton.vue";
import AppFallback from "@/components/common/AppFallback.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import ErrorFallback from "@/components/common/ErrorFallback.vue";
import InView from "@/components/common/InView.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import ListTile from "@/components/common/ListTile.vue";
import LoadingFallback from "@/components/common/LoadingFallback.vue";
import { useStoryList } from "@/composables/story/useStoryList";
import { useMe } from "@/composables/user/useMe";

export default defineComponent({
  name: "RedevDetailStoryList",
  components: {
    AppScaffold,
    ListTile,
    ListDivider,
    AppButton,
    ErrorFallback,
    LoadingFallback,
    AppFallback,
    InView,
  },
  setup() {
    const route = useRoute();

    const me = useMe();

    const redev_id = computed(() => parseInt(route.params.redev_id as string, 10));

    const storyList = useStoryList(computed(() => ({ redev_id: redev_id.value })));

    return {
      storyList,
      me,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.button {
  margin-bottom: (50/2/16) * 1rem;
}

.plus-icon {
  display: block;
  width: (20/2/16) * 1rem;
  margin-right: (20/2/16) * 1rem;
}
</style>
