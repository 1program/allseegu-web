<template>
  <div class="section">
    <InfoTable
      palette="primary"
      :items="[
        { label: '사업구분', value: condition.condition1 },
        { label: '시행방식', value: condition.condition2 },
        { label: '운영구분', value: condition.condition3 },
        { label: '진행단계', value: condition.condition4 },
      ]"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import InfoTable from "@/components/common/InfoTable.vue";
import { RedevCondition } from "@/models/redev";

export default defineComponent({
  name: "RedevDetailConditionSection",
  components: { InfoTable },
  props: {
    condition: {
      type: Object as PropType<RedevCondition>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
