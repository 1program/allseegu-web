<template>
  <div class="section">
    <div class="section-title">공지사항</div>
    <div class="section-content">
      <ListTile badge="공지" title="신림동 대위원회 회의 결과 발표" to="1/notice/1" />
      <ListDivider />
      <ListTile title="새해 복 많이 받으세요!" to="1/notice/1" />
      <ListDivider />
      <ListTile title="한결같은 마음으로 결실을 위해 최선을 다하는..." to="1/notice/1" />
    </div>
  </div>
  <MoreButton to="1/notice">공지사항 더보기</MoreButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListTile from "@/components/common/ListTile.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import MoreButton from "@/components/common/MoreButton.vue";

export default defineComponent({
  name: "NoticeSection",
  components: { ListTile, ListDivider, MoreButton },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
