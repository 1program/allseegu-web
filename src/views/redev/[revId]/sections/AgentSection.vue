<template>
  <div class="section">
    <div class="section-title">부동산 문의</div>
    <div class="section-content">
      <ContactTile
        name="금미부동산"
        description="서울시 서초구 양재동 111-2 서울시 서초구 양재동 111-2 서울시 서초구 양재동 111-2"
      />
      <div class="spacer" />
      <ContactTile
        name="금미부동산"
        description="서울시 서초구 양재동 111-2 서울시 서초구 양재동 111-2 서울시 서초구 양재동 111-2"
      />
      <div class="spacer" />
      <ContactTile
        name="금미부동산"
        description="서울시 서초구 양재동 111-2 서울시 서초구 양재동 111-2 서울시 서초구 양재동 111-2"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContactTile from "@/components/common/ContactTile.vue";

export default defineComponent({
  name: "RedevDetailAgentSection",
  components: { ContactTile },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
