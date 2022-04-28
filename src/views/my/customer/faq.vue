<template>
  <AppScaffold title="FAQ" has-top-button>
    <div class="container">
      <div class="faq-header">
        <InputGroup as="form" place-holder="찾으시는 내용을 검색해 보세요" @submit.prevent="submit">
          <input class="input" placeholder="내용을 입력해 주세요." v-model="keyword" />
          <button class="search-button">
            <img src="@/images/icons/search.svg" alt="검색" />
          </button>
        </InputGroup>
        <TabBar
          class="tab-bar"
          :current-tab="query ? undefined : type_id"
          @change-tab="type_id = $event"
          :loading="types.isLoading"
          :tabs="types.data ?? []"
          :disabled="!!query"
        />
      </div>
      <div class="divider light" />
      <ErrorFallback v-if="currentFaqList.error != null" :error="currentFaqList.error" />
      <LoadingFallback v-else-if="currentFaqList.data == null" />
      <template v-else>
        <!-- 페이지별 반복 -->
        <template v-for="page in currentFaqList.data.pages" :key="page.current_page">
          <!-- 페이지 데이터가 없을 시 -->
          <AppFallback v-if="page.total < 1" message="데이터가 없습니다." />

          <!-- 항목별 반복 -->
          <template v-else v-for="faq in page.data" :key="faq.id">
            <QnaTile
              class="qna-tile"
              @click="selectFaq(faq.id)"
              :active="faq_id === faq.id"
              :question="faq.title"
              :answer="faq.content"
            />
            <div class="divider light" />
          </template>
        </template>

        <!-- 다음 페이지 불러오기 -->
        <InView v-if="currentFaqList.hasNextPage" @in-view="currentFaqList.fetchNextPage()">
          <LoadingFallback />
        </InView>
      </template>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, computed } from "vue";

import AppFallback from "@/components/common/AppFallback.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import ErrorFallback from "@/components/common/ErrorFallback.vue";
import InView from "@/components/common/InView.vue";
import InputGroup from "@/components/common/InputGroup.vue";
import LoadingFallback from "@/components/common/LoadingFallback.vue";
import QnaTile from "@/components/common/QnaTile.vue";
import TabBar from "@/components/common/TabBar.vue";
import { useRouteQueryValue } from "@/composables/common/useRouteQuery";
import { useFaqList } from "@/composables/faq/useFaqList";
import { useFaqSearch } from "@/composables/faq/useFaqSearch";
import { useFaqTypes } from "@/composables/faq/useFaqTypes";

export default defineComponent({
  name: "MyCustomerFaq",
  components: {
    AppScaffold,
    TabBar,
    InputGroup,
    QnaTile,
    LoadingFallback,
    ErrorFallback,
    AppFallback,
    InView,
  },
  setup() {
    const types = useFaqTypes();

    const type_id = ref<number>();

    const keyword = ref<string>("");

    const query = useRouteQueryValue("query", (value) => value, true);

    const submit = () => {
      query.value = keyword.value;
    };

    watchEffect(() => {
      // 타입 데이터 로딩이 완료되면 첫번째 id를 기본값으로 선택한다.
      type_id.value = types.data?.[0].id;
    });

    const faq_id = ref<number>();

    const selectFaq = (id: number) => {
      faq_id.value = id;
    };

    const faqList = useFaqList(
      // TODO: Non-null assertion 개선
      // eslint-disable-next-line
      computed(() => ({ type_id: type_id.value! })),
      computed(() => type_id.value != null)
    );

    const searchList = useFaqSearch(
      // TODO: Non-null assertion 개선
      // eslint-disable-next-line
      computed(() => ({ query: query.value! })),
      computed(() => !!query.value)
    );

    // 검색중일때는 검색 리스트, 아닐 시에는 일반 리스트
    const currentFaqList = computed(() => (query.value ? searchList : faqList));

    return { keyword, submit, types, type_id, query, currentFaqList, faq_id, selectFaq };
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
