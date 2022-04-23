<template>
  <AppScaffold title="올씨구 접근 권한 안내" :has-back-button="false">
    <div class="container page-wrapper">
      <div class="page-content-medium">
        <div class="tile-group">
          <div class="header">필수적 접근 권한</div>
          <div class="tile">
            <div class="icon-wrap">
              <img src="@/images/icons/permissions-storage.svg" alt="저장공간" />
            </div>
            <div class="tile-main">
              <div class="label">저장공간</div>
              <div class="info">사용자 식별정보 등 앱 사용관련 정보</div>
            </div>
          </div>
        </div>
        <div class="divider light margin-large" />
        <div class="tile-group">
          <div class="header">선택적 접근 권한</div>
          <div class="tile">
            <div class="icon-wrap">
              <img src="@/images/icons/gps.svg" alt="GPS" />
            </div>
            <div class="tile-main">
              <div class="label">위치정보</div>
              <div class="info">사용자 위치 확인</div>
            </div>
          </div>
          <div class="tile">
            <div class="icon-wrap">
              <img src="@/images/icons/permissions-camera.svg" alt="카메라" />
            </div>
            <div class="tile-main">
              <div class="label">사진/카메라/파일</div>
              <div class="info">촬영, 앨범사진, 기타 파일 확인</div>
            </div>
          </div>
          <div class="info">
            선택적 접근 권한은 반드시 동의하지 않으시더라도 서비스 이용이 가능합니다.
          </div>
        </div>
        <div class="divider light margin-large" />
        <div class="tile-group">
          <div class="header">접근 권한 변경 방법</div>
          <div class="info">
            휴대폰 설정
            <img class="next-step" src="@/images/icons/arrow-right-blue.svg" alt="다음" />
            앱 또는 어플리케이션 관리
            <img class="next-step" src="@/images/icons/arrow-right-blue.svg" alt="다음" />
            올씨구
            <img class="next-step" src="@/images/icons/arrow-right-blue.svg" alt="다음" />
            권한에서 각 권한별 변경 가능합니다.
          </div>
        </div>
      </div>
    </div>
    <div class="container page-footer">
      <AppButton full to="/account">확인</AppButton>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppButton from "@/components/common/AppButton.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";

export default defineComponent({
  name: "AppPermissions",
  components: { AppScaffold, AppButton },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.tile-group {
  display: flex;
  flex-direction: column;

  .header {
    font-size: (34/2/16) * 1rem;
    color: $color-blue;
    margin-bottom: (44/2/16) * 1rem;
  }
}

.tile {
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: (44/2/16) * 1rem;
  }
}

.tile-main {
  display: flex;
  flex-direction: column;
}

.icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;

  width: (100/2/16) * 1rem;
  height: (100/2/16) * 1rem;
  border-radius: (50/2/16) * 1rem;

  background-color: $color-lightest;

  margin-right: (30/2/16) * 1rem;

  > img {
    width: (40/2/16) * 1rem;
  }
}

.label {
  font-size: (34/2/16) * 1rem;
}

.info {
  font-size: (30/2/16) * 1rem;
  color: $color-gray;

  display: inline-flex;
  flex-wrap: wrap;
}

.next-step {
  width: (10/2/16) * 1rem;
  margin: 0 (20/2/16) * 1rem;
  margin-top: 1px;
}
</style>
