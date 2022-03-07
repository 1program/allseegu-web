<template>
  <div class="form-group">
    <div v-if="label != null" class="label">{{ label }}</div>
    <slot />
    <div v-if="!!errorText" class="error-text">{{ errorText }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormGroup",
  props: {
    label: {
      type: String,
      default: null,
      description: "필드의 label",
    },
    errorText: {
      type: String,
      default: null,
      description: "에러 메시지",
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.form-group {
  margin-bottom: (43/2/16) * 1rem;
}

.label {
  font-size: 0.9375rem;
}

.error-text {
  margin-top: (28/2/16) * 1rem;
  color: #ff005a;
  white-space: pre-wrap;
  font-size: (30/2/16) * 1rem;
}
</style>
