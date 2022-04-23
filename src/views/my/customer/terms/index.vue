<template>
  <AppScaffold title="약관 / 정책">
    <div class="tabs">
      <TabBar :tabs="tabs" />
    </div>
    <div class="divider light" />
    <div class="container">
      <template v-if="termId == 'usage'">
        <div class="section">
          <div class="version">버전 {{ version }}</div>
          <h1>올씨구 이용약관</h1>
          <h2>제 1조(목적)</h2>
          <p>
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
          </p>
          <h2>제 2조(목적)</h2>
          <p>
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다. 1.
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
          </p>
        </div>
        <div class="divider light" />
        <div class="section">
          <h1>아파트 자산 관리 이용약관</h1>
          <h2>제 1조(목적)</h2>
          <p>
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
          </p>
          <h2>제 2조(목적)</h2>
          <p>
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다. 1.
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
          </p>
        </div>
      </template>
      <template v-else-if="termId == 'privacy'">
        <div class="section">
          <div class="version">버전 {{ version }}</div>
          <h1>개인정보 처리방침</h1>
          <h2>제 1조(목적)</h2>
          <p>
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
          </p>
          <h2>제 2조(목적)</h2>
          <p>
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다. 1.
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
          </p>
          <h2>제 1조(목적)</h2>
          <p>
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
          </p>
          <h2>제 2조(목적)</h2>
          <p>
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다. 1.
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
          </p>
        </div>
      </template>
      <template v-else-if="termId == 'location'">
        <div class="section">
          <div class="version">버전 {{ version }}</div>
          <h1>위치기반서비스 이용약관</h1>
          <h2>제 1조(목적)</h2>
          <p>
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
          </p>
          <h2>제 2조(목적)</h2>
          <p>
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다. 1.
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
          </p>
          <h2>제 1조(목적)</h2>
          <p>
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
          </p>
          <h2>제 2조(목적)</h2>
          <p>
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다. 1.
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
            주식과 부동산에관련된 유용한 정보와 이벤트 등을 알림과 이메일 등으로 알려드립니다.
          </p>
        </div>
      </template>
    </div>
    <div class="divider light" />
    <div class="container footer">
      <p>
        공고일자 : 2022. 01. 24<br />
        시행일자 : 2022. 01. 31<br />
        단, 공고일 이후 가입한 회원은 가입 시부터 개정 약관이 적용됩니다.
      </p>
      <p v-if="version > 8">
        <router-link :to="{ query: { version: 8 } }">이전 약관 보기</router-link>
        (2021. 11. 19 ~ 2021. 12. 17)
      </p>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import AppScaffold from "@/components/common/AppScaffold.vue";
import TabBar from "@/components/common/TabBar.vue";

const tabs = [
  {
    id: "usage",
    title: "이용약관",
    to: "usage",
  },
  {
    id: "privacy",
    title: "개인정보 처리방침",
    to: "privacy",
  },
  {
    id: "location",
    title: "위치기반서비스 이용약관",
    to: "location",
  },
];

export default defineComponent({
  name: "MyCustomerTerms",
  components: { AppScaffold, TabBar },
  setup() {
    const router = useRouter();

    const route = useRoute();

    const termId = computed(() => route.params.termId as string);

    const version = computed(() => route.query.version ?? 9);

    const changeTab = (value: string) => {
      router.push(`${value}`);
    };

    watch(
      () => termId.value,
      (current) => {
        if (current === "") {
          router.replace(`terms/usage`);
        }
      },
      { immediate: true }
    );

    return {
      tabs,
      changeTab,
      termId,
      version,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.tabs {
  padding: (60/2/16) * 1rem (40/2/16) * 1rem;
  text-align: center;
}

.section {
  padding: $padding-medium;

  .version {
    margin-bottom: (20/2/16) * 1rem;
    color: #ddd;
    font-size: (30/2/16) * 1rem;
    text-align: center;
    line-height: 1.2;
  }

  h1 {
    margin: 0 auto;
    font-size: (34/2/16) * 1rem;
    text-align: center;
    font-weight: normal;
    text-align: center;
    line-height: 1.2;
  }

  h2 {
    margin-top: (40/2/16) * 1rem;
    margin-bottom: (16/2/16) * 1rem;
    font-size: (30/2/16) * 1rem;
    font-weight: normal;
    line-height: 1.2;
  }

  p {
    font-size: (26/2/16) * 1rem;
    color: #777;
    margin: 0 auto;
  }

  p + p {
    margin-top: (40/2/16) * 1rem;
  }
}

.footer {
  padding: $padding-medium;
  font-size: (26/2/16) * 1rem;

  p {
    margin: 0;
  }

  p + p {
    margin-top: (20/2/16) * 1rem;
  }

  a {
    text-decoration: underline;
    color: $color-blue;
  }
}
</style>
