<template>
  <component :is="is" :to="to" class="app-bar-action">
    <slot />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

/**
 * AppBar에 삽입되는 버튼
 */
export default defineComponent({
  name: "AppBarAction",
  props: {
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
@import "@/styles/config";

.app-bar-action {
  @include touchable;

  :deep(img) {
    display: block;
    width: (44/2/16) * 1rem;
  }
}
</style>
