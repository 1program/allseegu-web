<template>
  <button class="qna-tile">
    <div class="header">
      <div class="prepend">Q.</div>
      <div class="title">{{ question }}</div>
      <div class="append">
        <img src="@/images/icons/arrow-top-black.svg" alt="토글" :class="{ active }" />
      </div>
    </div>
    <transition>
      <div class="folder" v-if="active === true">
        <div class="content">{{ answer }}</div>
      </div>
    </transition>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "QnaTile",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    question: {
      type: String,
      default: null,
    },
    answer: {
      type: String,
      default: null,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.qna-tile {
  width: 100%;
  text-align: left;
}

.header {
  display: flex;
  align-items: flex-start;

  .prepend {
    font-size: (30/2/16) * 1rem;
    font-weight: bold;
    width: (40/2/16) * 1rem;
    flex-shrink: 0;
  }

  .title {
    min-width: 0;
    flex: 1 1 auto;
    @include ellipsis;
  }

  .append {
    flex-shrink: 0;
    margin-left: (10/2/16) * 1rem;

    > img {
      width: (22/2/16) * 1rem;
      height: (12/2/16) * 1rem;
      margin-bottom: (10/2/16) * 1rem;

      &:not(.active) {
        transform: rotate(180deg);
      }
    }
  }
}

.main {
  display: flex;
  flex-direction: column;

  flex: 1 1 auto;
  font-size: (30/2/16) * 1rem;

  min-width: 0;
}

.folder {
  max-height: 400px;

  &.v-enter-active,
  &.v-leave-active {
    transition: max-height 0.3s ease, opacity 0.3s ease;
  }

  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
    max-height: 0;
  }
}
.content {
  color: $color-gray;
  margin-top: (32/2/16) * 1rem;
  margin-left: (42/2/16) * 1rem;
  margin-right: (25/2/16) * 1rem;
}
</style>
