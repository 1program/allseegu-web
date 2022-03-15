<template>
  <div class="index-page">
    <redev-map />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RedevMap from "@/components/redev/RedevMap.vue";

export default defineComponent({
  name: "IndexPage",
  components: { RedevMap },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.index-page {
  height: 100vh;
}
</style>
