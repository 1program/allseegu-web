<template>
  <div class="tab-bar">
    <template v-for="(tab, index) in tabs" :key="tab.id">
      <div class="divider" v-if="index != 0" />
      <button class="tab" :class="{ active: tab.id == currentTab }" @click="changeTab(tab.id)">
        {{ tab.title }}
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "TabBar",
  props: {
    currentTab: {
      type: [String, Number],
      default: null,
    },
    tabs: {
      type: Array as PropType<{ id: string | number; title: string }[]>,
      default: () => [
        {
          id: 0,
          title: "보도자료",
        },
      ],
    },
  },
  setup(props, context) {
    return {
      changeTab: (id: string | number) => {
        context.emit("change-tab", id);
      },
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.tab-bar {
  line-height: 1;
  text-align: center;

  .tab {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    font-size: (26/2/16) * 1rem;
    margin-bottom: (16/2/16) * 1rem;

    @include touchable;

    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: (-16/2/16) * 1rem;
      height: (4/2/16) * 1rem;
      background-color: $color-blue;
      opacity: 0;
      transition: opacity 0.15s ease;
    }

    &:hover {
      &:after {
        opacity: 0.5;
      }
    }

    &.active {
      &:after {
        opacity: 1;
      }
    }
  }

  .divider {
    display: inline-block;
    vertical-align: middle;
    margin: 0 (31/2/16) * 1rem;
    margin-top: 0.1em;
    margin-bottom: (17/2/16) * 1rem;
    border-left: 1px solid #dddddd;
    height: 1em;
  }
}
</style>
