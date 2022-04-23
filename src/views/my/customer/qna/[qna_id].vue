<template>
  <AppScaffold title="1:1문의" has-top-button>
    <div class="container">
      <div class="meta">
        <PostMeta
          title="문의 내용입니다. 문의 내용입니다. 문의 내용입니다. 문의 내용입니다."
          :date="date"
          :hits="256"
        >
          <Badge
            class="badge"
            :label="isAnswered ? '답변완료' : '미답변'"
            :palette="isAnswered ? 'primary' : undefined"
          />
        </PostMeta>
      </div>
      <div class="divider light" />
      <div class="page-content-medium">
        <div class="label-info-group">
          <div class="label">유형</div>
          <div class="info">일반유형</div>
        </div>
        <div class="label-info-group">
          <div class="label">첨부파일</div>
        </div>
        <ImageGallery :images="[]" />
        <div class="attachment-group">
          <AttachmentTile
            class="attachment"
            url="http://view3.synology.me:5050/d/s/672812605452106783/bzE8Aohz0mThrDs-cYk8IV1JdsyHGgzM-vb5gT7NPVgk_"
          >
            첨부 파일.hwp
          </AttachmentTile>
          <AttachmentTile
            class="attachment"
            url="http://view3.synology.me:5050/d/s/672812605452106783/bzE8Aohz0mThrDs-cYk8IV1JdsyHGgzM-vb5gT7NPVgk_"
          >
            첨부 파일.hwp
          </AttachmentTile>
        </div>
        <div class="content">
          문의 내용입니다. 문의 내용입니다. 문의 내용입니다. 문의 내용입니다. 문의 내용입니다. 문의
          내용입니다. 문의 내용입니다. 문의 내용입니다. 문의 내용입니다. 문의 내용입니다. 문의
          내용입니다.
        </div>
      </div>
      <CommentList :count="1" :parent_uuid="'test'" model="story" :comments="[]" />
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

import CommentList from "@/components/comment/CommentList.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import AttachmentTile from "@/components/common/AttachmentTile.vue";
import Badge from "@/components/common/Badge.vue";
import ImageGallery from "@/components/common/ImageGallery.vue";
import PostMeta from "@/components/post/PostMeta.vue";
import { useConfirm } from "@/composables/common/useConfirm";
import redevImage from "@/images/mocks/redev-image.png";

export default defineComponent({
  name: "MyCustomerInquiryDetail",
  components: {
    AppScaffold,
    PostMeta,
    AttachmentTile,
    ImageGallery,
    Badge,
    CommentList,
  },
  setup() {
    const route = useRoute();
    const confirm = useConfirm();

    const isAnswered = parseInt(route.params.qna_id as string, 10) === 1;

    const removeComment = async (id: number) => {
      if (await confirm("정말 삭제하시겠습니까?", { okLabel: "삭제" })) {
        console.log(id);
      }
    };

    return {
      isAnswered,
      images: [redevImage, redevImage, redevImage],
      date: new Date(),
      twoImages: [redevImage, redevImage],
      threeImages: [redevImage, redevImage, redevImage],
      removeComment,
    };
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

.field {
  margin-bottom: (20/2/16) * 1rem;
  display: flex;
  align-items: center;
}

.attachment-group {
  margin-top: (20/2/16) * 1rem;
}

.attachment {
  margin-bottom: (8/2/16) * 1rem;
}

.content {
  margin-top: (51/2/16) * 1rem;
  font-size: (30/2/16) * 1rem;
}

.label-info-group {
  display: flex;
  align-items: center;

  font-size: (26/2/16) * 1rem;

  margin-bottom: (24/2/16) * 1rem;
}

.label {
  color: $color-gray;
}

.info {
  margin-left: (30/2/16) * 1rem;

  flex: 1 1 auto;
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
