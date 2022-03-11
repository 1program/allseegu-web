<template>
  <app-scaffold title="이메일 변경">
    <form class="page-wrapper" @submit.prevent="submit">
      <div class="container page-content">
        <div class="page-header">
          <div class="page-title">변경될 이메일을<br />입력해주세요</div>
          <div class="page-subtitle">
            ID로 사용되는 이메일은<br />
            정확한 정보 입력을 위해 다시 한 번 확인 합니다.
          </div>
        </div>
        <field name="email" v-slot="{ field, errorMessage }">
          <form-group :error-text="errorMessage">
            <form-input v-bind="field" placeholder="example@example.com" />
          </form-group>
        </field>
        <field name="confirmEmail" v-slot="{ field, errorMessage }">
          <form-group :error-text="errorMessage">
            <form-input v-bind="field" placeholder="example@example.com" />
          </form-group>
        </field>
      </div>
      <div class="container page-footer gap-vertical">
        <app-button full>변경하기</app-button>
      </div>
    </form></app-scaffold
  >
</template>

<script lang="ts">
import AppButton from "@/components/common/AppButton.vue";
import FormGroup from "@/components/common/FormGroup.vue";
import { Field, useForm } from "vee-validate";
import { defineComponent } from "vue";
import FormInput from "@/components/common/FormInput.vue";
import * as yup from "yup";
import { emailSchema, confirmEmailSchema } from "@/utils/schema";
import AppScaffold from "@/components/common/AppScaffold.vue";
import { useAlert } from "@/composables/alert";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { AppButton, FormGroup, Field, FormInput, AppScaffold },
  name: "MySettingEmail",
  setup() {
    const router = useRouter();
    const alert = useAlert();

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        email: emailSchema,
        confirmEmail: confirmEmailSchema("email"),
      }),
    });

    const submit = handleSubmit(() => {
      alert("이메일이 변경되었습니다.");
      router.back();
    });

    return {
      submit,
    };
  },
});
</script>
