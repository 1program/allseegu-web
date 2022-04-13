<template>
  <RouterLinkOrButton class="community-tile">
    <!-- TODO: undefined, null 타입 정리 -->
    <ContactTile :name="title" :description="description ?? undefined">
      <template v-slot:button>
        <ContactButton :color="color"><img class="icon" :src="icon" alt="아이콘" /></ContactButton>
      </template>
    </ContactTile>
    <div class="content">{{ content }}</div>
  </RouterLinkOrButton>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

import { CommunityCafeType, CommunityType } from "@/models/community";

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
      type: Object as PropType<CommunityType>,
      default: CommunityType.KAKAO,
    },
    cafe_type: {
      type: Object as PropType<CommunityCafeType | null>,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String as PropType<string | null>,
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
        case CommunityType.KAKAO:
          return "#feeb00";
        case CommunityType.BLOG:
          return "#00c035";
        case CommunityType.CAFE:
          switch (props.cafe_type) {
            case CommunityCafeType.DAUM:
              return "#eb3640";
            case CommunityCafeType.NAVER:
              return "#02c135";
            default:
              return "";
          }
        default:
          return "";
      }
    });

    const icon = computed(() => {
      switch (props.type) {
        case CommunityType.KAKAO:
          return kakaoIcon;
        case CommunityType.BLOG:
          return naverBlogIcon;
        case CommunityType.CAFE:
          switch (props.cafe_type) {
            case CommunityCafeType.DAUM:
              return daumCafeIcon;
            case CommunityCafeType.NAVER:
              return naverCafeIcon;
            default:
              return "";
          }
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
