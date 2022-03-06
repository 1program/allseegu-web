<template>
  <form class="page-wrapper" @submit.prevent="submit">
    <div class="container page-content">
      <div class="page-header">
        <div class="page-title">사용하실<br />닉네임을 알려주세요</div>
        <div class="page-subtitle">별명이나 애칭 닉네임도 좋아요</div>
      </div>
      <field name="nickname" v-slot="{ field, errorMessage }">
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
import { useForm, Field } from "vee-validate";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";
import FormInput from "@/components/common/FormInput.vue";

export default defineComponent({
  components: { AppButton, FormGroup, Field, FormInput },
  name: "AccountSignupNickname",
  setup() {
    const router = useRouter();

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        nickname: yup.string().required("닉네임을 입력해 주세요."),
      }),
    });

    // TODO: 사용할 수 없는 닉네임입니다.

    // handleSubmit - 유효해야 다음으로 넘어간다.
    const submit = handleSubmit(() => router.push("done"));

    return {
      submit,
    };
  },
});
</script>
