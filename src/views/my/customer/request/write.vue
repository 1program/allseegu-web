<template>
  <app-scaffold title="올려주세요">
    <form class="page-wrapper" @submit.prevent="submit">
      <div class="container page-content-medium">
        <field name="title" v-slot="{ field, errorMessage }">
          <form-group label="제목" :error-text="errorMessage" class="group-margin">
            <form-input v-bind="field" />
          </form-group>
        </field>
        <form-group label="소통방 URL" class="group-margin">
          <OptionButtonGroup class="option-button-group">
            <OptionButton
              v-for="type in RequestType"
              :key="type"
              :active="request_type === type"
              @click="request_type = type"
            >
              <template v-slot:icon>
                <img :src="requestTypeIcons[type]" :alt="type" />
              </template>
              {{ type }}
            </OptionButton>
          </OptionButtonGroup>
          <field name="link" v-slot="{ field, errorMessage }">
            <form-group :error-text="errorMessage">
              <form-input v-bind="field" placeholder="URL을 기재해 주세요." autocapitalize="none" />
            </form-group>
          </field>
          <field name="password" v-slot="{ field, errorMessage }">
            <form-group :error-text="errorMessage">
              <form-input
                v-bind="field"
                placeholder="입장 비밀번호를 기재해 주세요."
                autocapitalize="none"
              />
            </form-group>
          </field>
        </form-group>
        <field name="redev_name" v-slot="{ field, errorMessage }">
          <form-group label="구역" :error-text="errorMessage" class="group-margin">
            <form-input v-bind="field" />
          </form-group>
        </field>
        <field name="content" v-slot="{ field, errorMessage }">
          <form-group label="소개 문구" info="0/50" :error-text="errorMessage" class="group-margin">
            <FormTextarea
              small
              v-bind="field"
              maxLength="50"
              placeholder="소개 문구를 기재해 주세요."
            />
          </form-group>
        </field>
        <app-button full>신청</app-button>
      </div>
    </form>
  </app-scaffold>
</template>

<script lang="ts">
import { Field, useForm } from "vee-validate";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";

import AppButton from "@/components/common/AppButton.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import FormGroup from "@/components/common/FormGroup.vue";
import FormInput from "@/components/common/FormInput.vue";
import FormTextarea from "@/components/common/FormTextarea.vue";
import OptionButton from "@/components/common/OptionButton.vue";
import OptionButtonGroup from "@/components/common/OptionButtonGroup.vue";
import { useRequestCreate } from "@/composables/request/useRequestCreate";
import iconDaumCafe from "@/images/icons/community-daum-cafe.svg";
import iconKakao from "@/images/icons/community-kakao-openchat.svg";
import iconNaverBand from "@/images/icons/community-naver-band.svg";
import iconNaverBlog from "@/images/icons/community-naver-blog.svg";
import iconNaverCafe from "@/images/icons/community-naver-cafe.svg";
import { RequestType } from "@/models/request";

const requestTypeIcons = {
  [RequestType.KAKAO]: iconKakao,
  [RequestType.DAUM_CAFE]: iconDaumCafe,
  [RequestType.NAVER_CAFE]: iconNaverCafe,
  [RequestType.NAVER_BLOG]: iconNaverBlog,
  [RequestType.NAVER_BAND]: iconNaverBand,
};

export default defineComponent({
  name: "MyCustomerRequestWrite",
  components: {
    AppScaffold,
    Field,
    FormGroup,
    FormInput,
    AppButton,
    OptionButtonGroup,
    OptionButton,
    FormTextarea,
  },
  setup() {
    const router = useRouter();

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        title: yup.string().default("").required("제목을 입력해 주세요."),
        link: yup.string().default("").required("URL을 기재해 주세요."),
        password: yup.string().default(null),
        redev_name: yup.string().default("").required("구역을 입력해 주세요."),
        content: yup.string().default("").required("내용을 입력해 주세요."),
      }),
    });

    const create = useRequestCreate();

    const request_type = ref(RequestType.KAKAO);

    const submit = handleSubmit((values) => {
      create.mutate(
        {
          input: {
            ...values,
            type: request_type.value,
            rejection_message: "",
          },
        },
        {
          onSuccess: router.back,
        }
      );
    });

    return {
      request_type,
      submit,
      RequestType,
      requestTypeIcons,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.option-button-group {
  margin: (30/2/16) * 1rem 0;
}

.group-margin {
  margin-bottom: (90/2/16) * 1rem;
}
</style>
