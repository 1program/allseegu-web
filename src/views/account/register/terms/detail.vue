<template>
  <app-drawer title="부동산 서비스 이용약관" @close="close">
    <div class="container page-main main">
      <h2>제 1조(목적)</h2>
      <p>
        주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다. 주식과
        부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
      </p>
      <h2>제 2조(목적)</h2>
      <p>주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.</p>
      <p>
        1. 주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다. 주식과
        부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
      </p>
      <h2>제 3조(목적)</h2>
      <p>주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.</p>
      <p>
        1. 주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다. 주식과
        부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
      </p>
      <h2>제 4조(목적)</h2>
      <p>주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.</p>
      <p>
        1. 주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다. 주식과
        부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
      </p>
      <h2>제 5조(목적)</h2>
      <p>주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.</p>
      <p>
        1. 주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다. 주식과
        부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
      </p>
      <h2>제 6조(목적)</h2>
      <p>주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.</p>
      <p>
        1. 주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다. 주식과
        부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
      </p>
    </div>
  </app-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import AppDrawer from "@/components/common/AppDrawer.vue";

export default defineComponent({
  name: "AccountRegisterTermsDetail",
  components: { AppDrawer },
  setup() {
    const router = useRouter();

    return {
      close: router.back,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.main {
  h2 {
    font-size: (30 / 2 / 16) * 1rem;
    font-weight: normal;
    margin: 0;
    margin-bottom: (20/2/16) * 1rem;
  }

  p {
    font-size: (26 / 2/ 16) * 1rem;
    color: $color-gray;
    margin: 0;
    margin-bottom: (44 / 2 / 16) * 1rem;
  }
}
</style>
