<template>
  <RouterLinkOrButton class="comment-simple-tile">
    <div class="comment" v-if="content != null">{{ content }}</div>
    <div class="footer">
      <div class="date" v-if="dateText != null">{{ dateText }}</div>
      <div class="tools">
        <button @click.prevent="edit">수정</button>
        <div class="tool-divider" />
        <button @click.prevent="remove">삭제</button>
      </div>
    </div>
  </RouterLinkOrButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { formatDate } from "@/lib/formatters";

import RouterLinkOrButton from "../common/RouterLinkOrButton.vue";

export default defineComponent({
  name: "CommentSimpleTile",
  components: { RouterLinkOrButton },
  props: {
    content: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
      default: () => new Date(),
    },
  },
  setup(props, context) {
    return {
      dateText: formatDate(props.date),
      edit: () => context.emit("edit"),
      remove: () => context.emit("remove"),
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.comment-simple-tile {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: (10/2/16) * 1rem;
  background-color: #f8f8f8;
  padding: (24/2/16) * 1rem (32/2/16) * 1rem;
  margin-top: (24/2/16) * 1rem;
  font-size: (26/2/16) * 1rem;
}

.comment {
  font-size: (30/2/16) * 1rem;
  text-align: left;
}

.footer {
  margin-top: (12/2/16) * 1rem;
  display: flex;
  align-items: center;

  .date {
    color: #cccccc;
    margin-right: auto;

    @include ellipsis;
  }

  .tools {
    display: flex;
    align-items: center;
    color: $color-blue;
    margin-left: auto;
  }

  .tool-divider {
    display: inline-block;
    border-left: 1px solid $color-blue;
    margin: 0 (32/2/16) * 1em;
    margin-top: 0.1em;
    height: 1em;
  }
}
</style>
