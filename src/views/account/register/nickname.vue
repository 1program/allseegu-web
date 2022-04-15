<template>
  <form class="page-wrapper" @submit.prevent="submit">
    <div class="container page-content-large">
      <div class="page-header">
        <div class="page-title">사용하실<br />닉네임을 알려주세요</div>
        <div class="page-subtitle">별명이나 애칭 닉네임도 좋아요</div>
      </div>
      <field name="nickname" v-slot="{ field, errorMessage }" v-model="values.nickname">
        <form-group :error-text="errorMessage">
          <form-input v-bind="field" placeholder="홍길동" />
        </form-group>
      </field>
    </div>
    <div class="container page-footer gap-vertical">
      <app-button full :loading="submitting">확인</app-button>
    </div>
  </form>
</template>

<script lang="ts">
import AppButton from "@/components/common/AppButton.vue";
import FormGroup from "@/components/common/FormGroup.vue";
import { Field, useForm } from "vee-validate";
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import FormInput from "@/components/common/FormInput.vue";
import { nicknameSchema } from "@/lib/schema";
import * as yup from "yup";
import { useUserRegisterValues } from "@/composables/user/useUserRegisterValues";
import { AnyObject } from "yup/lib/types";
import { useApi } from "@/composables/common/useApi";
import { useUserRegister } from "@/composables/user/useUserRegister";
import { useAlert } from "@/composables/common/useAlert";

export default defineComponent({
  components: { AppButton, FormGroup, Field, FormInput },
  name: "AccountRegisterNickname",
  setup() {
    const api = useApi();

    const alert = useAlert();

    const router = useRouter();

    const { values } = useUserRegisterValues();

    const { handleSubmit, setFieldError } = useForm({
      /// 뒤로가기 눌러서 뒤로 왔을 경우
      validateOnMount: router.options?.history.state.forward != null,
      validationSchema: yup.object({
        nickname: nicknameSchema,
      }),
    });

    const register = useUserRegister();

    const submit = handleSubmit(async (newValues) => {
      try {
        await api.user.duplicate({
          field: "nickname",
          value: newValues.nickname,
        });
      } catch (ex: any) {
        setFieldError("nickname", ex.message);
        return;
      }

      register.mutate(values, {
        onSuccess: () => router.push("done"),
      });
    });

    const submitting = computed(() => register.isLoading);

    return {
      submit,
      submitting,
      values,
    };
  },
});
</script>
