<template>
  <div class="user-info">
    <h2>홍길동</h2>
    <p>honggd@naver.com<span class="divider">/</span>서쪽바다</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserInfo",
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.user-info {
  padding: (68/2/16) * 1rem;
  text-align: center;

  h2 {
    font-size: (52/2/16) * 1rem;
    margin: 0;
    margin-bottom: (15/2/16) * 1rem;
    font-weight: 400;
  }

  p {
    font-size: (26/2/16) * 1rem;
    margin: 0;
    color: $color-gray;
  }

  .divider {
    display: inline-block;
    margin: 0 (14/2/16) * 1rem;
  }
}
</style>
