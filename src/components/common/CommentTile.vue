<template>
  <div class="comment-tile" :class="{ sub, mine }">
    <div class="header">
      <div class="nickname">{{ nickname }}</div>
      <div class="date">{{ dateText }}</div>
      <div class="tools" v-if="mine">
        <button class="tool">수정</button>
        <span class="tool-divider">|</span>
        <button class="tool" @click="remove">삭제</button>
      </div>
    </div>
    <div class="gallery">
      <ImageGallery :images="images" />
    </div>
    <div class="content">{{ content }}</div>
    <div class="footer">
      <button class="reply" :class="{ active: showReply }" @click="showReply = !showReply">
        답글{{ commentCount > 0 ? ` ${commentCount}` : "" }}
      </button>
    </div>
    <div class="children" v-if="$slots.default != null && showReply"><slot /></div>
  </div>
</template>

<script lang="ts">
import { formatDate } from "@/lib/formatters";
import { defineComponent, PropType, ref } from "vue";
import ImageGallery from "./ImageGallery.vue";

export default defineComponent({
  name: "CommentTile",
  props: {
    sub: {
      type: Boolean,
      description: "서브 커멘트인가?",
      default: false,
    },
    mine: {
      type: Boolean,
      default: false,
    },
    nickname: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
      default: null,
    },
    content: {
      type: String,
      default: null,
    },
    images: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    const showReply = ref(false);

    return {
      dateText: formatDate(props.date),
      remove: () => context.emit("remove"),
      showReply,
    };
  },
  components: { ImageGallery },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.comment-tile {
  position: relative;

  .header {
    display: flex;
    align-items: center;

    font-size: (26/2/16) * 1rem;
    margin-bottom: (22/2/16) * 1rem;

    .nickname {
      margin-right: (20/2/16) * 1rem;
      color: #777777;
    }

    .date {
      margin-right: (20/2/16) * 1rem;
      color: #cccccc;
    }

    .tools {
      color: $color-blue;
      margin-left: auto;
    }

    .tool {
      display: inline-block;
      vertical-align: middle;
    }

    .tool-divider {
      display: inline-block;
      vertical-align: middle;
      margin: 0 1em;
    }
  }

  .gallery {
    margin-bottom: (22/2/16) * 1rem;
  }

  .content {
    font-size: (30/2/16) * 1rem;
  }

  .footer {
    margin-top: (22/2/16) * 1rem;

    .reply {
      font-size: (26/2/16) * 1rem;
      padding: (6/2/16) * 1rem (22/2/16) * 1rem;
      border-radius: (5/2/16) * 1rem;
      border: 1px solid #cccccc;
      color: #777;

      @include touchable;

      &.active {
        border: 1px solid transparent;
        background-color: $color-blue;
        color: white;
      }
    }
  }

  .children {
    margin-top: (22/2/16) * 1rem;
  }

  &.mine .nickname {
    color: $color-blue;
  }
}
</style>
