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
            <OptionButton :active="communityType === 'KAKAO'" @click="communityType = 'KAKAO'">
              <template v-slot:icon>
                <img src="@/images/icons/community-kakao-openchat.svg" alt="카카오 오픈챗" />
              </template>
              카톡 오픈채팅
            </OptionButton>
            <OptionButton :active="communityType === 'DAUM'" @click="communityType = 'DAUM'">
              <template v-slot:icon>
                <img src="@/images/icons/community-daum-cafe.svg" alt="다음 카페" />
              </template>
              다음 카페
            </OptionButton>
            <OptionButton
              :active="communityType === 'NAVER_CAFE'"
              @click="communityType = 'NAVER_CAFE'"
            >
              <template v-slot:icon>
                <img src="@/images/icons/community-naver-cafe.svg" alt="네이버 카페" />
              </template>
              네이버 카페
            </OptionButton>
            <OptionButton
              :active="communityType === 'NAVER_BLOG'"
              @click="communityType = 'NAVER_BLOG'"
            >
              <template v-slot:icon>
                <img src="@/images/icons/community-naver-blog.svg" alt="네이버 블로그" />
              </template>
              네이버 블로그
            </OptionButton>
          </OptionButtonGroup>
          <field name="url" v-slot="{ field, errorMessage }">
            <form-group :error-text="errorMessage">
              <form-input v-bind="field" placeholder="URL을 기재해 주세요." />
            </form-group>
          </field>
          <field name="password" v-slot="{ field, errorMessage }">
            <form-group :error-text="errorMessage">
              <form-input v-bind="field" placeholder="입장 비밀번호를 기재해 주세요." />
            </form-group>
          </field>
        </form-group>
        <field name="area" v-slot="{ field, errorMessage }">
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
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import AppScaffold from "@/components/common/AppScaffold.vue";
import * as yup from "yup";
import { Field, useForm } from "vee-validate";
import FormGroup from "@/components/common/FormGroup.vue";
import FormInput from "@/components/common/FormInput.vue";
import AppButton from "@/components/common/AppButton.vue";
import { useAlert } from "@/composables/common/useAlert";
import OptionButtonGroup from "@/components/common/OptionButtonGroup.vue";
import OptionButton from "@/components/common/OptionButton.vue";
import FormTextarea from "@/components/common/FormTextarea.vue";

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
    const alert = useAlert();

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        title: yup.string().required("제목을 입력해 주세요."),
        url: yup.string().required("URL을 기재해 주세요."),
        password: yup.string(),
        area: yup.string().required("구역을 입력해 주세요."),
        content: yup.string().required("내용을 입력해 주세요."),
      }),
    });

    const communityType = ref("KAKAO");

    const submit = handleSubmit(() => {
      router.back();
      alert("신청되었습니다.");
    });

    return {
      communityType,
      submit,
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
