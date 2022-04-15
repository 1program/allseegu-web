<template>
  <AppScaffold :title="type?.title" has-top-button>
    <ErrorFallback v-if="communityList.error != null" :error="communityList.error" />
    <LoadingFallback v-else-if="communityList.data == null" />
    <div v-else class="container">
      <div class="filter" v-if="type_id == 2">
        <SelectButton @click="selectingCafe = true">{{ cafeTypeText }}</SelectButton>
      </div>
      <div class="page-content">
        <!-- 페이지 반복 -->
        <template v-for="page in communityList.data.pages" :key="page.current_page">
          <!-- 페이지 데이터가 없다면? -->
          <template v-if="page.total < 1">
            <AppFallback :message="`등록된 ${Josa.r(type?.title ?? '데이터', '가')} 없습니다.`" />
          </template>

          <!-- 각 항목 반복 -->
          <template v-else v-for="community in page.data" :key="community.id">
            <CommunityTile
              :type="community.community_type_id"
              :cafe_type="community.cafe_type"
              :title="community.title"
              :description="community.password"
              :content="community.content"
              :href="community.link"
              target="blank"
            />
            <ListDivider />
          </template>
        </template>

        <!-- 다음 페이지 불러오기 -->
        <InView v-if="communityList.hasNextPage" @in-view="communityList.fetchNextPage()">
          <LoadingFallback />
        </InView>
      </div>
    </div>
  </AppScaffold>
  <transition>
    <CommunityCafeSelectDrawer
      v-if="selectingCafe"
      @close="selectingCafe = false"
      :type="cafe_type"
      @select-type="cafe_type = $event"
    />
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Josa from "josa-js";

import AppScaffold from "@/components/common/AppScaffold.vue";
import { useRoute } from "vue-router";
import CommunityTile from "@/components/community/CommunityTile.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import CommunityCafeSelectDrawer from "@/components/community/CommunityCafeSelectDrawer.vue";
import SelectButton from "@/components/common/SelectButton.vue";
import { useCommunityTypes } from "@/composables/community/useCommunityTypes";
import LoadingFallback from "@/components/common/LoadingFallback.vue";
import ErrorFallback from "@/components/common/ErrorFallback.vue";
import { useCommunityList } from "@/composables/community/useCommunityList";
import AppFallback from "@/components/common/AppFallback.vue";
import { CommunityCafeType, communityCafeTypeNames } from "@/models/community/CommunityCafeType";
import InView from "@/components/common/InView.vue";

export default defineComponent({
  name: "RedevDetailCommunityList",
  components: {
    AppScaffold,
    CommunityTile,
    ListDivider,
    CommunityCafeSelectDrawer,
    SelectButton,
    LoadingFallback,
    ErrorFallback,
    AppFallback,
    InView,
  },
  setup() {
    const route = useRoute();

    const redev_id = computed(() => parseInt(route.params.redev_id as string, 10));

    const type_id = computed(() => parseInt(route.params.type_id as string, 10));

    const types = useCommunityTypes();

    const type = computed(() => types.data?.find((item) => item.id === type_id.value));

    const selectingCafe = ref(false);

    const cafe_type = ref<CommunityCafeType | null>(null);

    const cafeTypeText = computed(() =>
      cafe_type.value == null ? "전체 카페" : communityCafeTypeNames[cafe_type.value]
    );

    const communityList = useCommunityList(
      computed(() => ({
        redev_id: redev_id.value,
        type_id: type_id.value,
        cafe_type: cafe_type.value,
      }))
    );

    return {
      type_id,
      type,
      selectingCafe,
      cafe_type,
      cafeTypeText,
      communityList,
      Josa,
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
