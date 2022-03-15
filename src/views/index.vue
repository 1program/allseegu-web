<template>
  <div class="index-page">
    <app-heading-bar />
    <redev-map />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RedevMap from "@/components/redev/RedevMap.vue";
import AppHeadingBar from "@/components/common/AppHeadingBar.vue";

export default defineComponent({
  name: "IndexPage",
  components: { RedevMap, AppHeadingBar },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.index-page {
  height: 100vh;
}
</style>
