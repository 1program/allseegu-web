<template>
  <app-scaffold title="별명 변경">
    <form class="page-wrapper" @submit.prevent="submit">
      <div class="container page-content-large">
        <div class="page-header">
          <div class="page-title">변경될 별명을<br />입력해주세요</div>
        </div>
        <field name="nickname" v-slot="{ field, errorMessage }">
          <form-group :error-text="errorMessage">
            <form-input v-bind="field" placeholder="서쪽바다" />
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
import { nicknameSchema } from "@/lib/schema";
import AppScaffold from "@/components/common/AppScaffold.vue";
import { useAlert } from "@/composables/alert";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { AppButton, FormGroup, Field, FormInput, AppScaffold },
  name: "AccountSignupNickname",
  setup() {
    const router = useRouter();
    const alert = useAlert();

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        nickname: nicknameSchema,
      }),
    });

    const submit = handleSubmit(() => {
      alert("별명이 변경되었습니다.");
      router.back();
    });

    return {
      submit,
    };
  },
});
</script>
