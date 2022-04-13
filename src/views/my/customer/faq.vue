<template>
  <AppScaffold title="FAQ" has-top-button>
    <div class="container">
      <div class="faq-header">
        <InputGroup place-holder="찾으시는 내용을 검색해 보세요">
          <button class="search-button">
            <img src="@/images/icons/search.svg" alt="검색" />
          </button>
        </InputGroup>
        <TabBar
          class="tab-bar"
          :current-tab="type_id"
          @change-tab="type_id = $event"
          :tabs="[
            { id: 1, title: '이용법' },
            { id: 2, title: '부동산' },
            { id: 3, title: '구독' },
            { id: 4, title: '정보' },
            { id: 5, title: '광고/제휴' },
            { id: 6, title: '기타' },
          ]"
        />
      </div>
      <div class="divider light" />
      <template v-for="faq of faqList" :key="faq.id">
        <QnaTile
          class="qna-tile"
          @click="changeIndex(faq.id)"
          :active="activeIndex === faq.id"
          :question="faq.question"
          :answer="faq.answer"
        />
        <div class="divider light" />
      </template>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import TabBar from "@/components/common/TabBar.vue";
import InputGroup from "@/components/common/InputGroup.vue";
import QnaTile from "@/components/common/QnaTile.vue";

export default defineComponent({
  name: "MyCustomerFaq",
  components: { AppScaffold, TabBar, InputGroup, QnaTile },
  setup() {
    const type_id = ref(1);

    const activeIndex = ref(1);

    const faqList = [
      {
        id: 1,
        question: "어플리케이션 업데이트 하는 방법",
        answer: "벡스넷 네비게이션 우측에 위치한 마이페이지를 클릭하시어 업데이트가 가능합니다.",
      },
      {
        id: 2,
        question: "어플리케이션 업데이트 하는 방법",
        answer: "벡스넷 네비게이션 우측에 위치한 마이페이지를 클릭하시어 업데이트가 가능합니다.",
      },
      {
        id: 3,
        question: "어플리케이션 업데이트 하는 방법",
        answer: "벡스넷 네비게이션 우측에 위치한 마이페이지를 클릭하시어 업데이트가 가능합니다.",
      },
      {
        id: 4,
        question: "어플리케이션 업데이트 하는 방법",
        answer: "벡스넷 네비게이션 우측에 위치한 마이페이지를 클릭하시어 업데이트가 가능합니다.",
      },
      {
        id: 5,
        question: "어플리케이션 업데이트 하는 방법",
        answer: "벡스넷 네비게이션 우측에 위치한 마이페이지를 클릭하시어 업데이트가 가능합니다.",
      },
      {
        id: 6,
        question: "어플리케이션 업데이트 하는 방법",
        answer: "벡스넷 네비게이션 우측에 위치한 마이페이지를 클릭하시어 업데이트가 가능합니다.",
      },
    ];

    const changeIndex = (id: number) => {
      activeIndex.value = id;
    };

    return { type_id, activeIndex, faqList, changeIndex };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.faq-header {
  padding: (60/2/16) * 1rem (12/2/16) * 1rem;
}

.tab-bar {
  margin-top: (60/2/16) * 1rem;
}

.qna-tile {
  padding: (40/2/16) * 1rem;
}

.search-button {
  display: flex;

  &:active {
    opacity: 0.5;
  }

  > img {
    width: (44/2/16) * 1rem;
    height: (44/2/16) * 1rem;
  }
}
</style>
