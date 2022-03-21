<template>
  <div class="community-tile">
    <ContactTile :name="title" :description="description" :color="color" />
    <div class="content">{{ content }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import ContactTile from "../common/ContactTile.vue";

export default defineComponent({
  name: "CommunityTile",
  components: { ContactTile },
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

    return { color };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.content {
  margin-top: (20/2/16) * 1rem;
  color: (26/2/16) * 1rem;
  color: #777;
  font-size: (26/2/16) * 1rem;
}
</style>
