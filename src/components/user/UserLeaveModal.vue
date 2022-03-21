<template>
  <app-dialog @close="$emit('close')">
    <template v-slot:title>탈퇴하기</template>
    <template v-slot:content>
      탈퇴하시면 현재 계정으로 작성한 이야기, 댓글 등을 수정하거나 삭제할 수 없습니다.<br />
      계정 삭제 후 <strong>7일간</strong> 재가입이 불가능합니다. 정말 탈퇴하시겠습니까?
    </template>
    <template v-slot:footer>
      <div class="gap-vertical">
        <app-button full @click="$emit('close')">취소</app-button>
        <app-button full @click="$emit('close'), $emit('ok')" palette="outlined-blue">
          탈퇴하기
        </app-button>
      </div>
    </template>
  </app-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppDialog from "@/components/common/AppDialog.vue";
import AppButton from "@/components/common/AppButton.vue";

export default defineComponent({
  name: "UserLeaveModal",
  components: { AppDialog, AppButton },
});
</script>

<style lang="scss">
@import "@/styles/variables";

strong {
  color: $color-blue;
}
</style>
