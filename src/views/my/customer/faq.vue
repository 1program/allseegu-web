<template>
  <AppScaffold title="FAQ" has-top-button>
    <div class="container">
      <div class="faq-header">
        <InputGroup place-holder="찾으시는 내용을 검색해 보세요" />
        <TabBar
          class="tab-bar"
          :current-tab="typeId"
          @change-tab="typeId = $event"
          :tabs="[
            { id: 1, title: '이용법' },
            { id: 2, title: '부동산' },
            { id: 3, title: '구독' },
            { id: 4, title: '정보' },
            { id: 5, title: '광고/제휴' },
            { id: 6, title: '기타' },
          ]"
        />
      </div>
      <div class="divider light" />
      <QnaTile class="qna-tile" />
      <div class="divider light" />
      <QnaTile class="qna-tile" />
      <div class="divider light" />
      <QnaTile class="qna-tile" />
      <div class="divider light" />
      <QnaTile class="qna-tile" />
      <div class="divider light" />
      <QnaTile class="qna-tile" />
      <div class="divider light" />
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import TabBar from "@/components/common/TabBar.vue";
import InputGroup from "@/components/common/InputGroup.vue";
import QnaTile from "@/components/common/QnaTile.vue";

export default defineComponent({
  name: "MyCustomerFaq",
  components: { AppScaffold, TabBar, InputGroup, QnaTile },
  setup() {
    const typeId = ref(1);

    return { typeId };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.faq-header {
  padding: (60/2/16) * 1rem (12/2/16) * 1rem;
}

.tab-bar {
  margin-top: (60/2/16) * 1rem;
}

.qna-tile {
  padding: (40/2/16) * 1rem;
}
</style>
