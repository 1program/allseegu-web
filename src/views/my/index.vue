<template>
  <app-scaffold title="내 정보">
    <template v-slot:actions>
      <app-bar-action to="/my/setting">
        <img src="@/images/icons/mypage-gear.svg" width="22" alt="설정" />
      </app-bar-action>
    </template>
    <div class="container page-wrapper">
      <user-info />
      <div class="divider thick" />
      <div class="list-group">
        <div class="list-title">보유 구역</div>
        <button class="list-button">신도림 1구역 재개발</button>
      </div>
      <div class="divider thick" />
      <div class="list-group">
        <menu-button to="/my/likes">관심 구역</menu-button>
        <menu-button to="/my/posts">내가 쓴 글 보기</menu-button>
      </div>
      <div class="divider thick" />
      <div class="list-group">
        <div class="list-title">고객센터</div>
        <menu-button to="/my/customer/notice" alarm> 공지사항 </menu-button>
        <menu-button to="/my/customer/faq">FAQ</menu-button>
        <menu-button to="/my/customer/inquiry" alarm> 1:1 문의 </menu-button>
        <menu-button to="/my/customer/request">올려주세요</menu-button>
        <menu-button to="/my/customer/terms" @click="ui.notImplemented"> 약관/정책 </menu-button>
      </div>
      <div class="divider thick" />
      <div class="list-group">
        <menu-button>
          <div class="text-gray">최신 버전</div>
          <template v-slot:trailing><div class="text-light">올씨구 앱 1.8.13.7</div></template>
        </menu-button>
      </div>
    </div>
  </app-scaffold>
</template>

<script lang="ts">
import AppScaffold from "@/components/common/AppScaffold.vue";
import { defineComponent } from "vue";
import UserInfo from "@/components/user/UserInfo.vue";
import AppBarAction from "@/components/common/AppBarAction.vue";
import MenuButton from "@/components/common/MenuButton.vue";
import { useUi } from "@/composables/ui";

export default defineComponent({
  name: "MyPage",
  components: { AppScaffold, UserInfo, AppBarAction, MenuButton },
  setup() {
    const ui = useUi();

    return { ui };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
</style>
