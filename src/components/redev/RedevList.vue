<template>
  <div class="redev-list">
    <div class="container">
      <!-- 검색결과: 키워드 입력 시에만 보인다. -->
      <template v-if="!!keyword">
        <ErrorFallback v-if="searchList.error != null" :error="searchList.error" />
        <LoadingFallback v-else-if="searchList.data == null" class="loading-fallback" />
        <div class="section" v-else>
          <div class="header">
            검색결과
            <div class="count">{{ searchList.totalCount ?? 0 }}</div>
          </div>
          <!-- 결과 페이지별로 반복문 돌린다. -->
          <template v-for="(page, i) in searchList.data.pages" :key="page.current_page">
            <!-- 결과 항목들 별로 반복문 돌린다. -->
            <template v-for="(redev, j) in page.data" :key="redev.id">
              <div class="divider light" v-if="i !== 0 && j !== 0" />
              <RedevTile :to="`/redev/${redev.id}`" :title="redev.title" />
            </template>
          </template>
          <!-- 다음페이지가 있는가? 화면에 들어오는 순간 데이터를 불러온다. -->
          <InView v-if="searchList.hasNextPage" @in-view="searchList.fetchNextPage">
            <LoadingFallback />
          </InView>
        </div>
        <div class="section-divider" />
      </template>

      <!-- 핫이슈 목록 -->
      <LoadingFallback v-if="hotList.data == null" />
      <div class="section" v-else>
        <div class="header">
          핫이슈
          <div class="count">{{ hotList.data.length ?? 0 }}</div>
        </div>
        <template v-for="(hot, index) in hotList.data" :key="hot.id">
          <div class="divider light" v-if="index != 0" />
          <RedevTile
            :to="`/redev/${hot.id}`"
            :title="hot.title"
            :issue="true"
            :number="index + 1"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";

import { useRedevHotIssueList } from "@/composables/redev/useRedevHotIssueList";
import { useRedevSearch } from "@/composables/redev/useRedevSearch";

import LoadingFallback from "../common/LoadingFallback.vue";
import RedevTile from "./RedevTile.vue";
import ErrorFallback from "../common/ErrorFallback.vue";
import InView from "../common/InView.vue";

export default defineComponent({
  name: "RedevList",
  props: {
    keyword: {
      type: String,
      default: "",
    },
  },
  components: { LoadingFallback, RedevTile, ErrorFallback, InView },
  setup(props) {
    const loading = ref(false);

    /// 임시 로딩 처리
    watch(
      () => props.keyword,
      () => {
        loading.value = true;
        const timer = setTimeout(() => {
          loading.value = false;
        }, 500);
        return () => {
          clearTimeout(timer);
        };
      }
    );

    const searchList = useRedevSearch(computed(() => ({ query: props.keyword, take: 10 })));

    const hotList = useRedevHotIssueList();

    return { loading, searchList, hotList };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.redev-list {
  background-color: white;
}

.content {
  padding: (60/2/16) * 1rem (40/2/16) * 1rem;
}

.header {
  display: flex;
  align-items: center;

  color: #777777;
  font-size: (30/2/16) * 1rem;

  .count {
    font-size: (26/2/16) * 1rem;
    margin-left: (18/2/16) * 1rem;
  }
}
</style>
