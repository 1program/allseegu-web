<template>
  <app-scaffold title="비밀번호 변경">
    <form class="page-wrapper" @submit.prevent="submit">
      <div class="container page-content-large">
        <div class="page-header">
          <div class="page-title">변경될 비밀번호를<br />입력해주세요</div>
          <div class="page-subtitle">8자 이상 문자와 숫자의 조합으로 만들어주세요</div>
        </div>

        <field name="password" v-slot="{ field, errorMessage }">
          <form-group :error-text="errorMessage">
            <form-input
              type="password"
              placeholder="비밀번호"
              v-bind="field"
              autocapitalize="none"
            />
          </form-group>
        </field>

        <field name="confirmPassword" v-slot="{ field, errorMessage }">
          <form-group :error-text="errorMessage">
            <form-input
              type="password"
              placeholder="비밀번호 확인"
              v-bind="field"
              autocapitalize="none"
            />
          </form-group>
        </field>
      </div>
      <div class="container page-footer gap-vertical">
        <app-button full>변경하기</app-button>
      </div>
    </form>
  </app-scaffold>
</template>

<script lang="ts">
import { Field, useForm } from "vee-validate";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";

import AppButton from "@/components/common/AppButton.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import FormGroup from "@/components/common/FormGroup.vue";
import FormInput from "@/components/common/FormInput.vue";
import { useMe } from "@/composables/user/useMe";
import { useUserUpdate } from "@/composables/user/useUserUpdate";
import { confirmPasswordSchema, passwordSchema } from "@/lib/schema";

export default defineComponent({
  components: { AppButton, FormGroup, Field, FormInput, AppScaffold },
  name: "MySettingPassword",
  setup() {
    const router = useRouter();

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        password: passwordSchema,
        confirmPassword: confirmPasswordSchema("password"),
      }),
    });

    const me = useMe();

    const update = useUserUpdate();

    const submit = handleSubmit((values) => {
      if (me.data != null) {
        update.mutate(
          {
            id: me.data.id,
            input: {
              password: values.password,
            },
          },
          { onSuccess: router.back }
        );
      }
    });

    return {
      submit,
    };
  },
});
</script>
