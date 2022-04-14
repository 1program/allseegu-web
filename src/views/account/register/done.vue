<template>
  <div class="container page-content-large content">
    <div class="page-header">
      <img class="logo" src="@/images/icons/bi-extand.svg" alt="올씨구 로고" />
      <div class="page-title">회원가입 완료</div>
      <div class="page-subtitle">
        돈 불려주는 똑똑한 AI서비스<br />부동산은 올씨구에서 시작하세요
      </div>
    </div>
  </div>
  <div class="container page-footer gap-vertical">
    <app-button full to="/redev">올씨구 시작하기</app-button>
  </div>
</template>

<script lang="ts">
import AppButton from "@/components/common/AppButton.vue";
import { defineComponent } from "vue";
import { useUserRegisterValues } from "@/composables/user/useUserRegisterValues";

export default defineComponent({
  components: { AppButton },
  name: "AccountRegisterDone",
  setup() {
    const { values } = useUserRegisterValues();

    console.log({ values });

    return {};
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.page-header {
  text-align: center;
  margin-bottom: 0;
}

.page-subtitle {
  color: $color-gray;
}

.logo {
  width: (200/2/16) * 1rem;
  margin-bottom: (62/2/16) * 1rem;
}
</style>
