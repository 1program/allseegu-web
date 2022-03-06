<template>
  <form class="page-wrapper" @submit.prevent="submit">
    <div class="container page-content">
      <div class="page-header">
        <div class="page-subtitle">홍길동님 안녕하세요</div>
        <div class="page-title">이메일을<br />입력해주세요</div>
      </div>
      <field name="email" v-slot="{ field, errorMessage }">
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
import { useForm, Field } from "vee-validate";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";
import FormInput from "@/components/common/FormInput.vue";

export default defineComponent({
  components: { AppButton, FormGroup, Field, FormInput },
  name: "AccountSignupEmail",
  setup() {
    const router = useRouter();

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        email: yup
          .string()
          .required("이메일을 입력해 주세요.")
          .email("올바르지 않은 이메일 주소입니다."),
      }),
    });

    const submit = handleSubmit(() => router.push("password"));

    return {
      submit,
    };
  },
});
</script>
