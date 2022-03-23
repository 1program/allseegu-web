<template>
  <div class="input-wrap">
    <input class="input" :placeholder="placeHolder ?? '내용을 입력해 주세요.'" />
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

.input-wrap {
  display: flex;
  align-items: center;
  border-radius: (10/2/16) * 1rem;
  border: 2px solid $color-blue;

  padding: 0 (30/2/16) * 1rem;
}

.input {
  margin: (24/2/16) * 1rem 0;
  border: none;
  outline: none;
  padding: 0;
  flex: 1 1 auto;

  font-size: (34/2/16) * 1rem;
}

::placeholder {
  color: #dddddd;
}
</style>
