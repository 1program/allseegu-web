<template>
  <div class="form-error-message" v-if="message != null">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormErrorMessage",
  props: {
    message: { type: String, default: null, description: "유효성 검사 에러 메시지" },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.form-error-message {
  width: 100%;
  white-space: pre-wrap;
  margin-bottom: (43/2/16) * 1rem;
  background-color: rgba($color-red, 0.15);
  color: $color-red;
  padding: (25/2/16) * 1rem;
  text-align: center;
  font-size: (30/2/16) * 1rem;
  border-radius: (10/2/16) * 1rem;
  border: 1px solid $color-red;
  line-height: (47/30);
}
</style>
