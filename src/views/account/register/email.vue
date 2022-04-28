<template>
  <form class="page-wrapper" @submit.prevent="submit">
    <div class="container page-content-large">
      <div class="page-header">
        <div class="page-subtitle">홍길동님 안녕하세요</div>
        <div class="page-title">이메일을<br />입력해주세요</div>
      </div>
      <field name="email" v-slot="{ field, errorMessage }" v-model="values.email">
        <form-group label="이메일" :error-text="errorMessage">
          <form-input v-bind="field" placeholder="example@example.com" autocapitalize="none" />
        </form-group>
      </field>
      <field name="confirmEmail" v-slot="{ field, errorMessage }" v-model="values.confirmEmail">
        <form-group label="이메일 확인" :error-text="errorMessage">
          <form-input v-bind="field" placeholder="example@example.com" autocapitalize="none" />
        </form-group>
      </field>
    </div>
    <div class="container page-footer gap-vertical">
      <app-button full>확인</app-button>
    </div>
  </form>
</template>

<script lang="ts">
import { Field, useForm } from "vee-validate";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";

import AppButton from "@/components/common/AppButton.vue";
import FormGroup from "@/components/common/FormGroup.vue";
import FormInput from "@/components/common/FormInput.vue";
import { useApi } from "@/composables/common/useApi";
import { useUserRegisterValues } from "@/composables/user/useUserRegisterValues";
import { confirmEmailSchema, emailSchema } from "@/lib/schema";

export default defineComponent({
  components: { AppButton, FormGroup, Field, FormInput },
  name: "AccountRegisterEmail",
  setup() {
    const api = useApi();

    const router = useRouter();

    const { values } = useUserRegisterValues();

    const { handleSubmit, setFieldError } = useForm({
      /// 뒤로가기 눌러서 뒤로 왔을 경우
      validateOnMount: router.options?.history.state.forward != null,
      validationSchema: yup.object({
        email: emailSchema,
        confirmEmail: confirmEmailSchema("email"),
      }),
    });

    const submit = handleSubmit(async (newValues) => {
      /*
      Async validation을 yup schema에 포함할 경우, 다른 인풋 값을 변경해도 지속적으로 값이 바뀌는 현상이 생깁니다.
      submit시에 중복체크하도록 구현하였습니다.
      */
      try {
        await api.user.duplicate({
          field: "email",
          value: newValues.email,
        });
        // TODO: Error type 개선
        // eslint-disable-next-line
      } catch (ex: any) {
        setFieldError("email", ex.message);
        return;
      }

      router.push("password");
    });

    return {
      values,
      submit,
    };
  },
});
</script>
