<template>
  <AppScaffold title="전문가 의견" has-top-button>
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
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

import AppScaffold from "@/components/common/AppScaffold.vue";
import ErrorFallback from "@/components/common/ErrorFallback.vue";
import LoadingFallback from "@/components/common/LoadingFallback.vue";
import PostView from "@/components/post/PostView.vue";
import { useSubscribeDetail } from "@/composables/subscribe/useSubscribeDetail";

export default defineComponent({
  name: "RedevDetailSubscribeDetail",
  components: {
    AppScaffold,
    ErrorFallback,
    LoadingFallback,
    PostView,
  },
  setup() {
    const route = useRoute();

    const options = computed(() => ({
      redev_id: parseInt(route.params.redev_id as string, 10),
      subscribe_id: parseInt(route.params.subscribe_id as string, 10),
    }));

    const detail = useSubscribeDetail(options);

    return {
      detail,
    };
  },
});
</script>
