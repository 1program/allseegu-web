<template>
  <app-scaffold title="알림 설정">
    <div class="container page-wrapper">
      <div class="list-group">
        <menu-button>
          <template v-slot>공지사항</template>
          <template v-slot:trailing>
            <app-toggle v-model:checked="settings.notice" />
          </template>
        </menu-button>
        <menu-button>
          <template v-slot>1:1 문의</template>
          <template v-slot:trailing>
            <app-toggle v-model:checked="settings.qna" />
          </template>
        </menu-button>
        <menu-button>
          <template v-slot>올려주세요</template>
          <template v-slot:trailing>
            <app-toggle v-model:checked="settings.request" />
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
  <transition>
    <user-leave-modal v-if="showingLeaveAlert" @close="showingLeaveAlert = false" />
  </transition>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

import AppScaffold from "@/components/common/AppScaffold.vue";
import AppToggle from "@/components/common/AppToggle.vue";
import MenuButton from "@/components/common/MenuButton.vue";
import UserLeaveModal from "@/components/user/UserLeaveModal.vue";

export default defineComponent({
  name: "MySettingAlim",
  components: { AppScaffold, UserLeaveModal, MenuButton, AppToggle },
  setup() {
    const showingLeaveAlert = ref(false);

    const settings = reactive({
      notice: true,
      qna: true,
      request: true,
      marketing: false,
      email: false,
      sms: false,
    });

    return { showingLeaveAlert, settings };
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
