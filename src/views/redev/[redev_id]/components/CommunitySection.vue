<template>
  <div class="section">
    <div class="section-title">
      <!-- TODO: undefined vs null -->
      <TabBar :current-tab="type_id ?? undefined" @change-tab="type_id = $event" :tabs="tabs" />
    </div>
    <div class="section-content">
      <AppFallback v-if="current.data.length < 1" message="등록된 커뮤니티가 없습니다." />
      <template v-else v-for="(community, index) in current.data" :key="community.id">
        <ListDivider v-if="index > 0" />
        <!-- TODO: 모델을 prop으로 사용하도록 변경 -->
        <CommunityTile
          :type="community.community_type_id"
          :cafe_type="community.cafe_type"
          :title="community.title"
          :description="community.password"
          :content="community.content"
          :href="community.link"
          target="blank"
        />
      </template>
    </div>
  </div>
  <MoreButton :to="`${redev_id}/community/${type_id}`">{{ current?.title }} 더보기</MoreButton>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import TabBar from "@/components/common/TabBar.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import CommunityTile from "@/components/community/CommunityTile.vue";
import MoreButton from "@/components/common/MoreButton.vue";
import { Community, CommunityType } from "@/models/community";
import { RedevContentChild } from "@/models/redev";
import AppFallback from "@/components/common/AppFallback.vue";

export default defineComponent({
  name: "RedevDetailCommunitySection",
  components: { TabBar, ListDivider, CommunityTile, MoreButton, AppFallback },
  props: {
    redev_id: {
      type: Number,
      required: true,
    },
    child: {
      type: Array as PropType<RedevContentChild<"community", Community[], CommunityType>[]>,
      required: true,
    },
  },
  setup(props) {
    const type_id = ref(props.child[0]?.type_id);

    // 탭 목록
    const tabs = computed(() =>
      props.child.map((child) => ({ id: child.type_id ?? 0, title: child.title }))
    );

    // 현재 선택된 커뮤니티 타입
    const current = computed(() => props.child.find((child) => child.type_id === type_id.value));

    return {
      type_id,
      tabs,
      current,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
