<template>
  <div class="app-fallback">
    {{ message }}
    <div class="bottom" v-if="$slots.default != null">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppFallback",
  props: {
    message: {
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.app-fallback {
  // 평소 세로로 꽉 채우도록
  flex: 1 1 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: (60/2/16) * 1rem (40/2/16) * 1rem;
  text-align: center;
  color: #666;
  min-height: 10rem;
  font-size: (30/2/16) * 1rem;
}

.bottom {
  margin-top: 1rem;
}
</style>
