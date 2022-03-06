<template>
  <div class="account-page">
    <div class="container page-content content">
      <app-button full palette="white" to="/account/login">이메일 로그인</app-button>
      <div class="quick-links">
        <router-link class="link" to="/account/find-id">아이디 찾기</router-link>
        <span class="text-divider" />
        <router-link class="link" to="/account/find-password">비밀번호 찾기</router-link>
        <span class="text-divider" />
        <router-link class="link" to="/account/signup">회원가입</router-link>
      </div>
      <div class="social-button-group">
        <app-button full palette="outlined-white">네이버 로그인</app-button>
        <app-button full palette="outlined-white" class="kakao-button">카카오 로그인</app-button>
      </div>
      <router-link to="/" class="explore-link">로그인하지 않고 둘러보기</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import AppButton from "@/components/common/AppButton.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AccountPage",
  components: { AppButton },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.account-page {
  flex: 1 1 auto; // 부모의 100%를 차지한다.

  background-color: $color-blue;
  color: $color-white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.quick-links {
  margin-top: 1.375rem;
  font-size: 0.8125rem;
}

.social-button-group {
  width: 100%;
  margin-top: 3.4375rem;
}

.kakao-button {
  margin-top: 0.4375rem;
}

.explore-link {
  margin-top: 1.25rem;
  font-size: 0.8125rem;
  text-decoration: underline;
}
</style>
