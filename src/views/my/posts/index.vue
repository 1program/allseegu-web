<template>
  <AppScaffold title="내가 쓴 글 보기">
    <div class="page-wrapper container page-content-medium">
      <TabBar
        class="tab-bar"
        :tabs="[
          { id: 1, title: '이야기', to: 'story' },
          { id: 2, title: '댓글', to: 'comment' },
        ]"
      />
      <router-view />
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppScaffold from "@/components/common/AppScaffold.vue";
import TabBar from "@/components/common/TabBar.vue";

export default defineComponent({
  name: "MyPosts",
  components: { AppScaffold, TabBar },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.tab-bar {
  margin-bottom: (48/2/16) * 1rem;
}

.my-posts {
  display: flex;
  flex-direction: column;
}
</style>
