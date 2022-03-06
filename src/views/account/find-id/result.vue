<template>
  <div class="container page-content">
    <div class="page-header">
      <div class="page-title">고객님의 아이디를<br />확인해주세요</div>
    </div>
    <info-box label="아이디">lsh@view3.net</info-box>
  </div>
  <div class="container page-footer gap-vertical">
    <app-button full to="/account/login">로그인</app-button>
    <app-button full to="/account/find-password" palette="outlined-blue">비밀번호 찾기</app-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "@/components/common/AppButton.vue";
import { useRouter } from "vue-router";
import InfoBox from "@/components/common/InfoBox.vue";

export default defineComponent({
  components: { AppButton, InfoBox },
  name: "AccountFindIdResult",
  setup() {
    const router = useRouter();

    return {
      ok: () => router.push("/account"),
    };
  },
});
</script>
