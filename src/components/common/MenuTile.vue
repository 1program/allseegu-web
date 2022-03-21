<template>
  <component :is="is" class="menu-tile" :to="to">
    <div class="main">
      <slot />
    </div>
    <div class="trailing" v-if="$slots.trailing">
      <slot name="trailing" />
    </div>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "MenuTile",
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

.menu-tile {
  padding: (12/2/16) * 1rem (40/2/16) * 1rem;
  min-height: (108/2/16) * 1rem;
  font-size: (30/2/16) * 1rem;
  width: 100%;
  text-align: left;
  line-height: 1.1;

  display: flex;
  align-items: center;

  @include touchable;
}

.main {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
}

.trailing {
  margin-left: 1rem;
}
</style>
