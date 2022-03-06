<template>
  <div class="container page-content content">
    <div class="page-header">
      <div class="page-title">회원가입 완료</div>
      <div class="page-subtitle">
        돈 불려주는 똑똑한 AI서비스<br />부동산은 올씨구에서 시작하세요
      </div>
    </div>
  </div>
  <div class="container page-footer gap-vertical">
    <app-button full to="/">올씨구 시작하기</app-button>
  </div>
</template>

<script lang="ts">
import AppButton from "@/components/common/AppButton.vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { AppButton },
  name: "AccountSignupDone",
  setup() {
    const router = useRouter();

    const next = () => router.push("/");

    return {
      next,
    };
  },
});
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.page-header {
  text-align: center;
}

.page-subtitle {
  color: #777777;
}
</style>
