<template>
  <RouterLinkOrButton class="list-tile">
    <div class="header" v-if="category != null">
      {{ category }}
      <div class="tools" v-if="showTools == true">
        <button @click.prevent="edit">수정</button>
        <div class="tool-divider" />
        <button @click.prevent="remove">삭제</button>
      </div>
    </div>
    <div class="main">
      <div v-if="badge != null" class="badge">{{ badge }}</div>
      <div class="title">{{ title }}</div>
      <slot name="status-label" />
    </div>
    <slot />
    <div class="footer" v-if="showFooter == true">
      <div class="nickname" v-if="nickname != null">{{ nickname }}</div>
      <div class="date" v-if="dateText != null">{{ dateText }}</div>
      <div class="comments" v-if="comments != null">
        <img src="@/images/icons/comment.svg" alt="댓글" />
        {{ comments }}
      </div>
    </div>
  </RouterLinkOrButton>
</template>

<script lang="ts">
import { formatDate } from "@/lib/formatters";
import { defineComponent } from "vue";
import RouterLinkOrButton from "./RouterLinkOrButton.vue";

export default defineComponent({
  name: "ListTile",
  props: {
    category: {
      type: String,
      default: null,
    },
    badge: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: "제목",
    },
    date: {
      type: Date,
      default: () => new Date(),
    },
    nickname: {
      type: String,
      default: null,
    },
    comments: {
      type: Number,
      default: null,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    showTools: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    return {
      dateText: formatDate(props.date),
      edit: () => context.emit("edit"),
      remove: () => context.emit("remove"),
    };
  },
  components: { RouterLinkOrButton },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.list-tile {
  display: block;
  width: 100%;
  font-size: (26/2/16) * 1rem;

  @include touchable;
}

.badge {
  background-color: $color-blue;
  color: $color-white;
  border-radius: (20/2/16) * 1rem;
  padding: 0 (20/2/16) * 1rem;
  font-weight: bold;
  margin-right: (20/2/16) * 1rem;

  flex-shrink: 0;
}

.header {
  display: flex;
  align-items: center;
  text-align: left;
  margin-bottom: (12/2/16) * 1rem;

  color: $color-gray;
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

.main {
  display: flex;
  align-items: center;
  text-align: left;

  .title {
    flex: 1 1 auto;
    font-size: (30/2/16) * 1rem;

    @include ellipsis;
  }
}

.footer {
  margin-top: (18/2/16) * 1rem;
  display: flex;
  align-items: center;

  .nickname {
    color: #777;
    margin-right: 0.5rem;
  }

  .date {
    color: #ddd;
    margin-right: auto;

    @include ellipsis;
  }

  .comments {
    color: #777;
    margin-left: 0.5rem;

    display: inline-flex;
    align-items: center;

    > img {
      width: (28/2/16) * 1rem;
      margin-right: (10/2/16) * 1rem;
      margin-top: 1px;
    }
  }
}
</style>
