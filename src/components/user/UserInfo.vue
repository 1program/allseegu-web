<template>
  <div v-if="user == null" class="user-info">
    <h2><SkeletonBox /></h2>
    <p><SkeletonBox :length="5" /><span class="divider">/</span><SkeletonBox /></p>
  </div>
  <div v-else class="user-info">
    <h2>{{ user?.name ?? "-" }}</h2>
    <p>{{ user?.email ?? "-" }}<span class="divider">/</span>{{ user?.nickname ?? "-" }}</p>
  </div>
</template>

<script lang="ts">
import { User } from "@/models/user";
import { defineComponent, PropType } from "vue";
import SkeletonBox from "../common/SkeletonBox.vue";

/**
 * 제공된 회원 정보를 포현한다.
 */
export default defineComponent({
  name: "UserInfo",
  props: {
    user: {
      type: Object as PropType<User>,
      default: null,
    },
  },
  components: { SkeletonBox },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.user-info {
  padding: (68/2/16) * 1rem;
  text-align: center;

  h2 {
    font-size: (52/2/16) * 1rem;
    margin: 0;
    margin-bottom: (15/2/16) * 1rem;
    font-weight: 400;
  }

  p {
    font-size: (26/2/16) * 1rem;
    margin: 0;
    color: $color-gray;
  }

  .divider {
    display: inline-block;
    margin: 0 (14/2/16) * 1rem;
  }
}
</style>
