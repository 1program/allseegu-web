<template>
  <app-dialog @close="$emit('close')">
    <template v-slot:title>알림받기</template>
    <template v-slot:default>
      <menu-tile class="tile">
        전체 알림
        <template v-slot:trailing>
          <app-toggle v-model:checked="all" />
        </template>
      </menu-tile>
      <div class="divider" />
      <menu-tile class="tile odd">
        전문가 의견
        <template v-slot:trailing>
          <app-toggle v-model:checked="subscribe" :disabled="all === false" />
        </template>
      </menu-tile>
      <menu-tile class="tile odd">
        영상
        <template v-slot:trailing>
          <app-toggle v-model:checked="video" :disabled="all === false" />
        </template>
      </menu-tile>
      <menu-tile class="tile odd">
        커뮤니티
        <template v-slot:trailing>
          <app-toggle v-model:checked="community" :disabled="all === false" />
        </template>
      </menu-tile>
      <menu-tile class="tile odd">
        보도자료
        <template v-slot:trailing>
          <app-toggle v-model:checked="report" :disabled="all === false" />
        </template>
      </menu-tile>
      <menu-tile class="tile odd">
        공지사항
        <template v-slot:trailing>
          <app-toggle v-model:checked="notice" :disabled="all === false" />
        </template>
      </menu-tile>
    </template>
    <template v-slot:footer>
      <div class="gap-vertical">
        <app-button full @click="$emit('close')">확인</app-button>
        <app-button full palette="outlined-blue" @click="$emit('remove'), $emit('close')">
          관심 구역 삭제
        </app-button>
      </div>
    </template>
  </app-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import AppDialog from "@/components/common/AppDialog.vue";
import AppButton from "@/components/common/AppButton.vue";
import MenuTile from "@/components/common/MenuTile.vue";
import AppToggle from "@/components/common/AppToggle.vue";

export default defineComponent({
  name: "RedevAlimModal",
  components: { AppDialog, AppButton, MenuTile, AppToggle },
  setup() {
    const all = ref(false);
    const subscribe = ref(false);
    const video = ref(false);
    const community = ref(false);
    const report = ref(false);
    const notice = ref(false);

    watch(
      () => all.value,
      (value) => {
        if (value === false) {
          subscribe.value = false;
          video.value = false;
          community.value = false;
          report.value = false;
          notice.value = false;
        }
      }
    );

    return {
      all,
      subscribe,
      video,
      community,
      report,
      notice,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.divider {
  margin: (14/2/16) * 1rem;
}

.tile {
  min-height: (80/2/16) * 1rem;
}

.odd {
  color: $color-gray;
}
</style>
