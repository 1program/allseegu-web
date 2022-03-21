<template>
  <!-- eslint-disable-next-line -->
  <textarea class="form-textarea" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormTextarea",
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.form-textarea {
  width: 100%;
  padding: (34/2/16) * 1rem;
  border: 1px solid #dddddd;
  resize: vertical;
  min-height: (320/2/16) * 1rem;
  font-size: (30/2/16) * 1rem;
  margin-top: 1rem;
  line-height: 1.5;
  outline: none;

  &::placeholder {
    color: #dddddd;
  }
}
</style>
