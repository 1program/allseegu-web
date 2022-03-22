<template>
  <transition-group>
    <app-dialog v-for="confirm in confirms" :key="confirm.id" @close="cancel(confirm.id)">
      <template v-slot:content>
        {{ confirm.message }}
      </template>
      <template v-slot:footer>
        <div class="gap-horizontal button-group">
          <app-button full @click="cancel(confirm.id)" palette="outlined-blue">{{
            confirm.cancelMessage ?? "취소"
          }}</app-button>
          <app-button full @click="ok(confirm.id)">{{ confirm.okMessage ?? "확인" }}</app-button>
        </div>
      </template>
    </app-dialog>
  </transition-group>
</template>

<script lang="ts">
import { useConfirms } from "@/composables/confirm";
import { defineComponent } from "vue";
import AppDialog from "./AppDialog.vue";
import AppButton from "./AppButton.vue";

export default defineComponent({
  name: "AlertRenderer",
  components: { AppDialog, AppButton },
  setup() {
    const { confirms, ok, cancel } = useConfirms();

    return { confirms, ok, cancel };
  },
});
</script>

<style lang="scss" scoped>
.button-group {
  display: flex;
  align-items: stretch;
}
</style>
