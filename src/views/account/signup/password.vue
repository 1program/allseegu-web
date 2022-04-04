<template>
  <form class="page-wrapper" @submit.prevent="submit">
    <div class="container page-content-large">
      <div class="page-header">
        <div class="page-title">비밀번호를<br />입력해 주세요</div>
      </div>

      <field name="password" v-slot="{ field, errorMessage }" v-model="values.password">
        <form-group :error-text="errorMessage">
          <form-input type="password" placeholder="비밀번호" v-bind="field" />
        </form-group>
      </field>

      <field
        name="confirmPassword"
        v-slot="{ field, errorMessage }"
        v-model="values.confirmPassword"
      >
        <form-group :error-text="errorMessage">
          <form-input type="password" placeholder="비밀번호 확인" v-bind="field" />
        </form-group>
      </field>
    </div>

    <div class="container page-footer gap-vertical">
      <app-button full>확인</app-button>
    </div>
  </form>
</template>

<script lang="ts">
import AppButton from "@/components/common/AppButton.vue";
import FormGroup from "@/components/common/FormGroup.vue";
import { defineComponent } from "vue";
import { Field, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import FormInput from "@/components/common/FormInput.vue";
import * as yup from "yup";
import { confirmPasswordSchema, passwordSchema } from "@/lib/schema";
import { useSignup } from "@/composables/common/useSignup";

export default defineComponent({
  components: { AppButton, FormGroup, FormInput, Field },
  name: "AccountSignupPassword",
  setup() {
    const router = useRouter();

    const { values } = useSignup();

    const { handleSubmit } = useForm({
      /// 뒤로가기 눌러서 뒤로 왔을 경우
      validateOnMount: router.options?.history.state.forward != null,
      validationSchema: yup.object({
        password: passwordSchema,
        confirmPassword: confirmPasswordSchema("password"),
      }),
    });

    const submit = handleSubmit(() => {
      router.push("nickname");
    });

    return {
      values,
      submit,
    };
  },
});
</script>
