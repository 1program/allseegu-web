<template>
  <AppScaffold title="올려주세요">
    <div class="container">
      <div class="page-content-medium">
        <div class="page-title">올씨구에<br />우리 소통방을 올려주세요</div>
        <div class="page-subtitle">
          올씨구에 아직 등록되지 않은<br />
          구역관련 소통방 신청해주세요.
        </div>
        <app-button class="header-button" full to="/my/customer/request/write">신청하기</app-button>
      </div>
      <div class="divider thick" />
      <div class="page-content-medium">
        <ListTile title="함께 만드는 성공" to="/my/customer/request/1">
          <template v-slot:status-label>
            <StatusLabel label="미승인" />
          </template>
        </ListTile>
        <ListDivider />
        <ListTile title="함께 만드는 성공" to="/my/customer/request/3">
          <template v-slot:status-label>
            <StatusLabel label="반려" red />
          </template>
        </ListTile>
        <ListDivider />
        <ListTile title="함께 만드는 성공" to="/my/customer/request/3">
          <template v-slot:status-label>
            <StatusLabel label="반려" red />
          </template>
        </ListTile>
        <ListDivider />
        <ListTile title="함께 만드는 성공" to="/my/customer/request/3">
          <template v-slot:status-label>
            <StatusLabel label="반려" red />
          </template>
        </ListTile>
        <ListDivider />
        <ListTile title="함께 만드는 성공" to="/my/customer/request/3">
          <template v-slot:status-label>
            <StatusLabel label="반려" red />
          </template>
        </ListTile>
        <ListDivider />
        <ListTile title="함께 만드는 성공" to="/my/customer/request/2">
          <template v-slot:status-label>
            <StatusLabel label="승인" blue />
          </template>
        </ListTile>
        <ListDivider />
        <ListTile title="함께 만드는 성공" to="/my/customer/request/2">
          <template v-slot:status-label>
            <StatusLabel label="승인" blue />
          </template>
        </ListTile>
        <ListDivider />
        <ListTile title="함께 만드는 성공" to="/my/customer/request/1">
          <template v-slot:status-label>
            <StatusLabel label="미승인" />
          </template>
        </ListTile>
        <ListDivider />
        <ListTile title="함께 만드는 성공" to="/my/customer/request/3">
          <template v-slot:status-label>
            <StatusLabel label="반려" red />
          </template>
        </ListTile>
        <ListDivider />
        <ListTile title="함께 만드는 성공" to="/my/customer/request/2">
          <template v-slot:status-label>
            <StatusLabel label="승인" blue />
          </template>
        </ListTile>
        <ListDivider />
        <ListTile title="함께 만드는 성공" to="/my/customer/request/3">
          <template v-slot:status-label>
            <StatusLabel label="반려" red />
          </template>
        </ListTile>
        <ListDivider />
      </div>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppButton from "@/components/common/AppButton.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import ListTile from "@/components/common/ListTile.vue";
import StatusLabel from "@/components/common/StatusLabel.vue";

export default defineComponent({
  name: "MyCustomerRequestList",
  components: { AppScaffold, AppButton, ListTile, StatusLabel, ListDivider },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.header-button {
  margin-top: (60/2/16) * 1rem;
}

.page-subtitle {
  color: $color-gray;
}
</style>
