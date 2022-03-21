<template>
  <div class="section">
    <InfoTable
      palette="primary"
      :items="[
        { label: '사업구분', value: '재개발\n(주택비정형)' },
        { label: '시행방식', value: '조합방식' },
        { label: '운영구분', value: '추진위원회' },
        { label: '운영구분2', value: '추진위원회' },
      ]"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InfoTable from "@/components/common/InfoTable.vue";

export default defineComponent({
  name: "SummarySection",
  components: { InfoTable },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
