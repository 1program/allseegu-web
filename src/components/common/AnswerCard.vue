<template>
  <div class="answer-card">
    <div class="card-header">
      {{ label ?? "답변" }}
      <div class="info">{{ dateText ?? "-" }}</div>
    </div>
    <div class="answer" v-if="answer != null">{{ answer }}</div>
  </div>
</template>

<script lang="ts">
import { formatDate } from "@/lib/formatters";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AnswerCard",
  props: {
    label: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
      default: null,
    },
    answer: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    return {
      dateText: formatDate(props.date),
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.answer-card {
  display: flex;
  flex-direction: column;
  background-color: #f3f3f3;
}

.card-header {
  display: flex;
  align-items: center;
  font-size: (26/2/16) * 1rem;
}

.info {
  margin-left: (21/2/16) * 1rem;
  color: #ddd;
}

.answer {
  font-size: (30/2/16) * 1rem;
  margin-top: (24/2/16) * 1rem;
}
</style>
