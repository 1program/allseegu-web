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

// https://codepen.io/aut0maat10/pen/ExaNZNo
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

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

  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
</style>
