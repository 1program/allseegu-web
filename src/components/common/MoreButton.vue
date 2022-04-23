<template>
  <RouterLinkOrButton class="more-button">
    <slot />
    <img class="more-icon" src="@/images/icons/more-gray.svg" alt="더보기 아이콘" />
  </RouterLinkOrButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import RouterLinkOrButton from "./RouterLinkOrButton.vue";

export default defineComponent({
  name: "MoreButton",
  components: { RouterLinkOrButton },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.more-button {
  display: block;
  width: 100%;
  padding: (20/2/16) * 1rem;
  background-color: #f8f8f8;
  border-top: 1px solid #dddddd;
  font-size: (26/2/16) * 1rem;
  color: #777;
  text-align: center;

  @include touchable;
}

.more-icon {
  width: (11/2/16) * 1rem;
  margin-left: (31/2/2/16) * 1rem;
}
</style>
