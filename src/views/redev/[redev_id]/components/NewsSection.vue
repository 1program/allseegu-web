<template>
  <div class="section">
    <div class="section-title">
      <!-- TODO: undefined vs null -->
      <TabBar :current-tab="type_id ?? undefined" @change-tab="type_id = $event" :tabs="tabs" />
    </div>
    <div class="section-content">
      <!-- 선택된 탭의 목록이 없을 시 -->
      <AppFallback v-if="current.data.length < 1" :message="emptyMessage" />
      <!-- 'News' 타입의 보도자료는 카드 형태 -->
      <template v-else-if="type_id === NewsType.NEWS" v-for="(row, index) in rows" :key="index">
        <div class="row">
          <ListCard
            v-for="news in row"
            :key="news.id"
            :thumbnail="news.files.images[0]?.url"
            :title="news.title"
            :href="news.link"
            target="_blank"
          />
        </div>
      </template>
      <!-- 'News' 타입 제외한 보도자료들은 목록형태 -->
      <template v-else v-for="(news, index) in current.data" :key="news.id">
        <ListDivider v-if="index > 1" />
        <NewsTile :title="news.title" :content="news.content" :href="news.link" target="_blank" />
      </template>
    </div>
  </div>
  <MoreButton v-if="current?.data.length > 0" :to="`/redev/${redev_id}/news/${type_id}`">
    {{ current?.title }} 더보기
  </MoreButton>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from "vue";
import Josa from "josa-js";

import { RedevContentChild } from "@/models/redev";
import { News, NewsType } from "@/models/news";

import ListDivider from "@/components/common/ListDivider.vue";
import ListCard from "@/components/common/ListCard.vue";
import MoreButton from "@/components/common/MoreButton.vue";
import TabBar from "@/components/common/TabBar.vue";
import NewsTile from "@/components/news/NewsTile.vue";

import AppFallback from "@/components/common/AppFallback.vue";
import { chunkArray } from "@/utils/common/chunkArray";

export default defineComponent({
  name: "RedevDetailNewsSection",
  components: { ListDivider, ListCard, MoreButton, TabBar, NewsTile, AppFallback },
  props: {
    redev_id: {
      type: Number,
      required: true,
    },
    child: {
      type: Array as PropType<RedevContentChild<"news", News[], NewsType>[]>,
      required: true,
    },
  },
  setup(props) {
    /// 첫번째 child 선택
    const type_id = ref(props.child[0]?.type_id);

    const tabs = computed(() =>
      props.child.map((child) => ({ id: child.type_id ?? 0, title: child.title }))
    );

    const current = computed(() => props.child.find((child) => child.type_id === type_id.value));

    const rows = computed(() => chunkArray(current.value?.data ?? [], 2));

    const oddWords = ["기타"];

    // '등록된 기타가 없습니다' => 이상함
    const safeTitle = computed(() =>
      oddWords.includes(current.value?.title ?? "") ? "데이터" : current.value?.title
    );

    const emptyMessage = computed(() => `등록된 ${Josa.r(safeTitle.value, "가")} 없습니다.`);

    return {
      type_id,
      tabs,
      current,
      rows,
      NewsType,
      emptyMessage,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: (19/2/16) * 1rem;
}
</style>
