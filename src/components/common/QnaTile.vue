<template>
  <button class="qna-tile">
    <div class="prepend">Q.</div>
    <div class="main">
      <div class="question">
        {{ question }}
      </div>
      <div class="answer" v-if="active == true">
        {{ answer }}
      </div>
    </div>
    <div class="append"></div>
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
  display: flex;
  align-items: flex-start;
  width: 100%;
  text-align: left;
}

.prepend {
  font-size: (30/2/16) * 1rem;
  font-weight: bold;
  width: (40/2/16) * 1rem;
  flex-shrink: 0;
}

.main {
  display: flex;
  flex-direction: column;

  flex: 1 1 auto;
  font-size: (30/2/16) * 1rem;

  min-width: 0;
}

.question {
  min-width: 0;
  @include ellipsis;
}

.answer {
  color: $color-gray;
  margin-top: (32/2/16) * 1rem;
}
</style>
