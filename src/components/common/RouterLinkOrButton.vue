<template>
  <component :is="is" :to="to" :href="href" :target="target"><slot /></component>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

/**
 * `to` 프로퍼티를 제공하면, <router-link />로 렌더되며,
 * 그렇지 않다면 <button />을 렌더한다.
 */
export default defineComponent({
  name: "RouterLinkOrButton",
  props: {
    to: {
      type: String,
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
    target: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const is = computed(() => {
      if (props.href != null) {
        return "a";
      }

      if (props.to != null) {
        return "router-link";
      }

      return "button";
    });

    return {
      is,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
