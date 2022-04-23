<template>
  <div class="app-scaffold">
    <app-bar
      class="app-bar"
      :title="title"
      :title-loading="titleLoading"
      :progress="progress"
      :theme="theme"
      :has-back-button="hasBackButton"
    >
      <!-- AppBar의 actions slot -->
      <template v-slot:actions>
        <slot name="actions" />
      </template>
    </app-bar>

    <!-- 기본 slot -->
    <slot name="default" />
  </div>
  <button v-if="hasTopButton" class="top-button" @click="goTop">
    <img src="@/images/icons/arrow-top-black.svg" alt="위로가기" />
    TOP
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import AppBar from "@/components/common/AppBar.vue";

export default defineComponent({
  name: "AppScaffold",
  components: { AppBar },
  props: {
    title: {
      type: String,
      default: "",
      description: "앱 스캐폴드의 제목",
    },
    titleLoading: {
      type: Boolean,
      default: false,
      description: "타이틀이 로딩중인가? Fallback 표시 여부 결정",
    },
    progress: {
      type: Number,
      default: 0,
      description: "스캐폴드의 진척도",
    },
    hasBackButton: {
      type: Boolean,
      default: true,
      description: "뒤로가기 버튼을 노출할지",
    },
    hasTopButton: {
      type: Boolean,
      default: false,
      description: "위로가기 버튼을 노출할지",
    },
    theme: {
      type: String as PropType<"default" | "primary">,
      default: "default",
    },
  },
  setup() {
    const goTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return {
      goTop,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.app-scaffold {
  @include min-height-100vh;
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

.top-button {
  position: fixed;
  right: (12/2/16) * 1rem;
  bottom: (12/2/16) * 1rem;
  width: (80/2/16) * 1rem;
  height: (80/2/16) * 1rem;

  background-color: white;
  border-radius: (10/2/16) * 1rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
  font-size: (26/2/16) * 1rem;
  font-weight: bold;
  z-index: 1050;
  line-height: 1;

  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @include touchable;

  > img {
    width: (23/2/16) * 1rem;
    margin-bottom: (8/2/16) * 1rem;
  }
}
</style>
