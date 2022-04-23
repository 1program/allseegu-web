<template>
  <app-scaffold title="로그인">
    <form class="page-wrapper" @submit.prevent="submit">
      <div class="container page-content-large content">
        <field name="email" v-slot="{ field, errorMessage }">
          <form-group label="이메일" :error-text="errorMessage">
            <form-input v-bind="field" placeholder="abc@allseegu.com" autocapitalize="none" />
          </form-group>
        </field>
        <field name="password" v-slot="{ field, errorMessage }">
          <form-group type="password" label="비밀번호" :error-text="errorMessage">
            <form-input type="password" v-bind="field" autocapitalize="none" />
          </form-group>
        </field>
      </div>
      <div class="container page-footer footer">
        <form-error-message v-if="errorMessage" :message="errorMessage" />
        <div class="quick-links">
          <router-link class="link" to="/account/find-id">아이디 찾기</router-link>
          <span class="text-divider" />
          <router-link class="link" to="/account/find-password">비밀번호 찾기</router-link>
          <span class="text-divider" />
          <router-link class="link" to="/account/register">회원가입</router-link>
        </div>
        <div class="auto-login">
          자동 로그인
          <app-toggle class="auto-login-toggle" v-model:checked="autoLogin" />
        </div>
        <app-button full :loading="login.isLoading">로그인</app-button>
      </div>
    </form>
  </app-scaffold>
</template>

<script lang="ts">
import { Field, useForm } from "vee-validate";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";

import AppButton from "@/components/common/AppButton.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import AppToggle from "@/components/common/AppToggle.vue";
import FormErrorMessage from "@/components/common/FormErrorMessage.vue";
import FormGroup from "@/components/common/FormGroup.vue";
import FormInput from "@/components/common/FormInput.vue";
import { useLogin } from "@/composables/auth/useLogin";
import { useToast } from "@/composables/common/useToast";
import { TEST_ACCOUNT } from "@/lib/config";
import { getErrorMessage } from "@/lib/functions";
import { emailSchema, passwordSchema } from "@/lib/schema";

export default defineComponent({
  name: "AccountLoginPage",
  components: { AppScaffold, AppButton, FormGroup, AppToggle, FormInput, Field, FormErrorMessage },
  setup() {
    const router = useRouter();
    const toast = useToast();
    const autoLogin = ref(false);

    const errorMessage = ref<string | null>(null);

    const { handleSubmit } = useForm({
      initialValues: process.env.NODE_ENV === "development" ? TEST_ACCOUNT : undefined,
      validationSchema: yup.object({
        email: emailSchema,
        password: passwordSchema,
      }),
    });

    const login = useLogin();

    const submit = handleSubmit(async (data) => {
      errorMessage.value = null;

      login.mutate(
        {
          autoLogin: autoLogin.value,
          data,
        },
        {
          onSuccess: (result) => {
            toast(result.message);
            router.push("/redev");
          },
          onError: (error) => {
            errorMessage.value = getErrorMessage(error);
          },
        }
      );
    });

    return {
      autoLogin,
      errorMessage,
      submit,
      login,
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
  font-size: (26/2/16) * 1rem;
}

.auto-login {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: (26/2/16) * 1rem;
}

.auto-login-toggle {
  margin-left: (20/2/16) * 1rem;
}
</style>
