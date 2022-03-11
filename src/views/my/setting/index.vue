<template>
  <app-scaffold title="설정">
    <div class="container page-wrapper">
      <div class="list-group top">
        <menu-button to="setting/email">이메일 변경</menu-button>
        <menu-button to="setting/nickname">별명 변경</menu-button>
        <menu-button to="setting/mobile">휴대전화번호 변경</menu-button>
        <menu-button to="setting/password">비밀번호 변경</menu-button>
        <menu-button to="setting/push">알림 설정</menu-button>
        <menu-button>로그아웃</menu-button>
      </div>
      <div class="list-divider-thick" />
      <div class="list-group">
        <menu-button @click="showingLeaveAlert = true">
          <div class="text-gray">탈퇴하기</div>
        </menu-button>
      </div>
    </div>
  </app-scaffold>
  <transition>
    <user-leave-modal v-if="showingLeaveAlert" @close="showingLeaveAlert = false" />
  </transition>
</template>

<script lang="ts">
import AppScaffold from "@/components/common/AppScaffold.vue";
import { defineComponent, ref } from "vue";
import UserLeaveModal from "@/modals/user/UserLeaveModal.vue";
import MenuButton from "@/components/common/MenuButton.vue";

export default defineComponent({
  name: "MySetting",
  components: { AppScaffold, UserLeaveModal, MenuButton },
  setup() {
    const showingLeaveAlert = ref(false);

    return { showingLeaveAlert };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.top {
  flex: 1 1 auto;
}
</style>
