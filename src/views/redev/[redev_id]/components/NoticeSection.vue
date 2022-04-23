<template>
  <div class="section">
    <div class="section-title">공지사항</div>
    <div class="section-content">
      <AppFallback v-if="notices.length < 1" message="등록된 공지사항이 없습니다." />
      <template v-else v-for="(notice, index) in notices" :key="notice.id">
        <ListDivider v-if="index > 0" />
        <ListTile
          :badge="notice.is_notice === 1 ? '공지' : undefined"
          :title="notice.title"
          :to="`/redev/${redev_id}/notice/${notice.id}`"
        />
      </template>
    </div>
  </div>
  <MoreButton v-if="notices.length > 0" :to="`/redev/${redev_id}/notice`">
    공지사항 더보기
  </MoreButton>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import AppFallback from "@/components/common/AppFallback.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import ListTile from "@/components/common/ListTile.vue";
import MoreButton from "@/components/common/MoreButton.vue";
import { Notice } from "@/models/notice";

export default defineComponent({
  name: "RedevDetailNoticeSection",
  components: { ListTile, ListDivider, MoreButton, AppFallback },
  props: {
    redev_id: {
      type: Number,
      required: true,
    },
    notices: {
      type: Array as PropType<Notice[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
