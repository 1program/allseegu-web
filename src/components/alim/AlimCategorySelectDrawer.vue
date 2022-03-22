<template>
  <AppDrawer title="보고싶은 알림 선택">
    <OptionTile :active="type === 'all'" @click="select('all')">전체 알림</OptionTile>
    <OptionTile :active="type === 'all_see_gu'" @click="select('all_see_gu')">올씨구</OptionTile>
    <OptionTile :active="type === 'gwang_myung'" @click="select('gwang_myung')"
      >광명 7구역 신동아 아파트 리모델링 사업</OptionTile
    >
    <OptionTile :active="type === 'silim'" @click="select('silim')"
      >신림 1구역 도시 정비 사업</OptionTile
    >
  </AppDrawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppDrawer from "@/components/common/AppDrawer.vue";
import OptionTile from "@/components/common/OptionTile.vue";

export default defineComponent({
  name: "AlimCategorySelectDrawer",
  components: { AppDrawer, OptionTile },
  props: {
    type: {
      type: String,
      default: "all",
    },
  },
  setup(props, context) {
    return {
      select(type: string | null) {
        context.emit("select-type", type);
        context.emit("close");
      },
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
