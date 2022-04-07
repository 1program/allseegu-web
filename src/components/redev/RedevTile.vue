<template>
  <RouterLinkOrButton class="redev-tile" :class="{ issue }">
    <div class="count" v-if="number != null">{{ number }}</div>
    <div class="title">{{ title }}</div>
  </RouterLinkOrButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouterLinkOrButton from "../common/RouterLinkOrButton.vue";

export default defineComponent({
  name: "RedevTile",
  props: {
    number: {
      type: Number,
    },
    title: {
      type: String,
    },
    issue: {
      type: Boolean,
    },
  },
  components: { RouterLinkOrButton },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.redev-tile {
  padding: (35/2/16) * 1rem 0;
  display: flex;
  align-items: center;

  @include touchable;

  .count {
    margin-right: (25/2/16) * 1rem;
    width: (30/2/16) * 1rem;
    font-weight: bold;
    text-align: center;
  }

  &.issue {
    color: $color-blue;
  }

  .title {
    @include ellipsis;
  }
}
</style>
