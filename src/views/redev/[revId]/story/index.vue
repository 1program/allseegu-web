<template>
  <AppScaffold title="우리 구역 이야기">
    <div class="container page-content">
      <AppButton class="button" palette="outlined-blue" full to="story/write">
        <img class="plus-icon" src="@/images/icons/plus-thick.svg" alt="등록하기" />
        이야기 등록하기
      </AppButton>
      <template v-for="index in 10" :key="index">
        <ListTile
          title="신림동 재개발 의원회 회의 결과를 공유합니다..."
          nickname="라이언"
          :comments="26"
          to="story/1"
        />
        <ListDivider />
      </template>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import ListTile from "@/components/common/ListTile.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import AppButton from "@/components/common/AppButton.vue";

export default defineComponent({
  name: "RedevDetailStoryList",
  components: { AppScaffold, ListTile, ListDivider, AppButton },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.button {
  margin-bottom: (50/2/16) * 1rem;
}

.plus-icon {
  display: block;
  width: (20/2/16) * 1rem;
  margin-right: (20/2/16) * 1rem;
}
</style>
