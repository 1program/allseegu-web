<template>
  <div class="status-label" :class="{ isAnswered }">{{ isAnswered ? "답변완료" : "미답변" }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InquiryStatusLabel",
  props: {
    isAnswered: {
      type: Boolean,
      default: null,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.status-label {
  font-weight: bold;
  color: #777777;

  &.isAnswered {
    color: $color-blue;
  }
}
</style>
