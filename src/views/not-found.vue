<template>
  <app-scaffold title="올씨구">
    <app-fallback message="페이지를 찾을 수 없습니다.">
      <app-button full to="/redev">홈으로 돌아가기</app-button>
    </app-fallback>
  </app-scaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppButton from "@/components/common/AppButton.vue";
import AppFallback from "@/components/common/AppFallback.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";

export default defineComponent({
  name: "NotFound",
  components: { AppScaffold, AppFallback, AppButton },
});
</script>
