<template>
  <div class="alim-group">
    <div class="alim-header">
      <div class="category" :class="{ blue: category == '올씨구' }">{{ category }}</div>
      <div class="date" v-if="date">{{ date }}</div>
    </div>
    <div class="alim-list">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AlimGroup",
  props: {
    category: {
      type: String,
      default: null,
      description: "알림 종류 명",
    },
    date: {
      type: String,
      default: null,
      description: "최신 알림 날짜",
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.alim-group {
  display: flex;
  flex-direction: column;
}

.alim-header {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.category {
  display: flex;
  align-items: center;
  font-size: (30/2/16) * 1rem;
  color: $color-black;

  @include ellipsis;

  &.blue {
    color: $color-blue;
  }
}

.date {
  font-size: (26/2/16) * 1rem;
  color: #cccccc;
  margin-left: auto;
}

.alim-list {
  display: flex;
  flex-direction: column;
  margin-top: (24/2/16) * 1rem;
}
</style>
