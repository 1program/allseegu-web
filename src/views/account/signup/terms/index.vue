<template>
  <div class="container page-content">
    <div class="page-header">
      <div class="page-title">올씨구 계정<br />서비스약관에 동의해 주세요</div>
    </div>
    <form-check-field label="만 14세 이상입니다 (필수)" v-model:checked="signupValues.over14" />
    <form-check-field label="서비스 기본 약관 (필수)" v-model:checked="signupValues.service">
      <next-link to="terms/service">부동산 서비스 이용약관</next-link>
      <next-link to="terms/privacy">부동산 서비스 개인정보수집 이용동의</next-link>
      <next-link to="terms/location">부동산 서비스 위치기반서비스 이용동의</next-link>
    </form-check-field>
    <form-check-field label="마케팅 정보 수신 동의 (선택)" v-model:checked="signupValues.marketing">
      <div class="text-small">
        주식과 부동산에관련된 유용한 정보와 이벤트 등을<br />알림과 이메일 등으로 알려드립니다.
      </div>
    </form-check-field>
  </div>
  <div class="container page-footer gap-vertical">
    <app-button full palette="outlined-blue" @click="checkAll">약관에 모두 동의</app-button>
    <app-button full @click="submit">확인</app-button>
  </div>
  <router-view v-slot="{ Component }">
    <transition>
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import AppButton from "@/components/common/AppButton.vue";
import FormCheckField from "@/components/common/FormCheckField.vue";
import NextLink from "@/components/common/NextLink.vue";
import { REQUIRED_AGREEMENTS_REQUIRED } from "@/utils/messages";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useSignupValues } from "../index.vue";

export default defineComponent({
  components: { FormCheckField, NextLink, AppButton },
  name: "AccountSignupTerms",
  setup() {
    const router = useRouter();

    const signupValues = useSignupValues();

    const checkAll = () => {
      signupValues.value.over14 = true;
      signupValues.value.service = true;
      signupValues.value.marketing = true;
    };

    const checkedRequired = computed(() => signupValues.value.over14 && signupValues.value.service);

    const submit = () => {
      if (!checkedRequired.value) {
        // TODO: toast로 변경
        // eslint-disable-next-line
        alert(REQUIRED_AGREEMENTS_REQUIRED);
      } else {
        router.push("email");
      }
    };

    return {
      checkAll,
      submit,
      signupValues,
    };
  },
});
</script>
