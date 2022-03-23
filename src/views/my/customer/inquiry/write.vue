<template>
  <AppScaffold title="1:1문의">
    <div class="container">문의</div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";

export default defineComponent({
  name: "MyCustomerWriteInquiry",
  components: { AppScaffold },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
