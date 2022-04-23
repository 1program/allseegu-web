<template>
  <div ref="trigger"><slot /></div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { useInView } from "@/composables/common/useInView";

export default defineComponent({
  name: "InView",
  setup(props, context) {
    const trigger = ref<HTMLElement>();

    useInView({
      trigger,
      onInView: () => context.emit("in-view"),
      onOutView: () => context.emit("out-view"),
    });

    return {
      trigger,
    };
  },
});
</script>
