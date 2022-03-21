<template>
  <RouterLinkOrButton class="alim-tile" :class="{ read }">
    <div class="label">
      {{ label }}
      <div class="red-dot" v-if="!read" />
    </div>
    <div class="content">{{ content }}</div>
  </RouterLinkOrButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouterLinkOrButton from "@/components/common/RouterLinkOrButton.vue";

export default defineComponent({
  name: "AlimItem",
  props: {
    read: {
      type: Boolean,
      default: false,
      description: "알림확인 여부",
    },
    label: {
      type: String,
      default: null,
      description: "알림 제목",
    },
    content: {
      type: String,
      default: null,
      description: "알림 내용 요약",
    },
  },
  components: { RouterLinkOrButton },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.alim-tile {
  display: flex;
  flex-direction: column;
  background-color: $color-white;
  align-items: stretch;
  width: 100%;
  text-align: left;

  border: 1px solid $color-white;
  border-radius: (10/2/16) * 1rem;

  padding: (32/2/16) * 1rem;

  &.read {
    background-color: transparent;
    border-color: #cccccc;
  }
}

.label {
  font-size: (26/2/16) * 1rem;
  display: flex;
  align-items: center;

  @include ellipsis;
}

.content {
  font-size: (26/2/16) * 1rem;
  color: $color-gray;
  margin-top: (20/2/16) * 1rem;

  @include ellipsis;
}

.red-dot {
  margin-left: auto;

  &::before {
    content: "";
    display: block;

    width: (8/2/16) * 1rem;
    height: (8/2/16) * 1rem;

    border-radius: (4/2/16) * 1rem;

    background-color: $color-red;
  }
}
</style>
