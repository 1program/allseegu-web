<template>
  <div class="input-group">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputGroup",
  props: {
    placeHolder: {
      type: String,
      default: null,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.input-group {
  display: flex;
  align-items: center;
  border-radius: (10/2/16) * 1rem;
  border: 2px solid $color-blue;

  padding: 0 (30/2/16) * 1rem;

  ::v-deep(input) {
    margin: (24/2/16) * 1rem 0;
    border: none;
    outline: none;
    padding: 0;
    flex: 1 1 auto;
    min-width: 0;

    font-size: (34/2/16) * 1rem;

    &::placeholder {
      color: #dddddd;
    }
  }
}
</style>
