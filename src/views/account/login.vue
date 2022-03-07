<template>
  <app-scaffold title="로그인">
    <form class="page-wrapper" @submit.prevent="submit">
      <div class="container page-content content">
        <field name="email" v-slot="{ field, errorMessage }">
          <form-group label="이메일" :error-text="errorMessage">
            <form-input v-bind="field" placeholder="abc@allseegu.com" />
          </form-group>
        </field>
        <field name="password" v-slot="{ field, errorMessage }">
          <form-group type="password" label="비밀번호" :error-text="errorMessage">
            <form-input v-bind="field" />
          </form-group>
        </field>
      </div>
      <div class="container page-footer footer">
        <form-error-message
          :message="'등록되지 않은 이메일이거나\n비밀번호가 일치하지 않습니다.'"
        />
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
    </form>
  </app-scaffold>
</template>

<script lang="ts">
import AppButton from "@/components/common/AppButton.vue";
import AppToggle from "@/components/common/AppToggle.vue";
import FormGroup from "@/components/common/FormGroup.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import { defineComponent, ref } from "vue";
import { Field, useForm } from "vee-validate";
import FormInput from "@/components/common/FormInput.vue";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { PASSWORD_REGEXP } from "@/utils/regexp";
import FormErrorMessage from "@/components/common/FormErrorMessage.vue";

export default defineComponent({
  name: "AccountLoginPage",
  components: { AppScaffold, AppButton, FormGroup, AppToggle, FormInput, Field, FormErrorMessage },
  setup() {
    const router = useRouter();
    const autoLogin = ref(false);

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        email: yup
          .string()
          .required("이메일을 입력해 주세요.")
          .email("올바르지 않은 이메일 주소입니다."),
        password: yup
          .string()
          .required("비밀번호를 입력해 주세요.")
          .matches(PASSWORD_REGEXP, "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."),
      }),
    });

    const submit = handleSubmit(() => router.push("/"));

    return {
      autoLogin,
      submit,
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
