<template>
  <app-scaffold title="로그인">
    <div class="container page-content content">
      <form-group label="이메일" placeholder="abc@allseegu.com" />
      <form-group
        type="password"
        label="비밀번호"
        :error-text="'등록되지 않은 이메일이거나\n비밀번호가 일치하지 않습니다.'"
      />
    </div>
    <div class="container page-content footer">
      <div class="quick-links">
        <router-link class="link" to="/account/find-id">아이디 찾기</router-link>
        <span class="text-divider" />
        <router-link class="link" to="/account/find-password">비밀번호 찾기</router-link>
        <span class="text-divider" />
        <router-link class="link" to="/account/signup">회원가입</router-link>
      </div>
      <div class="auto-login">
        자동 로그인
        <app-toggle class="auto-login-toggle" v-model:checked="autoLogin" />
      </div>
      <app-button full>로그인</app-button>
    </div>
  </app-scaffold>
</template>

<script lang="ts">
import AppButton from "@/components/common/AppButton.vue";
import AppToggle from "@/components/common/AppToggle.vue";
import FormGroup from "@/components/common/FormGroup.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AccountLoginPage",
  components: { AppScaffold, AppButton, FormGroup, AppToggle },
  setup() {
    const autoLogin = ref(false);

    return {
      autoLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.content {
  flex: 1 1 auto;
}

.footer {
  flex: 0 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.quick-links {
  margin-bottom: 1rem;
  font-size: 0.8125rem;
}

.auto-login {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 0.8125rem;
}

.auto-login-toggle {
  margin-left: 0.625rem;
}
</style>
