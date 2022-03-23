<template>
  <button class="qna-tile" @click="active = !active">
    <div class="prepend">Q.</div>
    <div class="main">
      <div class="question">
        어플리케이션 업데이트 하는 방법는 방법는 방법는법는 방법는법는 방법는법는 방법는법는 방법는
        방법는 방법
      </div>
      <div class="answer" v-if="active == true">
        백스넷 네비게이션 우측에 위치한 마이페이지를 클릭하시어 업데이트가 가능합니다.
      </div>
    </div>
    <div class="append"></div>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "QnaTile",
  props: {
    question: {
      type: String,
      default: null,
    },
    answer: {
      type: String,
      default: null,
    },
  },
  setup() {
    const active = ref(false);

    return {
      active,
    };
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
