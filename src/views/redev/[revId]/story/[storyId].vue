<template>
  <AppScaffold title="우리 구역 이야기" has-top-button>
    <ErrorFallback v-if="detail.error" :error="detail.error" />
    <LoadingFallback v-else-if="detail.data == null" />
    <div v-else class="container main">
      <div class="meta">
        <PostMeta
          :title="detail.data.title"
          :date="new Date(detail.data.created_at)"
          :hits="detail.data.hits"
        />
      </div>
      <div class="divider" />
      <div class="page-content">
        <div class="gallery" v-if="detail.data.files.images.length > 0">
          <ImageGallery :images="detail.data.files.images" />
        </div>
        <div class="content">
          <!-- TODO: Implement content parser by content_type -->
          {{ detail.data.content }}
        </div>
      </div>
      <div class="comments">
        <div class="comments-top">
          <div class="comments-count">댓글 {{ detail.data.comments_count ?? 0 }}</div>
          <CommentForm class="comments-top-form" :parent_uuid="detail.data.uuid" model="story" />
        </div>
        <!-- TODO: 배열 SORT 성능 개선 -->
        <template v-for="comment in [...detail.data.comments].reverse()" :key="comment.id">
          <div class="divider light" />
          <CommentItem class="comments-item" :comment="comment" />
        </template>
      </div>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import PostMeta from "@/components/common/PostMeta.vue";
import ImageGallery from "@/components/common/ImageGallery.vue";

import redevImage from "@/images/mocks/redev-image.png";
import CommentForm from "@/components/comment/CommentForm.vue";
import { tempComment1, tempComment2 } from "@/models/comment";
import CommentItem from "@/components/comment/CommentItem.vue";
import { useRoute } from "vue-router";
import { useStoryDetail } from "@/composables/story/useStoryDetail";
import LoadingFallback from "@/components/common/LoadingFallback.vue";
import ErrorFallback from "@/components/common/ErrorFallback.vue";

export default defineComponent({
  name: "RedevDetailStoryDetail",
  components: {
    AppScaffold,
    PostMeta,
    ImageGallery,
    CommentForm,
    CommentItem,
    LoadingFallback,
    ErrorFallback,
  },
  setup() {
    const route = useRoute();

    const comments = ref([tempComment1, tempComment2]);

    const options = computed(() => ({
      redev_id: parseInt(route.params.revId as string, 10),
      story_id: parseInt(route.params.storyId as string, 10),
    }));

    const detail = useStoryDetail(options);

    return {
      date: new Date(),
      comments,
      redevImage,
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

.gallery {
  margin-bottom: (51/2/16) * 1rem;
}

.page-content {
  // TODO: 공통 클래스 flex 1 되는 것 수정
  flex: 0 0 auto;
}

.main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.content {
  font-size: (30/2/16) * 1rem;
}

.comments {
  flex: 1 1 auto;
  background-color: #f3f3f3;
}

.comments-top {
  padding: $padding;
  padding-bottom: $padding-x;
}

.comments-top-form {
  background-color: white;
}

.comments-count {
  font-size: (26/2/16) * 1rem;
  margin-bottom: (30/2/16) * 1rem;
}

.comments-item {
  padding: $padding-x;
}
</style>
