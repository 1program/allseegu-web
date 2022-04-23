<template>
  <div class="comment-tile">
    <div class="header" :class="{ mine }">
      <div class="nickname">{{ nickname }}</div>
      <div class="date">{{ dateText }}</div>
      <div class="tools" v-if="mine">
        <button class="tool" @click.prevent="edit">수정</button>
        <span class="tool-divider">|</span>
        <button class="tool" @click.prevent="remove">삭제</button>
      </div>
    </div>
    <div class="gallery">
      <ImageGallery :images="images" />
    </div>
    <div class="content">{{ content }}</div>
    <div class="footer" v-if="commentEnabled">
      <button class="reply" :class="{ active: expanded }" @click="expand">
        답글{{ commentCount > 0 ? ` ${commentCount}` : "" }}
      </button>
    </div>
    <div class="children" v-if="$slots.default != null && expanded"><slot /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { formatDate } from "@/lib/formatters";
import { FileInfo } from "@/models/file";

import ImageGallery from "../common/ImageGallery.vue";

// TODO: 바인딩 완료 후 prop 축약
export default defineComponent({
  name: "CommentTile",
  components: { ImageGallery },
  props: {
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
      type: Array as PropType<FileInfo[]>,
      default: () => [],
    },
    commentEnabled: {
      type: Boolean,
      default: true,
      description: "대댓글이 허용되는가?",
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    return {
      dateText: formatDate(props.date),
      edit: () => context.emit("edit"),
      remove: () => context.emit("remove"),
      expand: () => context.emit("expand", !props.expanded),
    };
  },
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
    white-space: pre-wrap;
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

  .mine .nickname {
    color: $color-blue;
  }
}
</style>
