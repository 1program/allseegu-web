<template>
  <AppScaffold :title="title" has-top-button>
    <div class="container">
      <div class="filter" v-if="typeId == 2">
        <SelectButton @click="selectingCafe = true">{{ cafeTypeText }}</SelectButton>
      </div>
      <div class="page-content">
        <template v-if="typeId == 1">
          <template v-for="index in 10" :key="index">
            <CommunityTile
              type="kakao"
              title="부동산 법인 투자 , 경매/공매 스터디방"
              description="비밀번호 12345입니다."
              content="대한민국 대표 부린이들 소통방입니다. 고급 정보와 뉴스를 실시간으로 확인해주세요!"
              href="https://open.kakao.com/o/g30Iu6Uc"
              target="_blank"
            />
            <ListDivider />
          </template>
        </template>
        <template v-else-if="typeId == 2">
          <template v-for="index in 5" :key="index">
            <template v-if="cafeType === 'all' || cafeType === 'naver_cafe'">
              <CommunityTile
                type="naver_cafe"
                title="월급쟁이부자들 (직장인 재테크 부동산 스터디 경매 파이어족)"
                content="가장 많은 회원 수를 보유한 카페로 진취적인 성향을 가진 회원분들로 가득합니다."
                href="https://cafe.naver.com/wecando7"
                target="_blank"
              />
              <ListDivider />
            </template>
            <template v-if="cafeType === 'all' || cafeType === 'daum_cafe'">
              <CommunityTile
                type="daum_cafe"
                title="부동산 연구소"
                content="요즘 떠오르는 핫한 카페입니다."
                href="https://cafe.daum.net/choijonson"
                target="_blank"
              />
              <ListDivider />
            </template>
          </template>
        </template>
        <template v-else-if="typeId == 3">
          <template v-for="index in 10" :key="index">
            <CommunityTile
              type="naver_blog"
              title="탱크맨 - 도시계획과 재개발, 재건축, 내집마련"
              content="관악구 전문가가 운영하는 블로그"
              href="https://blog.naver.com/giantfuture"
              target="_blank"
            />
            <ListDivider />
          </template>
        </template>
      </div>
    </div>
  </AppScaffold>
  <transition>
    <CommunityCafeSelectDrawer
      v-if="selectingCafe"
      @close="selectingCafe = false"
      :type="cafeType"
      @select-type="cafeType = $event"
    />
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import { useRoute } from "vue-router";
import { useAlert } from "@/composables/common/useAlert";
import CommunityTile from "@/components/community/CommunityTile.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import CommunityCafeSelectDrawer from "@/components/community/CommunityCafeSelectDrawer.vue";
import SelectButton from "@/components/common/SelectButton.vue";

export default defineComponent({
  name: "RedevDetailCommunityList",
  components: { AppScaffold, CommunityTile, ListDivider, CommunityCafeSelectDrawer, SelectButton },
  setup() {
    const route = useRoute();
    const alert = useAlert();

    const typeId = parseInt(route.params.typeId as string, 10);

    if (typeId == null || typeId > 3 || typeId < 1) {
      alert("잘못된 접근입니다.");
    }

    const title = computed(
      () =>
        ({
          1: "카톡 참여",
          2: "카페",
          3: "블로그",
        }[typeId] ?? "-")
    );

    const selectingCafe = ref(false);

    const cafeType = ref("all");

    const cafeTypeText = computed(
      () =>
        ({
          all: "전체 카페",
          naver_cafe: "네이버 카페",
          daum_cafe: "다음 카페",
        }[cafeType.value])
    );

    return {
      typeId,
      title,
      selectingCafe,
      cafeType,
      cafeTypeText,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.filter {
  padding: $padding-x;
  padding-bottom: 0;
  text-align: right;
}
</style>
