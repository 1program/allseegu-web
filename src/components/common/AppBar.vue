<template>
  <div class="app-bar" :class="[theme]">
    <!-- 뒤로 가기 -->
    <button v-if="hasBackButton" class="back-button" @click="handleBack">
      <img class="back-icon" :src="icon" alt="뒤로가기" />
    </button>
    <div class="title">
      <SkeletonBox v-if="titleLoading" :length="4" />
      <template v-else> {{ title }}</template>
    </div>
    <div class="actions gap-horizontal">
      <slot name="actions" />
    </div>
    <div class="progress" :style="{ transform: `scaleX(${progress})` }" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { useRouter } from "vue-router";

import blackIcon from "@/images/icons/nav-arrow-left-black.svg";
import whiteIcon from "@/images/icons/nav-arrow-left-white.svg";

import SkeletonBox from "./SkeletonBox.vue";

const icons = {
  default: blackIcon,
  primary: whiteIcon,
};

export default defineComponent({
  name: "AppBar",
  props: {
    title: {
      type: String,
      default: "",
      description: "AppBar의 제목",
    },
    titleLoading: {
      type: Boolean,
      default: false,
      description: "타이틀이 로딩중인가? Fallback 표시 여부 결정",
    },
    progress: {
      type: Number,
      default: 0,
      description: "AppBar의 진척도, 0 ~ 1",
    },
    theme: {
      type: String as PropType<"default" | "primary">,
      default: "default",
    },
    hasBackButton: {
      type: Boolean,
      default: true,
      description: "뒤로가기 버튼을 노출할지",
    },
  },
  setup(props) {
    const router = useRouter();
    const icon = computed(() => icons[props.theme]);
    const goBack = () => {
      if (router.options?.history.state?.back == null) {
        /// 뒤로 갈 수 없다면 홈으로 보낸다.
        router.replace("/");
      } else {
        /// 뒤로 갈 수 있다면 뒤로 이동한다.
        router.back();
      }
    };
    return {
      icon,
      handleBack: goBack,
    };
  },
  components: { SkeletonBox },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.app-bar {
  cursor: default;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  height: (112/2/16) * 1rem;
  font-size: (34/2/16) * 1rem;
  text-align: center;
  border-bottom: 1px solid $color-light;
  background-color: $color-white;

  &.primary {
    background-color: $color-blue;
    color: $color-white;
    border-color: transparent;
  }
}

.actions {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  padding: 0 (40/2/16) * 1rem;
  align-items: center;
}

.back-button {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 0 (40/2/16) * 1rem;
  background-color: transparent;
  border: 0;
  font-size: 1.5rem;

  svg {
    display: block;
  }

  @include touchable;
}

.back-icon {
  display: block; // 수직 중앙정렬 위하여
  width: (20/2/16) * 1rem;
}

.title {
  padding-left: 3rem;
  padding-right: 3rem;

  @include ellipsis;
}

.progress {
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  border-bottom: 1px solid $color-blue;
  transform-origin: left bottom;
  transition: transform 0.15s linear;
}
</style>
