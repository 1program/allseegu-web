<template>
  <div class="redev-list">
    <div class="container">
      <template v-if="!!keyword">
        <LoadingFallback class="loading-fallback" v-if="loading" />
        <div class="section" v-else>
          <div class="header">
            검색결과
            <div class="count">{{ results.length }}</div>
          </div>
          <template v-for="(result, index) in results" :key="result.id">
            <div class="divider light" v-if="index !== 0" />
            <RedevTile :to="`/redev/${result.id}`" :title="result.title" />
          </template>
        </div>
        <div class="section-divider" />
      </template>
      <div class="section">
        <div class="header">
          핫이슈
          <div class="count">{{ issues.length }}</div>
        </div>
        <template v-for="(issue, index) in issues" :key="issue.id">
          <div class="divider light" v-if="index !== 0" />
          <RedevTile
            :to="`/redev/${issue.id}`"
            :title="issue.title"
            :issue="true"
            :number="index + 1"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import LoadingFallback from "../common/LoadingFallback.vue";
import RedevTile from "./RedevTile.vue";

export default defineComponent({
  name: "RedevList",
  props: {
    keyword: {
      type: String,
      default: "",
    },
  },
  components: { LoadingFallback, RedevTile },
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
    const results = Array.from({ length: 20 }).map((_, index) => ({
      id: index + 1,
      title: `신림 1구역 재개발 사업 ${index + 1}`,
    }));
    const issues = [
      {
        id: 1,
        title: "신림 1구역 재개발 사업",
      },
      ...Array.from({ length: 100 }).map((_, index) => ({
        id: index + 2,
        title: "광명 7구역 신동아 아파트 리모델링 사업",
      })),
    ];
    return { results, issues, loading };
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

.loading-fallback {
  min-height: 10rem;
}
</style>
