<template>
  <div class="section">
    <div class="section-title">우리 구역 이야기</div>
    <div class="section-content">
      <AppFallback v-if="stories.length < 1" message="등록된 우리 구역 이야기가 없습니다." />
      <template v-else v-for="(story, index) in stories" :key="story.id">
        <ListDivider v-if="index > 0" />
        <ListTile
          :title="story.title"
          :nickname="story.nickname"
          :comments="story.comments_count"
          :to="`/redev/${story.redev_id}/story/${story.id}`"
        />
      </template>
    </div>
  </div>
  <MoreButton v-if="stories.length > 0" :to="`/redev/${redev_id}/story`">
    우리 구역 이야기 더보기
  </MoreButton>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ListDivider from "@/components/common/ListDivider.vue";
import ListTile from "@/components/common/ListTile.vue";
import MoreButton from "@/components/common/MoreButton.vue";
import { Story } from "@/models/story";
import AppFallback from "@/components/common/AppFallback.vue";

export default defineComponent({
  name: "RedevDetailStorySection",
  components: { ListDivider, ListTile, MoreButton, AppFallback },
  props: {
    redev_id: {
      type: Number,
      required: true,
    },
    stories: {
      type: Array as PropType<Story[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
