<template>
  <transition-group>
    <app-dialog v-for="alert in alerts" :key="alert.id" @close="close(alert.id)">
      <template v-slot:content>
        {{ alert.message }}
      </template>
      <template v-slot:footer>
        <app-button full @click="close(alert.id)">확인</app-button>
      </template>
    </app-dialog>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useAlerts } from "@/composables/common/useAlert";

import AppButton from "./AppButton.vue";
import AppDialog from "./AppDialog.vue";

export default defineComponent({
  name: "AlertRenderer",
  components: { AppDialog, AppButton },
  setup() {
    const { alerts, close } = useAlerts();

    return { alerts, close };
  },
});
</script>
