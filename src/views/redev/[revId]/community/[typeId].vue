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
              title="함께 만드는 성공"
              description="비밀번호 12345입니다."
              content="대한민국 대표 부린이들 소통방입니다. 고급 정보와 뉴스를 실시간으로 확인해주세요!"
            />
            <ListDivider />
          </template>
        </template>
        <template v-else-if="typeId == 2">
          <template v-for="index in 5" :key="index">
            <template v-if="cafeType === 'all' || cafeType === 'naver_cafe'">
              <CommunityTile
                type="naver_cafe"
                title="대표 카페 '신사모'"
                content="가장 많은 회원 수를 보유한 카페로 진취적인 성향을 가진 회원분들로 가득합니다."
              />
              <ListDivider />
            </template>
            <template v-if="cafeType === 'all' || cafeType === 'daum_cafe'">
              <CommunityTile
                type="daum_cafe"
                title="함께 만드는 성공"
                content="요즘 떠오르는 핫한 카페입니다."
              />
              <ListDivider />
            </template>
          </template>
        </template>
        <template v-else-if="typeId == 3">
          <template v-for="index in 10" :key="index">
            <CommunityTile
              type="naver_blog"
              title="부린이의 신림동 정복기"
              content="고수 중의 고수지만 겸손한 자세로 부린이를 자처하는 주인장"
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
import { useAlert } from "@/composables/alert";
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
