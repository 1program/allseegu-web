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

      <ErrorFallback v-if="requestList.error != null" :error="requestList.error" />
      <LoadingFallback v-else-if="requestList.data == null" />
      <div v-else class="page-content-medium">
        <!-- 페이지별 반복 -->
        <template v-for="page in requestList.data.pages" :key="page.current_page">
          <!-- 페이지별 데이터 없을 경우 -->
          <AppFallback v-if="page.total < 1" message="등록된 데이터가 없습니다." />

          <!-- 각 데이터 반복 -->
          <template v-else v-for="request in page.data" :key="request.id">
            <ListTile :title="request.title" :to="`/my/customer/request/${request.id}`">
              <template v-slot:status-label>
                <StatusLabel
                  :label="request.status"
                  :palette="requestStatusColor[request.status]"
                />
              </template>
            </ListTile>
            <ListDivider />
          </template>
        </template>
      </div>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppButton from "@/components/common/AppButton.vue";
import AppFallback from "@/components/common/AppFallback.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import ErrorFallback from "@/components/common/ErrorFallback.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import ListTile from "@/components/common/ListTile.vue";
import LoadingFallback from "@/components/common/LoadingFallback.vue";
import StatusLabel from "@/components/common/StatusLabel.vue";
import { useRequestList } from "@/composables/request/useRequestList";
import { requestStatusColor } from "@/models/request";

export default defineComponent({
  name: "MyCustomerRequestList",
  components: {
    AppScaffold,
    AppButton,
    ListTile,
    StatusLabel,
    ListDivider,
    ErrorFallback,
    LoadingFallback,
    AppFallback,
  },
  setup() {
    const requestList = useRequestList();

    return {
      requestList,
      requestStatusColor,
    };
  },
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
