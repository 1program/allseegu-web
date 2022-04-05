<template>
  <div class="comment-form-tile">
    <CommentForm
      v-if="editing"
      :comment="comment"
      show-cancel
      ok-label="수정"
      @ok="editing = false"
      @cancel="editing = false"
    />
    <CommentTile
      v-else
      :nickname="comment.nickname"
      :date="date"
      :images="comment.images"
      :content="comment.content"
      :expanded="expanded"
      :mine="comment.mine"
      sub
      @expand="expanded = $event"
      @edit="editing = !editing"
      @remove="notImplemented"
    />
  </div>
</template>

<script lang="ts">
import { useUi } from "@/composables/common/useUi";
import { TempChildComment } from "@/models/comment";
import { defineComponent, PropType, ref } from "vue";
import CommentForm from "./CommentForm.vue";
import CommentTile from "./CommentTile.vue";

export default defineComponent({
  name: "CommentItem",
  props: {
    comment: {
      type: Object as PropType<TempChildComment>,
      required: true,
    },
  },
  setup() {
    const { notImplemented } = useUi();

    const editing = ref(false);

    const expanded = ref(false);

    return {
      date: new Date(),
      editing,
      expanded,
      notImplemented,
    };
  },
  components: { CommentForm, CommentTile },
});
</script>
