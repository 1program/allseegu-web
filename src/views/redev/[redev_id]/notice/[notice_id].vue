<template>
  <AppScaffold title="공지사항" has-top-button>
    <ErrorFallback v-if="detail.error" :error="detail.error" />
    <LoadingFallback v-else-if="detail.data == null" />
    <div v-else class="container">
      <PostView
        :is_notice="detail.data.is_notice === 1"
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
import LoadingFallback from "@/components/common/LoadingFallback.vue";
import PostView from "@/components/post/PostView.vue";
import { useNoticeDetail } from "@/composables/notice/useNoticeDetail";

export default defineComponent({
  name: "RedevDetailNoticeDetail",
  components: {
    AppScaffold,
    PostView,
    ErrorFallback,
    LoadingFallback,
  },
  setup() {
    const route = useRoute();

    const options = computed(() => ({
      redev_id: parseInt(route.params.redev_id as string, 10),
      notice_id: parseInt(route.params.notice_id as string, 10),
    }));

    const detail = useNoticeDetail(options);

    return {
      detail,
    };
  },
});
</script>
