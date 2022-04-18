<template>
  <ListTile
    category="신림 1구역 재개발 사업"
    title="조합이 바르게 운영되지 못하고 와해되는 이유"
    :show-footer="false"
    :show-tools="false"
    to="/redev/1/story/1"
  >
    <CommentSimpleTile content="새로운 실거래 6.95억은 세끼고 인가요?" @remove="removeComment(0)" />
  </ListTile>
  <ListDivider />
  <ListTile
    category="광명 7구역 신동아 아파트 리모델링 사업"
    title="조합이 바르게 운영되지 못하고 와해되는 이유"
    :show-footer="false"
    :show-tools="false"
    to="/redev/1/story/1"
  >
    <CommentSimpleTile
      content="새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요?"
      @remove="removeComment(1)"
    />
  </ListTile>
  <ListDivider />
  <ListTile
    category="세곡 6지구 재건축 사업"
    title="조합이 바르게 운영되지 못하고 와해되는 이유"
    :show-footer="false"
    :show-tools="false"
    to="/redev/1/story/1"
  >
    <CommentSimpleTile
      content="새로운 실거래 6.95억은 세끼고 인가요?새로운 실거래 6.95억은 세끼고 인가요?새로운 실거래 6.95억은 세끼고 인가요?"
      @remove="removeComment(2)"
    />
  </ListTile>
</template>

<script lang="ts">
import { useConfirm } from "@/composables/common/useConfirm";
import { useUi } from "@/composables/common/useUi";
import { defineComponent } from "vue";
import ListTile from "@/components/common/ListTile.vue";
import CommentSimpleTile from "@/components/comment/CommentSimpleTile.vue";
import ListDivider from "@/components/common/ListDivider.vue";

export default defineComponent({
  name: "MyPostsComment",
  setup() {
    const confirm = useConfirm();
    const { notImplemented } = useUi();
    const removeComment = async (id: number) => {
      if (await confirm("정말 삭제하시겠습니까?", { okLabel: "삭제" })) {
        notImplemented();
      }
    };
    return { removeComment };
  },
  components: { ListTile, CommentSimpleTile, ListDivider },
});
</script>
