<template>
  <AppScaffold title="올려주세요">
    <ErrorFallback v-if="detail.error" :error="detail.error" />
    <LoadingFallback v-else-if="detail.data == null" />
    <div v-else class="page-wrapper container">
      <PostView
        :badge="detail.data.status"
        :badge-color="requestStatusColor[detail.data.status]"
        :title="detail.data.title"
        :created_at="new Date(detail.data.created_at)"
        :files="detail.data.files"
        :link="null"
        :content_type="detail.data.content_type"
        :content="detail.data.content"
        :info="info"
      />
      <AnswerCard
        class="page-content answer"
        v-if="detail.data.status != '미승인'"
        :label="detail.data.status"
        :date="new Date(detail.data.updated_at)"
        :answer="detail.data.rejection_message"
      />
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

import AnswerCard from "@/components/common/AnswerCard.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import ErrorFallback from "@/components/common/ErrorFallback.vue";
import LoadingFallback from "@/components/common/LoadingFallback.vue";
import PostView from "@/components/post/PostView.vue";
import { useRouteParam } from "@/composables/common/useRouteParam";
import { useRequestDetail } from "@/composables/request/useRequestDetail";
import { requestStatusColor } from "@/models/request";

export default defineComponent({
  name: "MyCustomerRequestDetail",
  components: { AppScaffold, AnswerCard, ErrorFallback, LoadingFallback, PostView },
  setup() {
    const route = useRoute();

    const isWaiting = parseInt(route.params.request_id as string, 10) === 1;
    const isAccepted = parseInt(route.params.request_id as string, 10) === 2;
    const isDenied = parseInt(route.params.request_id as string, 10) === 3;

    const request_id = useRouteParam("request_id", parseInt);

    const options = computed(() => ({
      // TODO: Non-null assertion 개선
      // eslint-disable-next-line
      request_id: request_id.value!,
    }));

    const detail = useRequestDetail(options);

    const info = computed(() => {
      const list = [];

      if (detail.data != null) {
        if (detail.data.link != null) list.push({ label: "소통방 URL", value: detail.data.link });
        if (detail.data.password != null)
          list.push({ label: "비밀번호", value: detail.data.password });
        list.push({ label: "구역", value: detail.data.redev_name });
      }

      return list;
    });

    return { isWaiting, isAccepted, isDenied, date: new Date(), detail, requestStatusColor, info };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.meta {
  padding: (60/2/16) * 1rem (40/2/16) * 1rem;
  padding-bottom: (40/2/16) * 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.badge {
  margin-bottom: (20/2/16) * 1rem;
}

.field-group {
  margin-bottom: (60/2/16) * 1rem;
}

.field {
  display: flex;
  align-items: flex-start;

  font-size: (26/2/16) * 1rem;

  &:not(:last-child) {
    margin-bottom: (16/2/16) * 1rem;
  }
}

.label {
  color: #777777;
  width: (150/2/16) * 1rem;

  flex-shrink: 0;
}

.info {
  flex: 1 1 auto;
}

.content {
  flex: 0 0 auto;
}

.answer {
  flex: 1 1 auto;
}
</style>
