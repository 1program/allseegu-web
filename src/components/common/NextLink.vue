<template>
  <component :is="is" class="next-link" :to="to">
    <div class="label">
      <slot />
    </div>
    <img class="icon" src="@/images/icons/arrow-right-blue.svg" alt="더 보기" />
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NextLink",
  props: {
    to: {
      type: String,
      description: "<router-link />의 to prop",
    },
  },
  setup(props) {
    return {
      is: props.to != null ? "router-link" : "a",
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.next-link {
  display: flex;
  align-items: center;
  font-size: 0.9375rem;
  margin: 0.2rem 0;
}

.label {
  flex: 1 1 auto;
}

.icon {
  margin-left: 1rem;
  color: $color-blue;
  width: (12/2/16) * 1rem;
}
</style>
