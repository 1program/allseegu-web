<template>
  <div class="section">
    <div class="section-title">우리 구역 이야기</div>
    <div class="section-content">
      <ListTile
        title="신림동 재개발 의원회 회의 결과를 공유합니다..."
        nickname="라이언"
        :comments="26"
        to="1/story/1"
      />
      <ListDivider />
      <ListTile
        title="결과를 이렇게 요약해 주시다니 너무 좋습니다!"
        nickname="어피치"
        :comments="26"
        to="1/story/1"
      />
      <ListDivider />
      <ListTile
        title="새로운 실거래 6.95억은 세끼고 인가요?"
        nickname="부동산왕"
        :comments="26"
        to="1/story/1"
      />
    </div>
  </div>
  <MoreButton :to="`${redev_id}/story`">우리 구역 이야기 더보기</MoreButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListDivider from "@/components/common/ListDivider.vue";
import ListTile from "@/components/common/ListTile.vue";
import MoreButton from "@/components/common/MoreButton.vue";

export default defineComponent({
  name: "StorySection",
  components: { ListDivider, ListTile, MoreButton },
  props: {
    redev_id: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
