<template>
  <app-scaffold title="관심 구역">
    <div class="container page-wrapper">
      <template v-for="item in list" :key="item.id">
        <menu-tile @click="configure(item.id)">
          {{ item.title }}
          <template v-slot:trailing>
            <img class="star" src="@/images/icons/star.svg" alt="좋아요" />
          </template>
        </menu-tile>
        <div class="divider" />
      </template>
    </div>
  </app-scaffold>
  <transition>
    <redev-alim-modal
      v-if="currentId != null"
      :key="currentId"
      @close="currentId = null"
      @remove="remove(currentId!)"
    />
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import MenuTile from "@/components/common/MenuTile.vue";
import { useToast } from "@/composables/toast";
import RedevAlimModal from "@/components/redev/RedevAlimModal.vue";

export default defineComponent({
  name: "MyLikes",
  components: { AppScaffold, MenuTile, RedevAlimModal },
  setup() {
    const toast = useToast();

    const currentId = ref<number | null>(null);

    const list = ref([
      { id: 0, title: "신도림 1구역 재개발" },
      { id: 1, title: "광명 7구역 신동아 아파트 리모델링 사업" },
      { id: 2, title: "세곡 6지구 재건축 사업" },
    ]);

    const configure = (id: number) => {
      currentId.value = id;
    };

    const remove = (id: number) => {
      list.value = list.value.filter((item) => item.id !== id);
      toast("관심지역에서 삭제되었습니다.");
    };

    return {
      list,
      currentId,
      configure,
      remove,
    };
  },
});
</script>

<style lang="scss" scoped>
.star {
  width: (40/2/16) * 1rem;
}
</style>
