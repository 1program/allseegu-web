<template>
  <AppScaffold title="1:1문의" has-top-button>
    <ErrorFallback v-if="detail.error" :error="detail.error" />
    <LoadingFallback v-else-if="detail.data == null" />
    <div v-else class="container main">
      <!-- TODO: detail.data.status 필요 -->
      <PostView
        :badge="detail.data.status"
        :badge-color="qnaStatusColor[detail.data.status]"
        :title="detail.data.title"
        :created_at="new Date(detail.data?.created_at)"
        :files="detail.data.files"
        :link="detail.data.link"
        :content_type="detail.data.content_type"
        :content="detail.data.content"
        show-attachments-title
        :info="[{ label: '유형', value: qna_type?.title ?? '-' }]"
      />
      <CommentList :parent_uuid="detail.data.uuid" model="qna" :comments="detail.data.comments" />
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import CommentList from "@/components/comment/CommentList.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import ErrorFallback from "@/components/common/ErrorFallback.vue";
import LoadingFallback from "@/components/common/LoadingFallback.vue";
import PostView from "@/components/post/PostView.vue";
import { useRouteParam } from "@/composables/common/useRouteParam";
import { useQnaDetail } from "@/composables/qna/useQnaDetail";
import { useQnaTypes } from "@/composables/qna/useQnaTypes";
import { qnaStatusColor } from "@/models/qna";

export default defineComponent({
  name: "MyCustomerInquiryDetail",
  components: {
    AppScaffold,
    CommentList,
    ErrorFallback,
    LoadingFallback,
    PostView,
  },
  setup() {
    const qna_id = useRouteParam("qna_id", parseInt);

    const options = computed(() => ({
      // TODO: Non-null assertion 개선
      // eslint-disable-next-line
      qna_id: qna_id.value!,
    }));

    const detail = useQnaDetail(options);

    const types = useQnaTypes();

    const qna_type = computed(() =>
      types.data?.find((item) => item.id === detail.data?.qna_type_id)
    );

    return {
      detail,
      qna_type,
      qnaStatusColor,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}
</style>
