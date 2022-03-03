<template>
  <div class="form-text-field">
    <div v-if="label != null" class="label">{{ label }}</div>
    <input :type="type" class="input" :aria-label="label" :placeholder="placeholder" />
    <div v-if="!!errorText" class="error-text">{{ errorText }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormTextField",
  props: {
    id: {
      type: String,
      default: null,
      description: "Input id",
    },
    type: {
      type: String,
      default: null,
      description: "Input type",
    },
    label: {
      type: String,
      default: null,
      description: "필드의 label",
    },
    placeholder: {
      type: String,
      default: null,
      description: "Input placeholder",
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

.form-text-field {
  margin-bottom: 2.4rem;
}

.label {
  font-size: 0.9375rem;
  margin-bottom: 0.5rem;
}

.input {
  font-size: 1.3125rem;
  width: 100%;
  padding: 1rem 0;
  line-height: 1;
  border: 0;
  border-bottom: 1px solid #dddddd;
  outline: none;

  &::placeholder {
    color: #dddddd;
  }
}

.error-text {
  margin-top: 1.25rem;
  color: #ff005a;
  white-space: pre-wrap;
}
</style>
