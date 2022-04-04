<template>
  <div class="redev-hot-icon">HOT</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RedevHotIcon",
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.redev-hot-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: (96/2/16) * 1rem;
  height: (96/2/16) * 1rem;
  border-radius: (10/2/16) * 1rem;
  font-size: (30/2/16) * 1rem;
  font-weight: 900;
  color: white;
  background-image: linear-gradient(70deg, #00d23c, #2170fe);
}
</style>
