<template>
  <AppScaffold title="올씨구 공지사항" has-top-button>
    <ErrorFallback v-if="detail.error" :error="detail.error" />
    <LoadingFallback v-else-if="detail.data == null" />
    <div v-else class="container">
      <PostView
        :is_notice="true"
        :title="detail.data.title"
        :created_at="new Date(detail.data.created_at)"
        :hits="detail.data.hits"
        :files="detail.data.files"
        :link="detail.data.link"
        :content_type="detail.data.content_type"
        :content="detail.data.content"
      />
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

import AppScaffold from "@/components/common/AppScaffold.vue";
import ErrorFallback from "@/components/common/ErrorFallback.vue";
import PostView from "@/components/post/PostView.vue";
import { useMyNoticeDetail } from "@/composables/notice/useMyNoticeDetail";

export default defineComponent({
  name: "MyCustomerNoticeDetail",
  components: { AppScaffold, PostView, ErrorFallback },
  setup() {
    const route = useRoute();

    const options = computed(() => ({
      notice_id: parseInt(route.params.notice_id as string, 10),
    }));

    const detail = useMyNoticeDetail(options);

    return {
      detail,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.meta {
  padding: $padding;
  padding-bottom: (30/2/16) * 1rem;
}

.badge {
  margin-bottom: (20/2/16) * 1rem;
}
.attachment {
  margin-bottom: (8/2/16) * 1rem;
}

.link {
  margin-top: (40/2/16) * 1rem;
}

.gallery {
  margin-top: (40/2/16) * 1rem;
}

.content {
  margin-top: (51/2/16) * 1rem;
  font-size: (30/2/16) * 1rem;
}
</style>
