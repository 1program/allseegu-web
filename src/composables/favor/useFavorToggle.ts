import { computed, Ref } from "vue";

import { useFavorCreate } from "./useFavorCreate";
import { useFavorDelete } from "./useFavorDelete";
import { useFavorList } from "./useFavorList";

export function useFavorToggle(redev_id: Ref<number>) {
  const list = useFavorList();

  const favor = computed(() => list.data?.find((item) => item.redev_id === redev_id.value));

  const remove = useFavorDelete();

  const create = useFavorCreate();

  const toggle = () => {
    if (favor.value) {
      remove.mutate({
        id: favor.value.id,
      });
    } else {
      create.mutate({
        redev_id: redev_id.value,
        subscribe_alim: 1,
        video_alim: 1,
        community_alim: 1,
        news_alim: 1,
        notice_alim: 1,
        story_alim: 1,
      });
    }
  };

  return { favor, toggle };
}
