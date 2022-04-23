<template>
  <div class="content-renderer">
    <template v-for="(part, index) in parts" :key="index">
      <a v-if="part.type == 'link'" :href="part.text" target="_blank">{{ part.text }}</a>
      <template v-else-if="part.type === 'text'">{{ part.text }}</template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

import { ContentType } from "@/models/common";

// TODO: content_type에 따라 다른 컨텐트 타입 지원하기
export default defineComponent({
  name: "ContentRenderer",
  props: {
    content_type: {
      type: String as PropType<ContentType>,
      default: ContentType.PLAIN,
    },
    content: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // REGEXP http://daplus.net/regex-%EB%AC%B8%EC%9E%90%EC%97%B4-%EB%82%B4%EC%97%90%EC%84%9C-url%EC%9D%84-%EC%B0%BE%EA%B8%B0%EC%9C%84%ED%95%9C-%EC%A0%95%EA%B7%9C%EC%8B%9D/
    // Non capturing group https://stackoverflow.com/questions/3378773/can-i-use-an-or-in-regex-without-capturing-whats-enclosed
    const REGEXP =
      /((?:http|ftp|https):\/\/(?:[\w_-]+(?:(?:\.[\w_-]+)+))(?:[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?)/gi;

    const splitted = computed(() => props.content.split(REGEXP));

    const parts = computed(() =>
      splitted.value.map((item) =>
        REGEXP.test(item) ? { type: "link", text: item } : { type: "text", text: item }
      )
    );

    return {
      parts,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.content-renderer {
  a {
    color: $color-blue;
    text-decoration: underline;
  }
}
</style>
