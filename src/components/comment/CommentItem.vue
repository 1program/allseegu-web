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
      :comment-count="comment.children.length"
      :expanded="expanded"
      :mine="comment.mine"
      @expand="expanded = $event"
      @edit="editing = !editing"
      @remove="notImplemented"
    >
      <template v-for="subComment in comment.children" :key="subComment.id">
        <div class="divider light darker margin" />
        <SubItem>
          <CommentChildItem :comment="subComment" />
        </SubItem>
      </template>
    </CommentTile>
  </div>
</template>

<script lang="ts">
import { useUi } from "@/composables/common/useUi";
import { TempComment } from "@/models/comment";
import { defineComponent, PropType, ref } from "vue";
import CommentForm from "./CommentForm.vue";
import CommentTile from "./CommentTile.vue";
import SubItem from "../common/SubItem.vue";
import CommentChildItem from "./CommentChildItem.vue";

export default defineComponent({
  name: "CommentItem",
  props: {
    comment: {
      type: Object as PropType<TempComment>,
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
  components: { CommentForm, CommentTile, SubItem, CommentChildItem },
});
</script>
