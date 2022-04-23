<template>
  <AppDrawer title="보고싶은 카페 선택">
    <OptionTile :active="type === null" @click="select(null)">전체 선택</OptionTile>
    <OptionTile :active="type === CommunityCafeType.NAVER" @click="select(CommunityCafeType.NAVER)">
      네이버 카페
    </OptionTile>
    <OptionTile :active="type === CommunityCafeType.DAUM" @click="select(CommunityCafeType.DAUM)">
      다음 카페
    </OptionTile>
  </AppDrawer>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import AppDrawer from "@/components/common/AppDrawer.vue";
import OptionTile from "@/components/common/OptionTile.vue";
import { CommunityCafeType } from "@/models/community";

export default defineComponent({
  name: "CommunityCafeSelectDrawer",
  components: { AppDrawer, OptionTile },
  props: {
    type: {
      type: String as PropType<CommunityCafeType | null>,
      default: null,
    },
  },
  setup(props, context) {
    return {
      CommunityCafeType,
      select(type: CommunityCafeType | null) {
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
