<template>
  <div class="container page-content-large">
    <div class="page-header">
      <div class="page-title">올씨구 계정<br />서비스약관에 동의해 주세요</div>
    </div>
    <form-check label="만 14세 이상입니다 (필수)" v-model:checked="values.over14" />
    <form-check label="서비스 기본 약관 (필수)" v-model:checked="values.service">
      <next-link to="terms/service">부동산 서비스 이용약관</next-link>
      <next-link to="terms/privacy">부동산 서비스 개인정보수집 이용동의</next-link>
      <next-link to="terms/location">부동산 서비스 위치기반서비스 이용동의</next-link>
    </form-check>
    <form-check label="마케팅 정보 수신 동의 (선택)" v-model:checked="values.marketing">
      <div class="text-small">
        주식과 부동산에관련된 유용한 정보와 이벤트 등을<br />알림과 이메일 등으로 알려드립니다.
      </div>
    </form-check>
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
import FormCheck from "@/components/common/FormCheck.vue";
import NextLink from "@/components/common/NextLink.vue";
import { useAlert } from "@/composables/common/useAlert";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useSignup } from "@/composables/common/useSignup";

export default defineComponent({
  components: { FormCheck, NextLink, AppButton },
  name: "AccountSignupTerms",
  setup() {
    const alert = useAlert();

    const router = useRouter();

    const { values } = useSignup();

    const checkAll = () => {
      values.over14 = true;
      values.service = true;
      values.marketing = true;
    };

    const checkedRequired = computed(() => values.over14 && values.service);

    const submit = () => {
      if (!checkedRequired.value) {
        alert("필수 약관에 동의해 주세요.");
      } else {
        router.push("email");
      }
    };

    return {
      checkAll,
      submit,
      values,
    };
  },
});
</script>
