<template>
  <div class="form-group">
    <div class="form-group-header" v-if="label != null || info != null">
      <div v-if="label != null" class="label">{{ label }}</div>
      <div v-if="info != null" class="info">{{ info }}</div>
    </div>
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
    info: {
      type: String,
      default: null,
      description: "필드의 info",
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

.form-group-header {
  display: flex;
  align-items: center;
}

.label {
  color: $color-gray;
  font-size: (30/2/16) * 1rem;
}

.info {
  color: $color-light;
  font-size: (26/2/16) * 1rem;
  margin-left: auto;
}

.error-text {
  margin-top: (28/2/16) * 1rem;
  color: $color-red;
  white-space: pre-wrap;
  font-size: (30/2/16) * 1rem;
}
</style>
