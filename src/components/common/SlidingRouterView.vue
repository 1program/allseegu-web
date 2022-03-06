<template>
  <router-view v-slot="{ Component }">
    <transition :name="transition" mode="out-in">
      <div class="content" :key="createComponentKey(Component)">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { computed, defineComponent, ref, VNode, watch } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "SlidingRouterView",
  components: { RouterView },
  props: {
    index: {
      type: Number,
      decoration:
        "index 번호를 넣는다. 이전값보다 크다면 오른쪽으로 넘어간다. 이전 값보다 작다면 왼쪽으로 넘어간다.",
      default: null,
    },
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();

    const currentRoute = computed(() => ({
      path: route.path,
      index: router.options.history.state.position,
    }));

    const transition = ref<string>();

    const index = computed(() => props.index ?? currentRoute.value.index);

    /**
     * 이전값과 대조하여 index가 커졌다면? 오른쪽으로 애니메이션.
     * 이전값과 대조하여 index가 작아졌다면? 왼쪽으로 넘어가는 애니메이션.
     */
    watch(
      () => index.value,
      (next, prev) => {
        if (next > prev) {
          transition.value = "slide-next";
        } else {
          transition.value = "slide-prev";
        }
      }
    );

    /**
     * 컴포넌트를 구별하는 키를 고유 키를 생성해주는 함수이다.
     *
     * - 그리하여, Nested route에서 같은 컴포넌트에 머물 시에 transition이 일어나지 않도록 한다.
     * - 다른 컴포넌트가 마운트 된다면, transition이 일어나도록 한다.
     */
    const createComponentKey = (Component: VNode) =>
      typeof Component?.type === "object" ? (Component.type as any).name : "";

    return {
      transition,
      createComponentKey,
    };
  },
});
</script>

<style lang="scss" scoped>
.content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-next-enter-active,
.slide-prev-enter-active {
  transition: all 0.3s ease-out;
}

.slide-next-leave-active,
.slide-prev-leave-active {
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-next-enter-from,
.slide-next-leave-to,
.slide-prev-enter-from,
.slide-prev-leave-to {
  opacity: 0;
}

.slide-next-enter-from,
.slide-prev-leave-to {
  transform: translateX(20px);
}

.slide-next-leave-to,
.slide-prev-enter-from {
  transform: translateX(-20px);
}
</style>
