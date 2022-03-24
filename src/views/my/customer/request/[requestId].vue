<template>
  <AppScaffold title="올려주세요">
    <div class="container">
      <div class="meta">
        <PostMeta
          title="올려주세요 타이틀 제목입니다.올려주세요 타이틀 제목입니다.올려주세요 타이틀 제목입니다."
          :date="date"
        >
          <Badge
            class="badge"
            :label="isWaiting ? '미승인' : isAccepted ? '승인' : '반려'"
            :blue="isAccepted"
            :red="isDenied"
          />
        </PostMeta>
      </div>
      <div class="divider light" />
      <div class="page-content-medium">
        <div class="field-group">
          <div class="field">
            <div class="label">소통방 URL</div>
            <div class="info">카톡 오픈채팅 <br />http://view3.net</div>
          </div>
          <div class="field">
            <div class="label">비밀번호</div>
            <div class="info">123456789</div>
          </div>
          <div class="field">
            <div class="label">구역</div>
            <div class="info">
              구역 문구입니다. 구역 문구입니다. 구역 문구입니다. 구역 문구입니다. 구역 문구입니다.
            </div>
          </div>
        </div>
        소개 문구입니다. 소개 문구입니다. 소개 문구입니다. 소개 문구입니다. 소개 문구입니다. 소개
        문구입니다.
      </div>
      <AnswerCard
        class="page-content"
        v-if="isAccepted || isDenied"
        :label="isAccepted ? '승인' : '반려사유'"
        :date="date"
        :answer="
          isAccepted
            ? undefined
            : '반려 사유 문구입니다. 반려 사유 문구입니다. 반려 사유 문구입니다. 반려 사유 문구입니다. 반려 사유 문구입니다. 반려 사유 문구입니다. 반려 사유 문구입니다.'
        "
      />
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostMeta from "@/components/common/PostMeta.vue";
import { useRoute } from "vue-router";
import AppScaffold from "@/components/common/AppScaffold.vue";
import Badge from "@/components/common/Badge.vue";
import AnswerCard from "@/components/common/AnswerCard.vue";

export default defineComponent({
  name: "MyCustomerRequestDetail",
  components: { PostMeta, AppScaffold, Badge, AnswerCard },
  setup() {
    const route = useRoute();

    const isWaiting = parseInt(route.params.requestId as string, 10) === 1;
    const isAccepted = parseInt(route.params.requestId as string, 10) === 2;
    const isDenied = parseInt(route.params.requestId as string, 10) === 3;

    return { isWaiting, isAccepted, isDenied, date: new Date() };
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
</style>
