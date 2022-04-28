<template>
  <app-scaffold title="알림 설정">
    <div class="container page-wrapper">
      <div class="list-group">
        <menu-button>
          <template v-slot>공지사항</template>
          <template v-slot:trailing>
            <app-toggle v-bind="field('notice_alim')" />
          </template>
        </menu-button>
        <menu-button>
          <template v-slot>1:1 문의</template>
          <template v-slot:trailing>
            <app-toggle v-bind="field('qna_alim')" />
          </template>
        </menu-button>
        <menu-button>
          <template v-slot>올려주세요</template>
          <template v-slot:trailing>
            <app-toggle v-bind="field('request_alim')" />
          </template>
        </menu-button>
      </div>
      <!-- <div class="divider" />
      <div class="list-group">
        <menu-button>
          <template v-slot>마케팅 정보 수신 <span class="date">2022. 02. 28</span></template>
          <template v-slot:trailing>
            <app-toggle v-model:checked="settings.marketing" />
          </template>
        </menu-button>
        <menu-button>
          <template v-slot>이메일로 알림 정보 수신</template>
          <template v-slot:trailing>
            <app-toggle v-model:checked="settings.email" />
          </template>
        </menu-button>
        <menu-button>
          <template v-slot>알림톡 / SMS로 알림 정보 수신</template>
          <template v-slot:trailing>
            <app-toggle v-model:checked="settings.sms" />
          </template>
        </menu-button>
      </div> -->
    </div>
  </app-scaffold>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import AppScaffold from "@/components/common/AppScaffold.vue";
import AppToggle from "@/components/common/AppToggle.vue";
import MenuButton from "@/components/common/MenuButton.vue";
import { useAlimSetting } from "@/composables/alim-setting/useAlimSetting";
import { useAlimSettingUpdate } from "@/composables/alim-setting/useAlimSettingUpdate";
import { AlimSettingInput, defaultAlimSettingInput } from "@/models/alim-setting";

export default defineComponent({
  name: "MySettingAlim",
  components: { AppScaffold, MenuButton, AppToggle },
  setup() {
    const alimSetting = useAlimSetting();

    const values = ref(defaultAlimSettingInput);

    // 원격 데이터를 받아와서 valus에 반영한다. 데이터가 없다면 기본값으로 채운다.
    watch(
      () => alimSetting.data,
      () => {
        values.value = alimSetting.data ?? defaultAlimSettingInput;
      }
    );

    const mutation = useAlimSettingUpdate();

    const field = (key: keyof AlimSettingInput) => ({
      checked: values.value[key] === 1,
      "onUpdate:checked": (value: boolean) => {
        values.value[key] = value ? 1 : 0;
        // 내용 변경시 동기화
        mutation.mutate(values.value);
      },
    });

    return { values, field };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.date {
  display: inline-block;
  vertical-align: middle;
  color: $color-lighter;
  font-size: (26/2/16) * 1rem;
  margin-left: (18/2/16) * 1rem;
}
</style>
