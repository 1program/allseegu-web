<template>
  <app-scaffold title="회원가입" :progress="progress">
    <sliding-router-view :index="step" />
  </app-scaffold>
</template>

<script lang="ts">
import AppScaffold from "@/components/common/AppScaffold.vue";
import { computed, defineComponent, inject, provide, Ref, ref } from "vue";
import { useRoute } from "vue-router";
import SlidingRouterView from "@/components/common/SlidingRouterView.vue";

// 자식에게서 signup values를 한 곳으로 취합하기 위함.
export const SIGNUP_VALUES_SYMBOL = Symbol("SIGNUP_VALUES");

export type SignupValues = {
  over14?: boolean;
  service?: boolean;
  marketing?: boolean;

  email?: string;
  password?: string;
  confirmPassword?: string;
  nickname?: string;
};

export function useSignupValues() {
  const values = inject<Ref<SignupValues>>(SIGNUP_VALUES_SYMBOL);

  if (values == null) {
    throw new Error("비정상적인 접근입니다.");
  }

  return values;
}

export default defineComponent({
  name: "AccountSignup",
  components: { AppScaffold, SlidingRouterView },
  setup() {
    const route = useRoute();

    const step = computed<number>(() => (route.meta?.step as number | undefined) ?? 0);

    const progress = computed<number>(() => step.value / 5);

    const values = ref<SignupValues>({});

    // 자식 트리에 회원가입 values 저장소를 공급한다.
    // 마지막 스텝에서 취합하여 전송하기 위함이다.
    provide(SIGNUP_VALUES_SYMBOL, values);

    return {
      step,
      progress,
    };
  },
});
</script>
