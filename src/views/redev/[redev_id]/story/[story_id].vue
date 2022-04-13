<template>
  <AppScaffold title="우리 구역 이야기" has-top-button>
    <ErrorFallback v-if="detail.error" :error="detail.error" />
    <LoadingFallback v-else-if="detail.data == null" />
    <div v-else class="container main">
      <!-- TODO: new Date() 개선 -->
      <PostView
        :is_notice="false"
        :title="detail.data.title"
        :created_at="new Date(detail.data.created_at)"
        :hits="detail.data.hits"
        :files="detail.data.files"
        :link="detail.data.link"
        :content_type="detail.data.content_type"
        :content="detail.data.content"
      />
      <CommentList :parent_uuid="detail.data.uuid" model="story" :comments="detail.data.comments" />
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

import { useStoryDetail } from "@/composables/story/useStoryDetail";

import AppScaffold from "@/components/common/AppScaffold.vue";

import LoadingFallback from "@/components/common/LoadingFallback.vue";
import ErrorFallback from "@/components/common/ErrorFallback.vue";
import PostView from "@/components/post/PostView.vue";
import CommentList from "@/components/comment/CommentList.vue";

export default defineComponent({
  name: "RedevDetailStoryDetail",
  components: {
    AppScaffold,
    LoadingFallback,
    ErrorFallback,
    PostView,
    CommentList,
  },
  setup() {
    const route = useRoute();

    const options = computed(() => ({
      redev_id: parseInt(route.params.redev_id as string, 10),
      story_id: parseInt(route.params.story_id as string, 10),
    }));

    const detail = useStoryDetail(options);

    return {
      detail,
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
