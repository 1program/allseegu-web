<template>
  <AppScaffold title="우리 구역 이야기">
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
        <ImageGallery :images="threeImages" />
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
        <div class="divider light" />
        <CommentTile
          class="comments-item"
          nickname="서쪽바다"
          :date="date"
          mine
          :images="twoImages"
          content="새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요?"
          :comment-count="0"
        />
        <div class="divider light" />
        <div class="comments-item">
          <CommentForm show-cancel ok-label="수정" />
        </div>
        <div class="divider light" />
        <CommentTile
          class="comments-item"
          nickname="서쪽바다"
          :date="date"
          mine
          :images="threeImages"
          content="새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요?"
          :comment-count="2"
        >
          <SubItem>
            <CommentTile
              nickname="서쪽바다"
              :date="date"
              :images="threeImages"
              content="새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요?"
              :comment-count="2"
            />
          </SubItem>
          <div class="divider light darker margin" />
          <SubItem>
            <CommentTile
              nickname="서쪽바다"
              :date="date"
              mine
              :images="threeImages"
              content="새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요?"
              :comment-count="2"
          /></SubItem>
          <div class="divider light darker margin" />
          <SubItem><CommentForm /></SubItem>
        </CommentTile>
      </div>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import PostMeta from "@/components/common/PostMeta.vue";
import ImageGallery from "@/components/common/ImageGallery.vue";

import redevImage from "@/images/mocks/redev-image.png";
import CommentForm from "@/components/common/CommentForm.vue";
import CommentTile from "@/components/common/CommentTile.vue";
import SubItem from "../../../../components/common/SubItem.vue";

export default defineComponent({
  name: "RedevDetailStoryDetail",
  components: { AppScaffold, PostMeta, ImageGallery, CommentForm, CommentTile, SubItem },
  setup() {
    return {
      date: new Date(),
      twoImages: [redevImage, redevImage],
      threeImages: [redevImage, redevImage, redevImage],
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
