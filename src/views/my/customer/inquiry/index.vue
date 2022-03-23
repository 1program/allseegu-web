<template>
  <AppScaffold title="1:1문의">
    <div class="container">
      <div class="page-content-medium">
        <div class="page-title">무엇을 도와드릴까요?</div>
        <div class="page-subtitle">
          자주 묻는 질문을 통하여 빠른 처리가 가능합니다.<br />
          1:1문의는 문의량이 많아 답변까지 하루 이상의 시간이 소요될 수 있습니다.
        </div>
        <div class="gap-horizontal button-group">
          <app-button full to="/my/customer/faq">자주 묻는 질문</app-button>
          <app-button full palette="outlined-blue" to="/my/customer/inquiry/write">
            문의하기
          </app-button>
        </div>
      </div>
      <div class="divider thick" />
      <div class="page-content-medium">
        <ListTile title="함께 만드는 성공" to="/my/customer/inquiry/1">
          <template v-slot:tile-status><InquiryStatusLabel :is-answered="true" /></template>
        </ListTile>
        <ListDivider />
        <ListTile title="함께 만드는 성공" to="/my/customer/inquiry/2">
          <template v-slot:tile-status><InquiryStatusLabel :is-answered="false" /></template>
        </ListTile>
        <ListDivider />
        <ListTile title="함께 만드는 성공" to="/my/customer/inquiry/1">
          <template v-slot:tile-status><InquiryStatusLabel :is-answered="true" /></template>
        </ListTile>
        <ListDivider />
        <ListTile title="함께 만드는 성공" to="/my/customer/inquiry/1">
          <template v-slot:tile-status><InquiryStatusLabel :is-answered="true" /></template>
        </ListTile>
        <ListDivider />
      </div>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import AppButton from "@/components/common/AppButton.vue";
import ListTile from "@/components/common/ListTile.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import InquiryStatusLabel from "@/components/inquiry/InquiryStatusLabel.vue";

export default defineComponent({
  name: "MyCustomerInquiryList",
  components: { AppScaffold, AppButton, ListTile, ListDivider, InquiryStatusLabel },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.page-subtitle {
  color: $color-gray;
}

.button-group {
  display: flex;
  align-items: stretch;

  margin-top: (60/2/16) * 1rem;
}
</style>
