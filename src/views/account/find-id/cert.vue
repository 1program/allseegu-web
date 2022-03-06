<template>
  <div class="container page-content">
    <div class="page-header">
      <div class="page-title">휴대폰 인증</div>
      <div class="page-subtitle text-gray">개인정보 보호를 위하여 본인 인증이 필요합니다.</div>
    </div>
  </div>
  <div class="container page-footer gap-vertical">
    <app-button full to="result">휴대폰 인증</app-button>
    <app-button full to="no-result">휴대폰 인증 (결과없음)</app-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "@/components/common/AppButton.vue";

export default defineComponent({
  components: { AppButton },
  name: "AccountFindIdCert",
});
</script>
