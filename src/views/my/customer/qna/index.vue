<template>
  <AppScaffold title="1:1문의" has-top-button>
    <div class="container">
      <div class="page-content-medium">
        <div class="page-title">무엇을 도와드릴까요?</div>
        <div class="page-subtitle">
          자주 묻는 질문을 통하여 빠른 처리가 가능합니다.<br />
          1:1문의는 문의량이 많아 답변까지 하루 이상의 시간이 소요될 수 있습니다.
        </div>
        <div class="gap-horizontal button-group">
          <app-button full to="/my/customer/faq">자주 묻는 질문</app-button>
          <app-button full palette="outlined-blue" to="/my/customer/qna/write">
            문의하기
          </app-button>
        </div>
      </div>
      <div class="divider thick" />

      <ErrorFallback v-if="qnaList.error != null" :error="qnaList.error" />
      <LoadingFallback v-else-if="qnaList.data == null" />
      <div v-else class="page-content-medium">
        <!-- 페이지별 반복 -->
        <template v-for="page in qnaList.data.pages" :key="page.current_page">
          <!-- 페이지 데이터 없을 경우 -->
          <AppFallback v-if="page.total < 1" message="등록된 문의사항이 없습니다." />

          <!-- 각 데이터 반복 -->
          <template v-else v-for="qna in page.data" :key="qna.id">
            <ListTile
              :title="qna.title"
              :date="new Date(qna.created_at)"
              :to="`/my/customer/qna/${qna.id}`"
            >
              <template v-slot:status-label>
                <StatusLabel :label="qna.status" :palette="qnaStatusColor[qna.status]" />
              </template>
            </ListTile>
            <ListDivider />
          </template>
        </template>

        <!-- 다음 페이지 불러오기 -->
        <InView v-if="qnaList.hasNextPage" @in-view="qnaList.fetchNextPage()">
          <LoadingFallback />
        </InView>
      </div>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import AppButton from "@/components/common/AppButton.vue";
import AppFallback from "@/components/common/AppFallback.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import ErrorFallback from "@/components/common/ErrorFallback.vue";
import InView from "@/components/common/InView.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import ListTile from "@/components/common/ListTile.vue";
import LoadingFallback from "@/components/common/LoadingFallback.vue";
import StatusLabel from "@/components/common/StatusLabel.vue";
import { useQnaList } from "@/composables/qna/useQnaList";
import { qnaStatusColor } from "@/models/qna";

export default defineComponent({
  name: "MyCustomerInquiryList",
  components: {
    AppScaffold,
    AppButton,
    ListTile,
    ListDivider,
    StatusLabel,
    ErrorFallback,
    LoadingFallback,
    AppFallback,
    InView,
  },
  setup() {
    const qnaList = useQnaList(computed(() => ({})));

    return {
      qnaList,
      qnaStatusColor,
    };
  },
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
