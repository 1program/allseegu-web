<template>
  <!-- eslint-disable-next-line -->
  <input class="input" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormInput",
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.input {
  font-size: 1.3125rem;
  width: 100%;
  padding: 1rem 0;
  line-height: 0.9;
  border: 0;
  border-bottom: 1px solid $color-light;
  outline: none;

  &::placeholder {
    color: $color-light;
  }
}
</style>
