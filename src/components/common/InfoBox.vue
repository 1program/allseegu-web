<template>
  <div class="info-box">
    <div class="label" v-if="label != null">{{ label }}</div>
    <div class="main"><slot /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InfoBox",
  props: {
    label: { type: String, default: null },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.info-box {
  background-color: $color-lightest;
  padding: (40/2/16) * 1rem;
  margin-bottom: (43/2/16) * 1rem;
  line-height: 1.2;
}

.label {
  margin-bottom: (25/2/16) * 1rem;
  font-size: (30/2/16) * 1rem;
}

.main {
  font-size: (42/2/16) * 1rem;
  text-align: center;
}
</style>
