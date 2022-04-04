<template>
  <div class="info-table" :class="'palette-' + palette">
    <div class="scroller" ref="scroller">
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
      <img
        class="more more-start"
        :class="{ active: !reached.left }"
        :src="moreIcon"
        alt="더보기"
      />
      <img class="more more-end" :class="{ active: !reached.right }" :src="moreIcon" alt="더보기" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue";
import moreGray from "@/images/icons/more-gray.svg";
import moreWhite from "@/images/icons/more-white.svg";
import useScrollReached from "@/composables/common/useScrollReached";

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
  setup(props) {
    const scroller = ref<HTMLDivElement | null>(null);

    const reached = useScrollReached(scroller);

    const moreIcon = computed(() => {
      switch (props.palette) {
        case "primary":
          return moreWhite;
        default:
          return moreGray;
      }
    });

    return { moreIcon, reached, scroller };
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
}

.mask-end {
  right: 0;
}

.more {
  position: absolute;
  top: (27/2/16) * 1rem;

  width: (11/2/16) * 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  &.active {
    opacity: 0.7;
  }
}

.more-start {
  left: (20/2/16) * 1rem;
  transform: rotate(-180deg);
}

.more-end {
  right: (20/2/16) * 1rem;
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

.palette-default {
  .mask-start {
    background-image: linear-gradient(to right, white 0%, transparent 100%);
  }

  .mask-end {
    background-image: linear-gradient(to left, white 0%, transparent 100%);
  }
}

.palette-primary {
  .label {
    background-color: $color-blue;
    color: white;
  }
}
</style>
