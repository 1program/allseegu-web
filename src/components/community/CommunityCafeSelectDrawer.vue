<template>
  <AppDrawer title="보고싶은 카페 선택">
    <OptionTile :active="type === 'all'" @click="select('all')">전체 선택</OptionTile>
    <OptionTile :active="type === 'naver_cafe'" @click="select('naver_cafe')">
      네이버 카페
    </OptionTile>
    <OptionTile :active="type === 'daum_cafe'" @click="select('daum_cafe')"> 다음 카페 </OptionTile>
  </AppDrawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppDrawer from "@/components/common/AppDrawer.vue";
import OptionTile from "@/components/common/OptionTile.vue";

export default defineComponent({
  name: "CommunityCafeSelectDrawer",
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
