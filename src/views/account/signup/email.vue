<template>
  <form class="page-wrapper" @submit.prevent="submit">
    <div class="container page-content">
      <div class="page-header">
        <div class="page-subtitle">홍길동님 안녕하세요</div>
        <div class="page-title">이메일을<br />입력해주세요</div>
      </div>
      <field name="email" v-slot="{ field, errorMessage }" v-model="signupValues.email">
        <form-group :error-text="errorMessage">
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
import { emailSchema } from "@/utils/schema";
import { useSignupValues } from "./index.vue";

export default defineComponent({
  components: { AppButton, FormGroup, Field, FormInput },
  name: "AccountSignupEmail",
  setup() {
    const router = useRouter();

    const signupValues = useSignupValues();

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        email: emailSchema,
      }),
    });

    const submit = handleSubmit(() => {
      router.push("password");
    });

    return {
      signupValues,
      submit,
    };
  },
});
</script>
