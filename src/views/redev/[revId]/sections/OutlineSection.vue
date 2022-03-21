<template>
  <div class="section">
    <div class="section-title">사업개요</div>
    <div class="section-content">
      <InfoTable
        :items="[
          { label: '정비구역 면적', value: '233,729㎡' },
          { label: '공공지원 여부', value: '대상' },
          { label: '조합원수', value: '1,460명' },
          { label: '조합원수2', value: '1,460명' },
        ]"
      />
    </div>
    <br />
    <div class="section-content">
      정비구역 위치 : 관악구 신림동 808-495 일대<br />
      토지 등 소유자 수 : 1,460명<br />
      무허가 건축물 소유자 : 677명<br />
      사업 유형 : 재촉<br />
      촉진위수행 여부 : 수행
    </div>
    <div class="section-footer">
      <AppBalloon message="관심 구역을 설정해 새로운 소식을 확인하세요!">
        <AppButton full palette="outlined-blue">관심 구역 설정하기</AppButton>
      </AppBalloon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InfoTable from "@/components/common/InfoTable.vue";
import AppBalloon from "@/components/common/AppBalloon.vue";
import AppButton from "@/components/common/AppButton.vue";

export default defineComponent({
  name: "RedevDetailOutlineSection",
  components: { InfoTable, AppBalloon, AppButton },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
