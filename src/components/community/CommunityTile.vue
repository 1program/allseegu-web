<template>
  <RouterLinkOrButton class="community-tile">
    <ContactTile :name="title" :description="description">
      <template v-slot:button>
        <ContactButton :color="color"><img class="icon" :src="icon" alt="아이콘" /></ContactButton>
      </template>
    </ContactTile>
    <div class="content">{{ content }}</div>
  </RouterLinkOrButton>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

import kakaoIcon from "@/images/icons/community-kakao-openchat.svg";
import naverCafeIcon from "@/images/icons/community-naver-cafe.svg";
import daumCafeIcon from "@/images/icons/community-daum-cafe.svg";
import naverBlogIcon from "@/images/icons/community-naver-blog.svg";

import ContactTile from "../common/ContactTile.vue";
import ContactButton from "../common/ContactButton.vue";
import RouterLinkOrButton from "../common/RouterLinkOrButton.vue";

export default defineComponent({
  name: "CommunityTile",
  components: { ContactTile, ContactButton, RouterLinkOrButton },
  props: {
    type: {
      type: String as PropType<"kakao" | "naver_cafe" | "naver_blog" | "daum_cafe">,
      default: "kakao",
    },
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const color = computed(() => {
      switch (props.type) {
        case "kakao":
          return "#feeb00";
        case "naver_cafe":
          return "#02c135";
        case "daum_cafe":
          return "#eb3640";
        case "naver_blog":
          return "#00c035";
        default:
          return "";
      }
    });

    const icon = computed(() => {
      switch (props.type) {
        case "kakao":
          return kakaoIcon;
        case "naver_cafe":
          return naverCafeIcon;
        case "daum_cafe":
          return daumCafeIcon;
        case "naver_blog":
          return naverBlogIcon;
        default:
          return "";
      }
    });

    return { color, icon };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.community-tile {
  width: 100%;
  text-align: left;
}

.content {
  margin-top: (20/2/16) * 1rem;
  color: (26/2/16) * 1rem;
  color: #777;
  font-size: (26/2/16) * 1rem;
}

.icon {
  width: 100%;
}
</style>
