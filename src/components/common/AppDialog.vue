<template>
  <app-modal @close="$emit('close')">
    <div class="wrapper">
      <div class="title" v-if="$slots.title"><slot name="title" /></div>
      <!-- padding이 없는 content -->
      <div class="default" v-if="$slots.default">
        <slot name="default" />
      </div>
      <!-- padding이 있는 content -->
      <div class="content" v-if="$slots.content">
        <slot name="content" />
      </div>
      <div class="footer" v-if="$slots.footer"><slot name="footer" /></div>
    </div>
  </app-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppModal from "./AppModal.vue";

export default defineComponent({
  name: "AppDialog",
  components: { AppModal },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.wrapper {
  padding: (40/2/16) * 1rem;
  padding-top: (54/2/16) * 1rem;
}

.title {
  font-size: (42/2/16) * 1rem;
  text-align: center;
  margin-bottom: (26/2/16) * 1rem;
}

.default {
  margin: 0 (40/2/16) * -1rem;
}

.content {
  font-size: (30/2/16) * 1rem;
  text-align: center;
}

.footer {
  margin-top: (40/2/16) * 1rem;
}
</style>
