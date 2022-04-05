<template>
  <AppScaffold title="알림" has-top-button>
    <template v-slot:actions>
      <app-bar-action to="/my">
        <img src="@/images/icons/my-icon-black.svg" width="22" alt="마이" />
      </app-bar-action>
    </template>
    <div class="page-wrapper main">
      <div class="container">
        <div class="alim-header-wrap">
          <div class="alim-header">
            <div class="info">읽지 않은 알림 4개</div>
            <button class="toggle-bottom-sheet" @click="selectingCategory = true">
              {{ alimCategoryName }}
              <img class="icon" src="@/images/icons/arrow-bottom-blue.svg" alt="더 보기" />
            </button>
          </div>
        </div>
        <template v-if="alimCategory == 'all' || alimCategory == 'all_see_gu'">
          <AlimGroup category="올씨구" date="2022.03.17" class="section" all>
            <div class="gap-vertical">
              <AlimTile
                :read="false"
                label="공지사항"
                content="안녕하세요 올씨구 입니다. 올씨구 어플리케이션이 오픈되면서 새로운 프로모션 등이 진행되고 있습니다."
                to="/my/customer/notice/1"
              />
              <AlimTile
                :read="false"
                label="1:1문의"
                content="문의 답변이 등록되었습니다."
                to="/my/customer/inquiry/1"
              />
            </div>
          </AlimGroup>
          <AlimDivider />
        </template>
        <template v-if="alimCategory == 'all' || alimCategory == 'silim'">
          <AlimGroup category="신림 1구역 도시 정비 사업" date="2022.03.17" class="section">
            <div class="gap-vertical">
              <AlimTile
                :read="false"
                label="카톡 참여 소통방 등록"
                content="함께 만드는 성공.대한민국 대표 부린이들 소통방입니다.고수익 목표로 함께 달려보아요~"
                to="/redev/1/community/1"
              />
              <AlimTile
                :read="true"
                label="영상 등록"
                content="신림 1구역 도시 정비 사업 시뮬레이션"
                to="/redev/1/video"
              />
              <AlimTile
                :read="true"
                label="전문가 의견 등록"
                content="조합이 바르게 운영되지 못하고 와해되는 이유는 바로 이것입니다."
                to="/redev/1/subscribe/1"
              />
            </div>
          </AlimGroup>
          <AlimDivider />
        </template>
        <template v-if="alimCategory == 'all' || alimCategory == 'gwang_myung'">
          <AlimGroup
            category="광명 7구역 신동아 아파트 리모델링 사업"
            date="2022.03.17"
            class="section"
          >
            <div class="gap-vertical">
              <AlimTile
                :read="false"
                label="공지사항"
                content="안녕하세요 올씨구 입니다. 올씨구 어플리케이션이 오픈되면서 새로운 프로모션 등이 진행되고 있습니다."
                to="/redev/1/notice/1"
              />
            </div>
          </AlimGroup>
          <AlimDivider />
        </template>
        <template v-if="alimCategory == 'all' || alimCategory == 'gwang_myung'">
          <AlimGroup
            category="광명 7구역 신동아 아파트 리모델링 사업"
            date="2022.02.28"
            class="section"
          >
            <div class="gap-vertical">
              <AlimTile
                :read="true"
                label="언론보도 등록"
                content="신림 1구역 도시 정비 사업 새로운 이슈사항입니다."
                to="/redev/1/news/1"
              />
            </div>
          </AlimGroup>
          <AlimDivider />
        </template>
      </div>
    </div>
  </AppScaffold>
  <transition>
    <AlimCategorySelectDrawer
      v-if="selectingCategory"
      @close="selectingCategory = false"
      :type="alimCategory"
      @select-type="alimCategory = $event"
    />
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import AlimGroup from "@/components/alim/AlimGroup.vue";
import AppBarAction from "@/components/common/AppBarAction.vue";
import AlimDivider from "@/components/alim/AlimDivider.vue";
import AlimTile from "@/components/alim/AlimTile.vue";
import AlimCategorySelectDrawer from "@/components/alim/AlimCategorySelectDrawer.vue";

export default defineComponent({
  name: "AlimList",
  components: {
    AppScaffold,
    AlimGroup,
    AlimDivider,
    AlimTile,
    AppBarAction,
    AlimCategorySelectDrawer,
  },
  setup() {
    const selectingCategory = ref(false);

    const alimCategory = ref("all");

    const alimCategoryName = computed(
      () =>
        ({
          all: "전체 알림",
          all_see_gu: "올씨구",
          gwang_myung: "광명 7구역 신동아 아파트 리모델링 사업",
          silim: "신림 1구역 도시 정비 사업",
        }[alimCategory.value])
    );

    return {
      alimCategoryName,
      selectingCategory,
      alimCategory,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.main {
  background-color: #f3f3f3;
}

.alim-header {
  display: flex;
  align-items: center;
  font-size: (26/2/16) * 1rem;
}

//나중에 alim-header 를 컴포넌트 화 하면 wrap 을 지우고 class 로 적용해준다.
.alim-header-wrap {
  padding: (32/2/16) * 1rem (40/2/16) * 1rem;
  padding-bottom: (16/2/16) * 1rem;
}

.info {
  color: $color-gray;
  flex: 1 1 auto;
}

.toggle-bottom-sheet {
  display: flex;
  align-items: center;
  display: inline-flex;
  border-radius: 4px;
  padding: 0 2px;
  cursor: pointer;

  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.icon {
  margin-left: (18/2/16) * 1rem;
  width: (18/2/16) * 1rem;
  margin-top: 1px;
}
</style>
