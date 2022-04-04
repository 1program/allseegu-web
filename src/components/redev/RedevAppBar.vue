<template>
  <form class="redev-app-bar" @submit.prevent="submit">
    <!-- eslint-disable -->
    <div class="left">
      <img
        class="logo"
        :class="{ show: !searching }"
        src="@/images/icons/bi-logo-white.svg"
        alt="로고"
      />
      <input
        :ref="(el) => inputRef?.(el as HTMLInputElement)"
        class="input"
        v-model="innerKeyword"
        :class="{ show: searching }"
        autofocus
        placeholder="원하시는 지역을 입력해 주세요"
      />
    </div>

    <div class="buttons" v-if="searching">
      <button type="submit" class="button">
        <img src="@/images/icons/redev-list-search.svg" alt="검색" />
      </button>
      <button type="button" class="button" @click="open(false)">
        <img class="icon-close" src="@/images/icons/redev-list-close.svg" alt="닫기" />
      </button>
    </div>
    <div class="buttons" v-else>
      <button type="button" class="button" @click="open(true)">
        <img src="@/images/icons/redev-list-search.svg" alt="검색" />
      </button>
      <router-link class="button" :class="{ 'has-notice': true }" to="/alim">
        <img src="@/images/icons/redev-list-alim.svg" alt="알림" />
      </router-link>
      <router-link class="button" to="/my">
        <img src="@/images/icons/my-icon-white.svg" alt="마이페이지" />
      </router-link>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";

export default defineComponent({
  name: "RedevAppBar",
  props: {
    searching: {
      type: Boolean,
      default: false,
    },
    keyword: {
      type: String,
      default: "",
    },
    inputRef: {
      type: Function as PropType<(el: HTMLInputElement) => void>,
    },
  },
  setup(props, context) {
    const open = (value: boolean) => {
      context.emit("open", value);
    };

    const innerKeyword = ref(props.keyword);

    watch(
      () => props.keyword,
      () => {
        innerKeyword.value = props.keyword;
      }
    );

    const submit = () => {
      context.emit("update:keyword", innerKeyword.value);
    };

    return { open, submit, innerKeyword };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.redev-app-bar {
  position: relative;
  height: (112/2/16) * 1rem;
  background-color: $color-blue;
  color: $color-white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left {
  position: relative;
  height: 100%;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  height: (56/2/16) * 1rem;
  margin-right: auto;
  padding: 0 (40/2/16) * 1rem;
  opacity: 0;
  transition: opacity 0.15s ease;

  &.show {
    opacity: 1;
  }
}

.input {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  padding: 0 (40/2/16) * 1rem;
  height: 100%;
  background-color: transparent;
  border: 0;
  color: white;
  font-size: (34/2/16) * 1rem;
  outline: none;
  min-width: 0;
  font-size: 16px; // iOS에서 16픽셀 이하일때 화면이 확대됨을 막기 위함이다.

  transition: opacity 0.15s ease;
  pointer-events: none;
  opacity: 0;

  &.show {
    pointer-events: auto;
    opacity: 1;
  }

  &::placeholder {
    color: #73a5ff;
  }
}

.buttons {
  display: inline-flex;
  align-items: center;
  padding: 0 (40/2/16) * 1rem;
}

.button {
  position: relative;
  margin-left: (30/2/16) * 1rem;

  @include touchable;

  img {
    display: block;
    width: (42/2/16) * 1rem;
  }

  .icon-close {
    width: (33/2/16) * 1rem;
  }

  &.has-notice:before {
    content: "";
    position: absolute;
    top: -1px;
    right: -1px;
    width: (8/2/16) * 1rem;
    height: (8/2/16) * 1rem;
    border-radius: (8/2/16) * 1rem;
    background-color: $color-red;
  }
}
</style>
