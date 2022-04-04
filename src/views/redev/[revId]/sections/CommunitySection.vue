<template>
  <div class="section">
    <div class="section-title">
      <TabBar
        :current-tab="typeId"
        @change-tab="typeId = $event"
        :tabs="[
          { id: 1, title: '카톡 참여' },
          { id: 2, title: '카페' },
          { id: 3, title: '블로그' },
        ]"
      />
    </div>
    <div class="section-content">
      <template v-if="typeId === 1">
        <CommunityTile
          type="kakao"
          title="부동산 법인 투자 , 경매/공매 스터디방"
          description="비밀번호 12345입니다."
          content="대한민국 대표 부린이들 소통방입니다. 고급 정보와 뉴스를 실시간으로 확인해 보세요!"
          href="https://open.kakao.com/o/g30Iu6Uc"
          target="_blank"
        />
        <ListDivider />
        <CommunityTile
          type="kakao"
          title="부동산 법인 투자 , 경매/공매 스터디방"
          description="비밀번호 12345입니다."
          content="대한민국 대표 부린이들 소통방입니다. 고급 정보와 뉴스를 실시간으로 확인해 보세요!"
          href="https://open.kakao.com/o/g30Iu6Uc"
          target="_blank"
        />
      </template>
      <template v-else-if="typeId === 2">
        <CommunityTile
          type="naver_cafe"
          title="월급쟁이부자들 (직장인 재테크 부동산 스터디 경매 파이어족)"
          content="가장 많은 회원 수를 보유한 카페로 진취적인 성향을 가진 회원분들로 가득합니다."
          href="https://cafe.naver.com/wecando7"
          target="_blank"
        />
        <ListDivider />
        <CommunityTile
          type="daum_cafe"
          title="부동산 연구소"
          content="요즘 떠오르는 핫한 카페입니다."
          href="https://cafe.daum.net/choijonson"
          target="_blank"
        />
      </template>
      <template v-else-if="typeId === 3">
        <CommunityTile
          type="naver_blog"
          title="탱크맨 - 도시계획과 재개발, 재건축, 내집마련"
          content="관악구 전문가가 운영하는 블로그"
          href="https://blog.naver.com/giantfuture"
          target="_blank"
        />
        <ListDivider />
        <CommunityTile
          type="naver_blog"
          title="탱크맨 - 도시계획과 재개발, 재건축, 내집마련"
          content="관악구 전문가가 운영하는 블로그"
          href="https://blog.naver.com/giantfuture"
          target="_blank"
        />
      </template>
    </div>
  </div>
  <MoreButton :to="`1/community/${typeId}`">{{ title }} 더보기</MoreButton>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import TabBar from "@/components/common/TabBar.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import CommunityTile from "@/components/community/CommunityTile.vue";
import MoreButton from "@/components/common/MoreButton.vue";

export default defineComponent({
  name: "CommunitySection",
  components: { TabBar, ListDivider, CommunityTile, MoreButton },
  setup() {
    const typeId = ref(1);

    const title = computed(
      () =>
        ({
          1: "카톡 참여",
          2: "카페",
          3: "블로그",
        }[typeId.value] ?? "-")
    );

    return {
      typeId,
      title,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
