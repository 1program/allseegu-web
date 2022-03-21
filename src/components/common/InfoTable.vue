<template>
  <div class="info-table" :class="'palette-' + palette">
    <div class="scroller">
      <div class="content">
        <div class="item" v-for="item in items" :key="item.label">
          <div class="label">{{ item.label }}</div>
          <div class="value">
            {{ item.value }}
          </div>
        </div>
        <div class="last-spacer" />
      </div>
      <div class="mask mask-start" />
      <div class="mask mask-end" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "InfoTable",
  props: {
    items: {
      type: Array as PropType<{ label: string; value: string }[]>,
      default: () => [],
    },
    palette: {
      type: String as PropType<"default" | "primary">,
      default: "default",
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.info-table {
  position: relative;

  margin-left: -(40/2/16) * 1rem;
  margin-right: -(40/2/16) * 1rem;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scroller {
  padding-left: (40/2/16) * 1rem;
  padding-right: (40/2/16) * 1rem;
  overflow-y: auto;
}

.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  width: (40/2/16) * 1rem;
}

.mask-start {
  left: 0;
  background-image: linear-gradient(to right, white 0%, transparent 100%);
}

.mask-end {
  right: 0;
  background-image: linear-gradient(to left, white 0%, transparent 100%);
}

.content {
  display: flex;
  align-items: stretch;
  flex-wrap: nowrap;
  font-size: (26/2/16) * 1rem;
  border-left: 1px solid #dddddd;
}

.item {
  flex: 0 0 auto;
  width: calc(100% / 3);
  border-top: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.last-spacer {
  flex: 0 0 auto;
  width: (40/2/16) * 1rem;
}

.label {
  padding: (14/2/16) * 1rem;
  border-bottom: 1px solid #dddddd;

  background-color: #f8f8f8;
  color: #777;
}

.value {
  flex: 1 1 auto;
  min-height: (106/2/16) * 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: (14/2/16) * 1rem;
  white-space: pre-wrap;

  font-size: (30/2/16) * 1rem;
}

.palette-primary {
  .label {
    background-color: $color-blue;
    color: white;
  }
}
</style>
