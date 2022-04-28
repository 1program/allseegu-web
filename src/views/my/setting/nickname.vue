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
import { nicknameSchema } from "@/lib/schema";

export default defineComponent({
  components: { AppButton, FormGroup, Field, FormInput, AppScaffold },
  name: "AccountSignupNickname",
  setup() {
    const router = useRouter();

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        nickname: nicknameSchema,
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
              nickname: values.nickname,
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
