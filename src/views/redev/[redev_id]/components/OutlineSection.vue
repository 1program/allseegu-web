<template>
  <div class="section">
    <div class="section-title">사업개요</div>
    <div class="section-content">
      <InfoTable :items="items" />
    </div>
    <br />
    <div class="section-content description">
      {{ outline.outline_desc }}
    </div>
    <!-- TODO: 관심구역 설정하기 -->
    <div class="section-footer">
      <AppBalloon
        :message="favor == null ? '관심 구역을 설정해 새로운 소식을 확인하세요!' : undefined"
      >
        <AppButton :loading="toggling" full palette="gray-blue" @click="toggle">
          <img class="star-icon" :src="starIcon" alt="관심구역 아이콘" />
          관심 구역 설정하기
        </AppButton>
      </AppBalloon>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

import AppBalloon from "@/components/common/AppBalloon.vue";
import AppButton from "@/components/common/AppButton.vue";
import InfoTable from "@/components/common/InfoTable.vue";
import { useFavorToggle } from "@/composables/favor/useFavorToggle";
import starFilled from "@/images/icons/star-blue-filled.svg";
import starOutlined from "@/images/icons/star-blue-outlined.svg";
import { RedevOutline } from "@/models/redev";

export default defineComponent({
  name: "RedevDetailOutlineSection",
  components: { InfoTable, AppBalloon, AppButton },
  props: {
    redev_id: {
      type: Number,
      required: true,
    },
    outline: {
      type: Object as PropType<RedevOutline>,
      required: true,
    },
  },
  setup(props) {
    const items = computed(() =>
      props.outline.outline_table.map((row) => ({ label: row.name, value: row.val }))
    );

    const { favor, toggle, toggling } = useFavorToggle(computed(() => props.redev_id));

    const starIcon = computed(() => (favor.value == null ? starOutlined : starFilled));

    // const toggle = () => {
    //   checked.value = !checked.value;
    // };

    return {
      starIcon,
      items,
      favor,
      toggle,
      toggling,
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

.description {
  white-space: pre-wrap;
}
</style>
