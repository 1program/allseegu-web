<template>
  <div class="container page-content">
    <div class="page-header">
      <div class="page-title">아이디가 없습니다</div>
      <div class="page-subtitle text-gray">입력하신 정보와 일치하는 아이디가 없습니다.</div>
    </div>
  </div>
  <div class="container page-footer">
    <app-button full @click="ok">확인</app-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "@/components/common/AppButton.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { AppButton },
  name: "AccountFindIdNoResult",
  setup() {
    const router = useRouter();

    return {
      ok: () => router.push("/account"),
    };
  },
});
</script>
