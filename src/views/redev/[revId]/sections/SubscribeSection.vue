<template>
  <div class="section">
    <div class="section-title">전문가 의견</div>
    <div class="section-content">
      <ListTile badge="공지" title="투명 운영을 위한 합리적인 방법 도출" to="1/subscribe/1" />
      <ListDivider />
      <ListTile title="조합이 바르게 운영되지 못하고 와해되는 이유" to="1/subscribe/1" />
      <ListDivider />
      <ListTile title="빠르게 달성하는 목표" to="1/subscribe/1" />
    </div>
    <div class="section-footer">
      <SubscribeBanner />
    </div>
  </div>
  <MoreButton to="1/subscribe">전문가 의견 더보기</MoreButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListTile from "@/components/common/ListTile.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import SubscribeBanner from "@/components/subscribe/SubscribeBanner.vue";
import MoreButton from "@/components/common/MoreButton.vue";

export default defineComponent({
  name: "RedevDetailSubscribeSection",
  components: { ListTile, ListDivider, SubscribeBanner, MoreButton },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
