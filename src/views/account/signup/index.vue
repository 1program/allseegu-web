<template>
  <app-scaffold title="회원가입" :progress="progress">
    <sliding-router-view :index="step" />
  </app-scaffold>
</template>

<script lang="ts">
import AppScaffold from "@/components/common/AppScaffold.vue";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import SlidingRouterView from "@/components/common/SlidingRouterView.vue";

export default defineComponent({
  name: "AccountSignup",
  components: { AppScaffold, SlidingRouterView },
  setup() {
    const route = useRoute();

    const step = computed<number>(() => (route.meta?.step as number | undefined) ?? 0);

    const progress = computed<number>(() => step.value / 5);

    return {
      step,
      progress,
    };
  },
});
</script>
