<template>
  <component
    :is="is"
    class="app-button"
    :class="[full && 'full', palette, loading && 'loading']"
    :to="to"
  >
    <div class="icon" v-if="$slots.icon != null">
      <slot name="icon" />
    </div>
    <slot name="default" />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

export type AppButtonPalettes =
  | "blue"
  | "white"
  | "outlined-white"
  | "outlined-blue"
  | "gray-blue"
  | "naver"
  | "kakao";

export default defineComponent({
  name: "AppButton",
  props: {
    palette: {
      type: String as PropType<AppButtonPalettes>,
      description: "버튼의 색상 팔레트",
      default: "blue",
    },
    loading: {
      type: Boolean,
      description: "로딩중인가?",
      default: false,
    },
    full: {
      type: Boolean,
      description: "화면을 꽉 채울 것인가?",
      default: false,
    },
    to: {
      type: String,
      description: "<router-link />의 to. to를 지정하면 <router-link />로 변경된다.",
      default: null,
    },
  },
  setup(props) {
    // component type
    const is = computed(() => (props.to != null ? "router-link" : "button"));
    return {
      is,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.app-button {
  /* Defaults */
  position: relative;
  display: inline-flex;
  padding: (30/2/16) * 1rem;
  text-align: center;
  border: 1px solid transparent;
  align-items: center;
  justify-content: center;
  font-size: (30/2/16) * 1rem;
  border-radius: (10/2/16) * 1rem;
  background-color: transparent;
  line-height: 1;
  user-select: none;

  /* Transition */
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active,
  &.active {
    opacity: 0.5;
  }

  /* 로딩중일 때에는 투명도를 주고, 중복 클릭 방지를 위하여 마우스 클릭을 막는다. */
  &.loading {
    opacity: 0.5;
    pointer-events: none;
  }

  /* Is full? */
  &.full {
    display: flex;
    width: 100%;
  }

  /* Palettes */
  &.blue {
    background-color: $color-blue;
    color: $color-white;
  }

  &.white {
    background-color: $color-white;
    color: $color-blue;
  }

  &.outlined-white {
    border: 1px solid $color-white;
    color: $color-white;
  }

  &.outlined-blue {
    border: 1px solid $color-blue;
    color: $color-blue;
  }

  &.gray-blue {
    background-color: #f8f8f8;
    color: $color-blue;
  }

  &.naver {
    // 자주 사용되는 컬러값이 아님으로, 지역적으로 선언한다.
    background-color: #01c73c;
    color: white;
  }

  &.kakao {
    // 자주 사용되는 컬러값이 아님으로, 지역적으로 선언한다.
    background-color: #fae100;
    color: #2c1618;
  }
}

.loading-dots {
  height: 1.3em;
}

.icon {
  position: absolute;
  top: 50%;
  left: (34/2/16) * 1rem;
  transform: translateY(-50%);

  :deep(img) {
    width: (55/2/16) * 1rem;
  }
}
</style>
