<template>
  <AppScaffold title="내가 쓴 글 보기">
    <div class="page-wrapper container">
      <div class="section">
        <TabBar
          class="tab-bar"
          :current-tab="typeId"
          @change-tab="typeId = $event"
          :tabs="[
            { id: 1, title: '이야기' },
            { id: 2, title: '댓글' },
          ]"
        />
        <div class="section-content">
          <!--이야기-->
          <template v-if="typeId === 1">
            <ListTile
              category="신림 1구역 재개발 사업"
              title="조합이 바르게 운영되지 못하고 와해되는 이유"
              :show-tools="true"
              nickname="서쪽바다"
              :comments="26"
              @remove="removePost(0)"
            />
            <ListDivider />
            <ListTile
              category="신림 1구역 재개발 사업"
              title="조합이 바르게 운영되지 못하고 와해되는 이유"
              :show-tools="true"
              nickname="서쪽바다"
              :comments="26"
              @remove="removePost(1)"
            />
          </template>
          <!--댓글-->
          <template v-if="typeId === 2">
            <ListTile
              category="신림 1구역 재개발 사업"
              title="조합이 바르게 운영되지 못하고 와해되는 이유"
              :show-footer="false"
              :show-tools="false"
            >
              <CommentSimpleTile
                content="새로운 실거래 6.95억은 세끼고 인가요?"
                @remove="removeComment(0)"
              />
            </ListTile>
            <ListDivider />
            <ListTile
              category="광명 7구역 신동아 아파트 리모델링 사업"
              title="조합이 바르게 운영되지 못하고 와해되는 이유"
              :show-footer="false"
              :show-tools="false"
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
            >
              <CommentSimpleTile
                content="새로운 실거래 6.95억은 세끼고 인가요?새로운 실거래 6.95억은 세끼고 인가요?새로운 실거래 6.95억은 세끼고 인가요?"
                @remove="removeComment(2)"
              />
            </ListTile>
          </template>
        </div>
      </div>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import TabBar from "@/components/common/TabBar.vue";
import ListTile from "@/components/common/ListTile.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import CommentSimpleTile from "@/components/common/CommentSimpleTile.vue";
import { useConfirm } from "@/composables/confirm";

export default defineComponent({
  name: "MyPosts",
  components: { AppScaffold, TabBar, ListTile, ListDivider, CommentSimpleTile },
  setup() {
    const confirm = useConfirm();

    const typeId = ref(1);

    const removePost = async (id: number) => {
      if (await confirm("정말 삭제하시겠습니까?", "삭제")) {
        console.log(id);
      }
    };

    const removeComment = async (id: number) => {
      if (await confirm("정말 삭제하시겠습니까?", "삭제")) {
        console.log(id);
      }
    };

    return { typeId, removePost, removeComment };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.tab-bar {
  margin-bottom: (48/2/16) * 1rem;
}

.my-posts {
  display: flex;
  flex-direction: column;
}
</style>
