<template>
  <transition-group>
    <app-toast v-for="toast in toasts" :key="toast.id">
      {{ toast.message }}
    </app-toast>
  </transition-group>
</template>

<script lang="ts">
import { useToasts } from "@/composables/common/useToast";
import { defineComponent } from "vue";
import AppToast from "./AppToast.vue";

export default defineComponent({
  name: "ToastRenderer",
  components: { AppToast },
  setup() {
    const { toasts, close } = useToasts();

    return { toasts, close };
  },
});
</script>
