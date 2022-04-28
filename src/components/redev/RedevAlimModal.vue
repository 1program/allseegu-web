<template>
  <app-dialog @close="$emit('close')">
    <template v-slot:title>알림받기</template>
    <template v-slot:default>
      <menu-tile class="tile">
        전체 알림
        <template v-slot:trailing>
          <app-toggle v-model:checked="all" />
        </template>
      </menu-tile>
      <div class="divider" />
      <menu-tile class="tile odd">
        전문가 의견
        <template v-slot:trailing>
          <app-toggle v-model:checked="values.subscribe_alim" />
        </template>
      </menu-tile>
      <menu-tile class="tile odd">
        영상
        <template v-slot:trailing>
          <app-toggle v-model:checked="values.video_alim" />
        </template>
      </menu-tile>
      <menu-tile class="tile odd">
        커뮤니티
        <template v-slot:trailing>
          <app-toggle v-model:checked="values.community_alim" />
        </template>
      </menu-tile>
      <menu-tile class="tile odd">
        보도자료
        <template v-slot:trailing>
          <app-toggle v-model:checked="values.news_alim" />
        </template>
      </menu-tile>
      <menu-tile class="tile odd">
        공지사항
        <template v-slot:trailing>
          <app-toggle v-model:checked="values.notice_alim" />
        </template>
      </menu-tile>
      <menu-tile class="tile odd">
        우리 구역 이야기
        <template v-slot:trailing>
          <app-toggle v-model:checked="values.story_alim" />
        </template>
      </menu-tile>
    </template>
    <template v-slot:footer>
      <div class="gap-vertical">
        <app-button full @click="save" :loading="saving">확인</app-button>
        <app-button full palette="outlined-blue" @click="remove" :loading="removing">
          관심 구역 삭제
        </app-button>
      </div>
    </template>
  </app-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";

import AppButton from "@/components/common/AppButton.vue";
import AppDialog from "@/components/common/AppDialog.vue";
import AppToggle from "@/components/common/AppToggle.vue";
import MenuTile from "@/components/common/MenuTile.vue";
import { useToast } from "@/composables/common/useToast";
import { useFavorDelete } from "@/composables/favor/useFavorDelete";
import { useFavorUpdate } from "@/composables/favor/useFavorUpdate";
import { Favor } from "@/models/favor";

export default defineComponent({
  name: "RedevAlimModal",
  components: { AppDialog, AppButton, MenuTile, AppToggle },
  props: {
    favor: {
      type: Object as PropType<Favor>,
      required: true,
    },
  },
  setup(props, context) {
    const toast = useToast();

    const values = ref({
      subscribe_alim: props.favor.subscribe_alim === 1,
      video_alim: props.favor.video_alim === 1,
      community_alim: props.favor.community_alim === 1,
      news_alim: props.favor.news_alim === 1,
      notice_alim: props.favor.notice_alim === 1,
      story_alim: props.favor.story_alim === 1,
    });

    const all = computed({
      get: () => Object.values(values.value).indexOf(false) === -1,
      set: (newValue) => {
        values.value = Object.fromEntries(
          Object.entries(values.value).map(([key]) => [key, newValue])
          // eslint-disable-next-line
        ) as any;
      },
    });

    const update = useFavorUpdate();

    const save = () => {
      update.mutate({
        id: props.favor.id,
        data: {
          redev_id: props.favor.redev_id,
          subscribe_alim: values.value.subscribe_alim ? 1 : 0,
          video_alim: values.value.video_alim ? 1 : 0,
          community_alim: values.value.community_alim ? 1 : 0,
          news_alim: values.value.news_alim ? 1 : 0,
          notice_alim: values.value.notice_alim ? 1 : 0,
          story_alim: values.value.story_alim ? 1 : 0,
        },
      });
      context.emit("close");
    };

    const saving = computed(() => update.isLoading);

    const deleteMutation = useFavorDelete();

    const remove = () => {
      deleteMutation.mutate(
        {
          id: props.favor.id,
        },
        {
          onSuccess: () => {
            context.emit("close");
            toast("관심지역에서 삭제되었습니다.");
          },
        }
      );
    };

    const removing = computed(() => deleteMutation.isLoading);

    return {
      all,
      values,
      save,
      saving,
      remove,
      removing,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.divider {
  margin: (14/2/16) * 1rem;
}

.tile {
  min-height: (80/2/16) * 1rem;
}

.odd {
  color: $color-gray;
}
</style>
