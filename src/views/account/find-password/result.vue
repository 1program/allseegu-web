<template>
  <form class="page-wrapper" @submit.prevent="submit">
    <div class="container page-content-large">
      <div class="page-header">
        <div class="page-title">새로운 비밀번호를<br />입력해주세요</div>
      </div>
      <info-box label="아이디">lsh@view3.net</info-box>

      <field name="password" v-slot="{ field, errorMessage }">
        <form-group :error-text="errorMessage">
          <form-input type="password" placeholder="비밀번호" v-bind="field" />
        </form-group>
      </field>

      <field name="confirmPassword" v-slot="{ field, errorMessage }">
        <form-group :error-text="errorMessage">
          <form-input type="password" placeholder="비밀번호 확인" v-bind="field" />
        </form-group>
      </field>
    </div>
    <div class="container page-footer gap-vertical">
      <app-button full>확인</app-button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "@/components/common/AppButton.vue";
import { useRouter } from "vue-router";
import InfoBox from "@/components/common/InfoBox.vue";
import * as yup from "yup";
import { useForm, Field } from "vee-validate";
import FormGroup from "@/components/common/FormGroup.vue";
import FormInput from "@/components/common/FormInput.vue";
import { confirmPasswordSchema, passwordSchema } from "@/lib/schema";

export default defineComponent({
  components: { AppButton, InfoBox, Field, FormGroup, FormInput },
  name: "AccountFindPasswordResult",
  setup() {
    const router = useRouter();

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        password: passwordSchema,
        confirmPassword: confirmPasswordSchema("password"),
      }),
    });

    const submit = handleSubmit(() => {
      router.push("nickname");
    });

    return {
      submit,
    };
  },
});
</script>
