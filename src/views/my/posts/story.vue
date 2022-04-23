<template>
  <ErrorFallback v-if="storyList.error != null" :error="storyList.error" />
  <LoadingFallback v-else-if="storyList.data == null" />
  <template v-else v-for="page in storyList.data.pages" :key="page.current_page">
    <!-- 데이터 없을 경우 -->
    <AppFallback v-if="page.total < 1" message="등록된 이야기가 없습니다." />

    <!-- 각 데이터 반복 -->
    <template v-else v-for="(story, index) in page.data" :key="story.id">
      <ListDivider v-if="index > 0" />
      <ListTile
        :category="story.redev_title?.replace('\\n', '\n')"
        :title="story.title"
        :show-tools="true"
        :nickname="story.nickname"
        :comments="story.comments_count"
        :to="`/redev/${story.redev_id}/story/${story.id}`"
        @remove="removeStory(story.redev_id, story.id)"
        @edit="editStory(story.redev_id, story.id)"
      />
    </template>

    <!-- 다음 페이지 불러오기 -->
    <InView v-if="storyList.hasNextPage" @in-view="storyList.fetchNextPage()">
      <LoadingFallback />
    </InView>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import AppFallback from "@/components/common/AppFallback.vue";
import ErrorFallback from "@/components/common/ErrorFallback.vue";
import InView from "@/components/common/InView.vue";
import ListDivider from "@/components/common/ListDivider.vue";
import ListTile from "@/components/common/ListTile.vue";
import LoadingFallback from "@/components/common/LoadingFallback.vue";
import { useConfirm } from "@/composables/common/useConfirm";
import { useMyStoryList } from "@/composables/story/useMyStoryList";
import { useStoryDelete } from "@/composables/story/useStoryDelete";

export default defineComponent({
  name: "MyPostStory",
  components: { ListTile, ListDivider, LoadingFallback, ErrorFallback, InView, AppFallback },
  setup() {
    const router = useRouter();
    const confirm = useConfirm();
    const remove = useStoryDelete();

    const storyList = useMyStoryList();

    const removeStory = async (redev_id: number, story_id: number) => {
      if (await confirm("정말 삭제하시겠습니까?", { okLabel: "삭제" })) {
        remove.mutate({
          redev_id,
          story_id,
        });
      }
    };

    const editStory = (redev_id: number, story_id: number) => {
      router.push(`/redev/${redev_id}/story/${story_id}/edit`);
    };

    return { storyList, removeStory, editStory };
  },
});
</script>
