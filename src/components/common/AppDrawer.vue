<template>
  <div tabindex="0" ref="element" class="app-drawer" @click="close" @keyup.esc="handleEsc">
    <div ref="backdropElement" class="backdrop" />
    <div
      ref="paperElement"
      class="paper"
      @click.stop
      @touchmove="swipe"
      @touchstart="swipeStart"
      @touchend="swipeEnd"
      @touchcancel="swipeEnd"
    >
      <div class="header">
        {{ title }}
        <button class="close" @click="close"><close-icon /></button>
      </div>
      <div ref="mainElement" class="main" @touchmove="scroll">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import CloseIcon from "../icons/CloseIcon.vue";

export default defineComponent({
  name: "AppDrawer",
  components: { CloseIcon },
  props: {
    title: {
      type: String,
      default: null,
      description: "Drawer title",
    },
  },
  setup(props, context) {
    const element = ref<HTMLDivElement | null>(null);
    const paperElement = ref<HTMLDivElement | null>(null);
    const backdropElement = ref<HTMLDivElement | null>(null);
    const mainElement = ref<HTMLDivElement | null>(null);

    const close = () => {
      context.emit("close");
    };

    const handleEsc = () => {
      context.emit("close");
    };

    let startY: number | null = null;
    let initialScrollTop: number | null = null;
    let dY: number | null = null;

    const swipeStart = (event: TouchEvent) => {
      startY = event.touches[0].clientY;

      if (mainElement.value != null) {
        initialScrollTop = mainElement.value.scrollTop;
      }
    };

    const swipe = (event: TouchEvent) => {
      dY = event.touches[0].clientY - (startY ?? 0) - (initialScrollTop ?? 0);

      if (paperElement.value != null && backdropElement.value != null) {
        if (dY > 0) {
          paperElement.value.style.transition = "transform 0s";
          paperElement.value.style.transform = `translateY(${dY}px)`;
        }

        const progress = dY / paperElement.value.offsetHeight;
        backdropElement.value.style.transition = "opacity 0s";
        backdropElement.value.style.opacity = `${1 - progress}`;
      }
    };

    const swipeEnd = () => {
      startY = null;

      if (element.value != null && paperElement.value != null && backdropElement.value != null) {
        paperElement.value.style.transition = "";
        backdropElement.value.style.transition = "";

        if ((dY ?? 0) > 150) {
          // 간혹 close가 늦게 호출되는 경우가 있다.
          // 그럴 경우를 위해 javascript로도 애니메이션을 트리거 해 준다.
          paperElement.value.style.transform = "translateY(100%)";
          backdropElement.value.style.opacity = "0";
          close();
        } else {
          paperElement.value.style.transform = "";
          backdropElement.value.style.opacity = "";
        }
      }
    };

    // mount 되면 body의 scroll을 비활성화 한다.
    onMounted(() => {
      if (mainElement.value != null) {
        disableBodyScroll(mainElement.value);
      }
    });

    // unmount 되면 body의 scroll을 허용한다.
    onBeforeUnmount(() => {
      if (mainElement.value != null) {
        enableBodyScroll(mainElement.value);
      }
    });

    const scroll = (e: TouchEvent) => {
      if (mainElement.value != null) {
        if (mainElement.value.scrollTop > 0) {
          e.stopPropagation();
        }
      }
    };

    return {
      element,
      paperElement,
      backdropElement,
      mainElement,
      close,
      handleEsc,
      swipe,
      swipeStart,
      swipeEnd,
      scroll,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.app-drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  // https://mui.com/customization/z-index/
  z-index: 1200;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;

  .backdrop {
    transition: opacity 0.3s ease;
  }

  .paper {
    transition: transform 0.5s ease;
  }
}

.v-enter-from,
.v-leave-to {
  opacity: 0;

  .backdrop {
    opacity: 0;
  }

  .paper {
    transform: translateY(100%);
  }
}

.backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  transition: opacity 0.3s ease;
}

.paper {
  position: absolute;
  top: 55px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top-left-radius: 0.875rem;
  border-top-right-radius: 0.875rem;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.header {
  position: relative;
  padding: 1rem;
  padding-top: 1.6825rem;
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: 1.3125rem;
  line-height: 1;
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  width: (95/2/16) * 1rem;
  height: (95/2/16) * 1rem;
  text-align: center;
  font-size: (40/2/16) * 1rem;

  @include touchable;
}

.main {
  flex: 1 1 auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
