<template>
  <AppScaffold title="1:1문의">
    <div class="container">
      <div class="meta">
        <PostMeta
          :badge="isAnswered ? '답변완료' : '미답변'"
          :badge-active="isAnswered"
          title="문의 내용입니다. 문의 내용입니다. 문의 내용입니다. 문의 내용입니다."
          :date="date"
          :hits="256"
        />
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
        <ImageGallery :images="images" />
        <div class="attachment-group">
          <AttachmentTile class="attachment">문의 관련 파일.hwp</AttachmentTile>
          <AttachmentTile class="attachment">문의 관련 파일.hwp</AttachmentTile>
        </div>
        <div class="content">
          문의 내용입니다. 문의 내용입니다. 문의 내용입니다. 문의 내용입니다. 문의 내용입니다. 문의
          내용입니다. 문의 내용입니다. 문의 내용입니다. 문의 내용입니다. 문의 내용입니다. 문의
          내용입니다.
        </div>
      </div>
      <AnswerCard
        v-if="isAnswered"
        answer="문의 내용에 대한 답변입니다. 문의 내용에 대한 답변입니다. 문의 내용에 대한 답변입니다. 문의 내용에 대한 답변입니다. 문의 내용에 대한 답변입니다. 문의 내용에 대한 답변입니다. "
      />
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import { useRoute } from "vue-router";
import PostMeta from "@/components/common/PostMeta.vue";

import redevImage from "@/images/mocks/redev-image.png";
import AttachmentTile from "@/components/common/AttachmentTile.vue";
import ImageGallery from "@/components/common/ImageGallery.vue";
import AnswerCard from "../../../../components/common/AnswerCard.vue";

export default defineComponent({
  name: "MyCustomerInquiryDetail",
  components: { AppScaffold, PostMeta, AttachmentTile, ImageGallery, AnswerCard },
  setup() {
    const route = useRoute();

    const isAnswered = parseInt(route.params.inquiryId as string, 10) === 1;

    return {
      isAnswered,
      images: [redevImage, redevImage, redevImage],
      date: new Date(),
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
</style>
