<template>
  <AppScaffold title="우리 구역 이야기" has-top-button>
    <div class="container">
      <div class="meta">
        <PostMeta
          title="조합이 바르게 운영되지 못하고 와해되는 이유는 바로 이것 때문입니다."
          :date="date"
          :hits="256"
        />
      </div>
      <div class="divider" />
      <div class="page-content">
        <ImageGallery :images="[redevImage, redevImage, redevImage]" />
        <div class="content">
          조합이 바르게 운영되지 못하고 와해되는 이유는 바로 이것 때문입니다. 조합이 바르게 운영되지
          못하고 와해되는 이유는 바로 이것 때문입니다.<br /><br />
          조합이 바르게 운영되지 못하고 와해되는 이유는 바로 이것 때문입니다.
        </div>
      </div>
      <div class="comments">
        <div class="comments-top">
          <div class="comments-count">댓글 9</div>
          <CommentForm class="comments-top-form" />
        </div>
        <template v-for="comment in comments" :key="comment.id">
          <div class="divider light" />
          <CommentItem class="comments-item" :comment="comment" />
        </template>
      </div>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import PostMeta from "@/components/common/PostMeta.vue";
import ImageGallery from "@/components/common/ImageGallery.vue";

import redevImage from "@/images/mocks/redev-image.png";
import CommentForm from "@/components/comment/CommentForm.vue";
import { tempComment1, tempComment2 } from "@/models/comment";
import CommentItem from "@/components/comment/CommentItem.vue";

export default defineComponent({
  name: "RedevDetailStoryDetail",
  components: {
    AppScaffold,
    PostMeta,
    ImageGallery,
    CommentForm,
    CommentItem,
  },
  setup() {
    const comments = ref([tempComment1, tempComment2]);

    return {
      date: new Date(),
      comments,
      redevImage,
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

.content {
  margin-top: (51/2/16) * 1rem;
  font-size: (30/2/16) * 1rem;
}

.comments {
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
