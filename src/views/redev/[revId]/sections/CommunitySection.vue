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
          title="함께 만드는 성공"
          description="비밀번호 12345입니다."
          content="대한민국 대표 부린이들 소통방입니다. 고급 정보와 뉴스를 실시간으로 확인해 보세요!"
        />
        <ListDivider />
        <CommunityTile
          type="kakao"
          title="함께 만드는 성공"
          description="비밀번호 12345입니다."
          content="대한민국 대표 부린이들 소통방입니다. 고급 정보와 뉴스를 실시간으로 확인해 보세요!"
        />
      </template>
      <template v-else-if="typeId === 2">
        <CommunityTile
          type="naver_cafe"
          title="대표 카페 '신사모'"
          content="가장 많은 회원 수를 보유한 카페로 진취적인 성향을 가진 회원분들로 가득합니다."
        />
        <ListDivider />
        <CommunityTile
          type="daum_cafe"
          title="함께 만드는 성공"
          content="요즘 떠오르는 핫한 카페입니다."
        />
      </template>
      <template v-else-if="typeId === 3">
        <CommunityTile
          type="naver_blog"
          title="부린이의 신림동 정복기"
          content="고수중의 고수지만 겸손한 자세로 부린이를 자처하는 주인장"
        />
        <ListDivider />
        <CommunityTile
          type="naver_blog"
          title="신림동은 관악구의 시작일 뿐이다"
          content="관악구 전문가가 운영하는 블로그"
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
