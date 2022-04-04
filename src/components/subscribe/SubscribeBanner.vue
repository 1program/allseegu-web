<template>
  <div class="subscribe-banner">
    <div class="title">Premium 혜택</div>
    <div class="subtitle">각 분야의 전문가가 구역별 투자의견을 드립니다.</div>
    <AppButton class="button" @click="notImplemented">구독하기</AppButton>
  </div>
</template>

<script lang="ts">
import { useUi } from "@/composables/common/useUi";
import { defineComponent } from "vue";
import AppButton from "../common/AppButton.vue";

export default defineComponent({
  name: "SubscribeBanner",
  components: { AppButton },
  setup() {
    const { notImplemented } = useUi();

    return {
      notImplemented,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.subscribe-banner {
  background-color: #f8f8f8;
  padding: (30/2/16) * 1rem;
  text-align: center;
  font-size: (26/2/16) * 1rem;
  border-radius: (10/2/16) * 1rem;
}

.title {
  margin-bottom: (8/2/16) * 1rem;
  font-size: (30/2/16) * 1rem;
}

.subtitle {
  margin-bottom: (14/2/16) * 1rem;
  color: #777;
}

.button {
  padding: (16/2/16) * 1rem (33/2/16) * 1rem;
}
</style>
