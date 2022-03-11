<template>
  <form class="page-wrapper" @submit.prevent="submit">
    <div class="container page-content">
      <div class="page-header">
        <div class="page-subtitle">홍길동님 안녕하세요</div>
        <div class="page-title">이메일을<br />입력해주세요</div>
      </div>
      <field name="email" v-slot="{ field, errorMessage }" v-model="values.email">
        <form-group label="이메일" :error-text="errorMessage">
          <form-input v-bind="field" placeholder="example@example.com" />
        </form-group>
      </field>
      <field name="confirmEmail" v-slot="{ field, errorMessage }" v-model="values.confirmEmail">
        <form-group label="이메일 확인" :error-text="errorMessage">
          <form-input v-bind="field" placeholder="example@example.com" />
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
import { Field, useForm } from "vee-validate";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import FormInput from "@/components/common/FormInput.vue";
import * as yup from "yup";
import { confirmEmailSchema, emailSchema } from "@/utils/schema";
import { useSignup } from "@/composables/signup";

export default defineComponent({
  components: { AppButton, FormGroup, Field, FormInput },
  name: "AccountSignupEmail",
  setup() {
    const router = useRouter();

    const { values } = useSignup();

    const { handleSubmit } = useForm({
      /// 뒤로가기 눌러서 뒤로 왔을 경우
      validateOnMount: router.options?.history.state.forward != null,
      validationSchema: yup.object({
        email: emailSchema,
        confirmEmail: confirmEmailSchema("email"),
      }),
    });

    const submit = handleSubmit(() => {
      router.push("password");
    });

    return {
      values,
      submit,
    };
  },
});
</script>
