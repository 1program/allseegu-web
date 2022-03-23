<template>
  <AppScaffold title="을씨구 공지사항" has-top-button>
    <div class="page-wrapper container page-content-medium">
      <template v-for="notice in noticeList" :key="notice.id">
        <ListTile
          :badge="notice.badge"
          :title="notice.title"
          :to="'/my/customer/notice/' + notice.id"
        />
        <ListDivider v-if="notice.id < noticeList.length" />
      </template>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import ListTile from "@/components/common/ListTile.vue";
import ListDivider from "@/components/common/ListDivider.vue";

export default defineComponent({
  name: "MyCustomerNoticeList",
  components: { AppScaffold, ListTile, ListDivider },
  setup() {
    const noticeList = [
      { title: "조합이 바르게 운영되지 못하고 와해되는 이유", badge: "공지", id: 1 },
      { title: "조합이 바르게 운영되지 못하고 와해되는 이유", id: 2 },
      { title: "빠르게 달성하는 목표", id: 3 },
      { title: "조합이 바르게 운영되지 못하고 와해되는 이유", id: 4 },
      { title: "빠르게 달성하는 목표", id: 5 },
      { title: "조합이 바르게 운영되지 못하고 와해되는 이유", id: 6 },
    ];

    return { noticeList };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
