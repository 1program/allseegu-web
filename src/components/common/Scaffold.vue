<template>
  <div class="scaffold">
    <app-bar class="app-bar" :title="title" />
    <slot />
  </div>
</template>

<script lang="ts">
import AppBar from "@/components/common/AppBar.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppLayout",
  components: { AppBar },
  props: {
    title: {
      type: String,
      default: "",
      description: "앱 스캐폴드의 제목",
    },
  },
});
</script>

<style lang="scss" scoped>
.scaffold {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}

.app-bar {
  position: sticky;
  top: 0;
}
</style>
