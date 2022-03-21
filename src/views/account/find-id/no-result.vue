<template>
  <div class="container page-content-large">
    <div class="page-header">
      <div class="page-title">아이디가 없습니다</div>
      <div class="page-subtitle text-gray">입력하신 정보와 일치하는 아이디가 없습니다.</div>
    </div>
  </div>
  <div class="container page-footer">
    <app-button full to="/account">확인</app-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "@/components/common/AppButton.vue";

export default defineComponent({
  components: { AppButton },
  name: "AccountFindIdNoResult",
});
</script>
