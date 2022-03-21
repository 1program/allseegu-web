<template>
  <component :is="is" :to="to"><slot /></component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
  },
  setup(props) {
    return {
      is: props.to != null ? "router-link" : "button",
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";
</style>
