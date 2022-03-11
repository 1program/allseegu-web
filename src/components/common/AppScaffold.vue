<template>
  <div class="app-scaffold">
    <app-bar class="app-bar" :title="title" :progress="progress">
      <!-- AppBar의 actions slot -->
      <template v-slot:actions>
        <slot name="actions" />
      </template>
    </app-bar>

    <!-- 기본 slot -->
    <slot name="default" />
  </div>
</template>

<script lang="ts">
import AppBar from "@/components/common/AppBar.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppScaffold",
  components: { AppBar },
  props: {
    title: {
      type: String,
      default: "",
      description: "앱 스캐폴드의 제목",
    },
    progress: {
      type: Number,
      default: 0,
      description: "스캐폴드의 진척도",
    },
  },
});
</script>

<style lang="scss" scoped>
.app-scaffold {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}

.app-bar {
  position: sticky;
  top: 0;

  // z-index guide: https://mui.com/customization/z-index/
  z-index: 1100;
}
</style>
