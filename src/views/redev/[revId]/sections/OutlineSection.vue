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
      <AppBalloon :message="checked ? undefined : '관심 구역을 설정해 새로운 소식을 확인하세요!'">
        <AppButton full palette="gray-blue" @click="toggle">
          <img class="star-icon" :src="starIcon" alt="관심구역 아이콘" />
          관심 구역 설정하기
        </AppButton>
      </AppBalloon>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import InfoTable from "@/components/common/InfoTable.vue";
import AppBalloon from "@/components/common/AppBalloon.vue";
import AppButton from "@/components/common/AppButton.vue";

import starFilled from "@/images/icons/star-blue-filled.svg";
import starOutlined from "@/images/icons/star-blue-outlined.svg";

export default defineComponent({
  name: "RedevDetailOutlineSection",
  components: { InfoTable, AppBalloon, AppButton },
  setup() {
    const checked = ref(false);

    const toggle = () => {
      checked.value = !checked.value;
    };

    const starIcon = computed(() => (checked.value ? starFilled : starOutlined));

    return {
      checked,
      toggle,
      starIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.star-icon {
  width: (40/2/16) * 1rem;
  margin-right: (12/2/16) * 1rem;
}
</style>
