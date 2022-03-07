<template>
  <div class="app-bar">
    <!-- 뒤로 가기 -->
    <button class="back-button" @click="handleBack">
      <chevron-left-icon />
    </button>
    {{ title }}
    <div class="progress" :style="{ transform: `scaleX(${progress})` }" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import ChevronLeftIcon from "../icons/ChevronLeftIcon.vue";

export default defineComponent({
  name: "AppBar",
  components: { ChevronLeftIcon },
  props: {
    title: {
      type: String,
      default: "",
      description: "AppBar의 제목",
    },
    progress: {
      type: Number,
      default: 0,
      description: "AppBar의 진척도, 0 ~ 1",
    },
  },
  setup() {
    const router = useRouter();

    return {
      handleBack: router.back,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.app-bar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 55px;
  font-size: 17px;
  text-align: center;
  border-bottom: 1px solid #dddddd;
  background-color: white;
}

.back-button {
  position: absolute;
  left: 0.8rem;
  top: 0;
  bottom: 0;
  padding: 0;
  background-color: transparent;
  border: 0;
  font-size: 1.5rem;

  svg {
    display: block;
  }
}

.progress {
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  border-bottom: 1px solid $color-blue;
  transform-origin: left bottom;
  transition: transform 0.15s linear;
}
</style>
