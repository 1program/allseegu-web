<template>
  <AppScaffold title="알림" has-top-button>
    <div class="page-wrapper main">
      <div class="container">
        <AlimGroup label="신림 1구역 도시 정비 사업" date="2022.03.17" class="section">
          <div class="gap-vertical">
            <AlimTile
              :read="false"
              label="공지사항"
              content="안녕하세요 올씨구 입니다. 올씨구 어플리케이션이 오픈되면서 새로운 프로모션 등이 진행되고 있습니다."
            />
            <AlimTile :read="false" label="1:1문의" content="문의 답변이 등록되었습니다." />
          </div>
        </AlimGroup>
        <AlimDivider />
        <AlimGroup label="신림 1구역 도시 정비 사업" date="2022.03.17" class="section">
          <div class="gap-vertical">
            <AlimTile
              :read="false"
              label="카톡 참여 소통방 등록"
              content="함께 만드는 성공.대한민국 대표 부린이들 소통방입니다.고수익 목표로 함께 달려보아요~"
            />
            <AlimTile
              :read="true"
              label="영상 등록"
              content="신림 1구역 도시 정비 사업 시뮬레이션"
            />
            <AlimTile
              :read="true"
              label="전문가 의견 등록"
              content="조합이 바르게 운영되지 못하고 와해되는 이유는 바로 이것입니다."
            />
          </div>
        </AlimGroup>
        <AlimDivider />
        <AlimGroup label="광명 7구역 신동아 아파트 리모델링 사업" date="2022.03.17" class="section">
          <div class="gap-vertical">
            <AlimTile
              :read="false"
              label="공지사항"
              content="안녕하세요 올씨구 입니다. 올씨구 어플리케이션이 오픈되면서 새로운 프로모션 등이 진행되고 있습니다."
            />
          </div>
        </AlimGroup>
        <AlimDivider />
        <AlimGroup label="광명 7구역 신동아 아파트 리모델링 사업" date="2022.02.28" class="section">
          <div class="gap-vertical">
            <AlimTile
              :read="true"
              label="언론보도 등록"
              content="신림 1구역 도시 정비 사업 새로운 이슈사항입니다."
            />
          </div>
        </AlimGroup>
      </div>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import AlimGroup from "@/components/alim/AlimGroup.vue";
import AlimDivider from "@/components/alim/AlimDivider.vue";
import AlimTile from "@/components/alim/AlimTile.vue";

export default defineComponent({
  name: "AlimList",
  components: { AppScaffold, AlimGroup, AlimDivider, AlimTile },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.main {
  background-color: #f3f3f3;
}
</style>
