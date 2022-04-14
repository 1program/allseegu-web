<template>
  <div class="account-page">
    <div class="container page-content-large content">
      <img class="logo" src="@/images/icons/bi-extand_white.svg" alt="올씨구 로고" />
      <app-button full palette="white" to="/account/login">
        <template v-slot:icon>
          <img src="@/images/icons/bi-simple.svg" alt="올씨구 로고" />
        </template>
        <template v-slot>이메일 로그인</template>
      </app-button>
      <div class="quick-links">
        <router-link class="link" to="/account/find-id">아이디 찾기</router-link>
        <span class="text-divider" />
        <router-link class="link" to="/account/find-password">비밀번호 찾기</router-link>
        <span class="text-divider" />
        <router-link class="link" to="/account/register">회원가입</router-link>
      </div>
      <div class="social-button-group gap-vertical">
        <app-button class="social-button" full palette="naver" @click="prepare">
          <template v-slot:icon>
            <img class="social-icon" src="@/images/icons/sns-naver.svg" alt="네이버 로고" />
          </template>
          <template v-slot>네이버 로그인</template>
        </app-button>
        <app-button class="social-button" full palette="kakao" @click="prepare">
          <template v-slot:icon>
            <img class="social-icon" src="@/images/icons/sns-kakao.svg" alt="카카오 로고" />
          </template>
          <template v-slot>카카오 로그인</template>
        </app-button>
      </div>
      <router-link to="/redev" class="explore-link">로그인하지 않고 둘러보기</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import AppButton from "@/components/common/AppButton.vue";
import { useAlert } from "@/composables/common/useAlert";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AccountPage",
  components: { AppButton },
  setup() {
    const alert = useAlert();

    // eslint-disable-next-line
    const prepare = () => alert("해당 기능은 준비중입니다.");

    return { prepare };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.account-page {
  flex: 1 1 auto; // 부모의 100%를 차지한다.

  background-color: $color-blue;
  color: $color-white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: (200/2/16) * 1rem;
  margin-bottom: (75/2/16) * 1rem;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.quick-links {
  margin-top: (38/2/16) * 1rem;
  font-size: (26/2/16) * 1rem;
}

.social-button-group {
  width: 100%;
  margin-top: (110/2/16) * 1rem;
}

.explore-link {
  margin-top: (40/2/16) * 1rem;
  font-size: (26/2/16) * 1rem;
  text-decoration: underline;
}

.social-button img {
  width: (32/2/16) * 1rem;
}
</style>
