<template>
  <form class="page-wrapper" @submit.prevent="submit">
    <div class="container page-content">
      <div class="page-header">
        <div class="page-title">휴대폰 인증</div>
        <div class="page-subtitle text-gray">비밀번호를 찾을 아이디의 정보를 입력해 주세요.</div>
      </div>
    </div>
    <div class="container page-footer gap-vertical">
      <app-button full to="result">휴대폰 인증</app-button>
      <app-button full to="no-result">휴대폰 인증 (결과없음)</app-button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "@/components/common/AppButton.vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { emailSchema } from "@/utils/schema";

export default defineComponent({
  components: { AppButton },
  name: "AccountFindPasswordCert",
  setup() {
    const router = useRouter();

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        email: emailSchema,
      }),
    });

    const submit = handleSubmit(() => router.push("result"));

    return {
      submit,
    };
  },
});
</script>
