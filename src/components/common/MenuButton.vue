<template>
  <component :is="is" class="menu-button" :to="to">
    <div class="main">
      <slot />
      <div v-if="alarm" class="dot" />
    </div>
    <div class="trailing" v-if="$slots.trailing">
      <slot name="trailing" />
    </div>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "MenuButton",
  props: {
    to: {
      type: String,
      description: "<router-link />의 to. to를 지정하면 <router-link />로 변경된다.",
      default: null,
    },
    alarm: {
      type: Boolean,
      description: "새로운 알림이 있는가?",
      default: false,
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
@import "@/styles/variables";
@import "@/styles/mixins";

.menu-button {
  padding: (12/2/16) * 1rem 0;
  min-height: (80/2/16) * 1rem;
  font-size: (30/2/16) * 1rem;
  width: 100%;
  text-align: left;
  line-height: 1.1;

  display: flex;
  align-items: center;

  @include touchable;
}

.dot {
  width: (8/2/16) * 1rem;
  height: (8/2/16) * 1rem;
  border-radius: (4/2/16) * 1rem;
  background-color: $color-blue;
  margin-top: 0.2rem;
  margin-left: (16/2/16) * 1rem;
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
