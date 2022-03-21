<template>
  <app-scaffold title="올려주세요">
    <form class="page-wrapper" @submit.prevent="submit">
      <div class="container page-content-large">
        <div class="page-header">
          <div class="page-title">올씨구에<br />우리 소통방을 올려주세요</div>
          <div class="page-subtitle">
            올씨구에 아직 등록되지 않은<br />구역관련 소통방 신청해주세요
          </div>
        </div>
        <field name="title" v-slot="{ field, errorMessage }">
          <form-group label="제목" :error-text="errorMessage">
            <form-input v-bind="field" />
          </form-group>
        </field>
        <form-group label="소통방 URL">
          <OptionButtonGroup>
            <OptionButton :active="communityType === 'KAKAO'" @click="communityType = 'KAKAO'">
              <template v-slot:icon>
                <img src="@/images/icons/community-kakao-openchat.svg" alt="카카오 오픈챗" />
              </template>
              카톡 오픈채팅
            </OptionButton>
            <OptionButton :active="communityType === 'NAVER'" @click="communityType = 'NAVER'">
              <template v-slot:icon>
                <img src="@/images/icons/community-naver-cafe.svg" alt="네이버 카페" />
              </template>
              네이버 카페
            </OptionButton>
            <OptionButton :active="communityType === 'DAUM'" @click="communityType = 'DAUM'">
              <template v-slot:icon>
                <img src="@/images/icons/community-daum-cafe.svg" alt="다음 카페" />
              </template>
              다음 카페
            </OptionButton>
          </OptionButtonGroup>
          <field name="url" v-slot="{ field, errorMessage }">
            <form-group :error-text="errorMessage">
              <form-input v-bind="field" placeholder="URL을 기재해 주세요." />
            </form-group>
          </field>
          <field name="url" v-slot="{ field, errorMessage }">
            <form-group :error-text="errorMessage">
              <form-input v-bind="field" placeholder="입장 비밀번호를 기재해 주세요." />
            </form-group>
          </field>
        </form-group>
        <field name="area" v-slot="{ field, errorMessage }">
          <form-group label="구역" :error-text="errorMessage">
            <form-input v-bind="field" />
          </form-group>
        </field>
        <field name="content" v-slot="{ field, errorMessage }">
          <form-group label="내용" :error-text="errorMessage">
            <form-input v-bind="field" />
          </form-group>
        </field>
      </div>
      <div class="container page-footer">
        <app-button full>신청</app-button>
      </div>
    </form>
  </app-scaffold>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import * as yup from "yup";
import { Field, useForm } from "vee-validate";
import FormGroup from "@/components/common/FormGroup.vue";
import FormInput from "@/components/common/FormInput.vue";
import AppButton from "@/components/common/AppButton.vue";
import { useAlert } from "@/composables/alert";
import OptionButtonGroup from "@/components/common/OptionButtonGroup.vue";
import OptionButton from "@/components/common/OptionButton.vue";

export default defineComponent({
  name: "MyCustomerRegisterCommunity",
  components: {
    AppScaffold,
    Field,
    FormGroup,
    FormInput,
    AppButton,
    OptionButtonGroup,
    OptionButton,
  },
  setup() {
    const alert = useAlert();

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        title: yup.string().required("제목을 입력해 주세요."),
        area: yup.string().required("구역을 입력해 주세요."),
        content: yup.string().required("내용을 입력해 주세요."),
      }),
    });

    const communityType = ref("KAKAO");

    const submit = handleSubmit(() => alert("신청되었습니다."));

    return {
      communityType,
      submit,
    };
  },
});
</script>
