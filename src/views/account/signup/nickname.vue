<template>
  <form class="page-wrapper" @submit.prevent="submit">
    <div class="container page-content">
      <div class="page-header">
        <div class="page-title">사용하실<br />닉네임을 알려주세요</div>
        <div class="page-subtitle">별명이나 애칭 닉네임도 좋아요</div>
      </div>
      <field name="nickname" v-slot="{ field, errorMessage }" v-model="signupValues.nickname">
        <form-group :error-text="errorMessage">
          <form-input v-bind="field" placeholder="홍길동" />
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
import { nicknameSchema } from "@/utils/schema";
import * as yup from "yup";
import { useSignupValues } from "./index.vue";

export default defineComponent({
  components: { AppButton, FormGroup, Field, FormInput },
  name: "AccountSignupNickname",
  setup() {
    const router = useRouter();

    const signupValues = useSignupValues();

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        nickname: nicknameSchema,
      }),
    });

    const submit = handleSubmit(() => {
      router.push("done");
    });

    return {
      submit,
      signupValues,
    };
  },
});
</script>
