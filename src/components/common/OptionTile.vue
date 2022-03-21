<template>
  <RouterLinkOrButton class="option-tile" :class="{ active }"><slot /></RouterLinkOrButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouterLinkOrButton from "./RouterLinkOrButton.vue";

export default defineComponent({
  name: "OptionTile",
  components: { RouterLinkOrButton },
  props: {
    active: {
      type: Boolean,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.option-tile {
  display: block;
  width: 100%;
  padding: (27/2/16) * 1rem (40/2/16) * 1rem;
  border-bottom: 1px solid $color-light;
  font-size: (30/2/16) * 1rem;
  text-align: left;

  @include touchable;

  &.active {
    background-color: #f3f3f3;
  }
}
</style>
