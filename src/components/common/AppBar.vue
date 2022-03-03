<template>
  <div class="app-bar">{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppBar",
  props: {
    title: {
      type: String,
      default: "",
      description: "AppBar의 제목",
    },
  },
});
</script>

<style lang="scss" scoped>
.app-bar {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 55px;
  font-size: 17px;
  text-align: center;
  border-bottom: 1px solid #dddddd;
  background-color: white;
}
</style>
