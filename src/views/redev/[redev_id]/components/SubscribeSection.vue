<template>
  <div class="section">
    <div class="section-title">전문가 의견</div>
    <div class="section-content">
      <AppFallback v-if="subscribes.length < 1" message="등록된 전문가 의견이 없습니다." />
      <template v-for="(subscribe, index) in subscribes" :key="subscribe.id">
        <ListDivider v-if="index !== 0" />
        <!-- TODO: badge prop 단순화 -->
        <ListTile
          :badge="subscribe.is_notice === 1 ? '공지' : undefined"
          :title="subscribe.title"
          :to="`/redev/${redev_id}/subscribe/${subscribe.id}`"
        />
      </template>
    </div>
    <div class="section-footer">
      <SubscribeBanner />
    </div>
  </div>
  <MoreButton v-if="subscribes.length > 0" :to="`/redev/${redev_id}/subscribe`">
    전문가 의견 더보기
  </MoreButton>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import AppFallback from "@/components/common/AppFallback.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import ListTile from "@/components/common/ListTile.vue";
import MoreButton from "@/components/common/MoreButton.vue";
import SubscribeBanner from "@/components/subscribe/SubscribeBanner.vue";
import { Subscribe } from "@/models/subscribe";

export default defineComponent({
  name: "RedevDetailSubscribeSection",
  components: { ListTile, ListDivider, SubscribeBanner, MoreButton, AppFallback },
  props: {
    redev_id: {
      type: Number,
      required: true,
    },
    subscribes: {
      type: Object as PropType<Subscribe[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
