<template>
  <RouterLinkOrButton class="list-tile">
    <div class="header">
      <div v-if="badge != null" class="badge">{{ badge }}</div>
      <div class="title">{{ title }}</div>
    </div>
    <div class="footer">
      <div class="nickname" v-if="nickname != null">{{ nickname }}</div>
      <div class="date" v-if="dateText != null">{{ dateText }}</div>
      <div class="comments" v-if="comments != null">{{ comments }}</div>
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
  },
  setup(props) {
    return { dateText: formatDate(props.date) };
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
}

.header {
  display: flex;
  align-items: center;
  text-align: left;

  .title {
    flex: 1 1 auto;

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
  }
}
</style>
