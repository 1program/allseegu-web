<template>
  <app-scaffold title="관심 구역">
    <error-fallback v-if="favors.error != null" :error="favors.error" />
    <loading-fallback v-if="favors.data == null" />
    <app-fallback v-if="favors.data.length < 1" message="관심 구역이 없습니다." />
    <div v-else class="container page-wrapper">
      <template v-for="favor in favors.data" :key="favor.id">
        <menu-tile @click="select(favor)">
          {{ favor.redev_title }}
          <template v-slot:trailing>
            <img class="star" src="@/images/icons/star.svg" alt="좋아요" />
          </template>
        </menu-tile>
        <div class="divider" />
      </template>
    </div>
  </app-scaffold>
  <transition>
    <redev-alim-modal v-if="favor != null" :key="favor.id" :favor="favor" @close="favor = null" />
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import AppFallback from "@/components/common/AppFallback.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import ErrorFallback from "@/components/common/ErrorFallback.vue";
import LoadingFallback from "@/components/common/LoadingFallback.vue";
import MenuTile from "@/components/common/MenuTile.vue";
import RedevAlimModal from "@/components/redev/RedevAlimModal.vue";
import { useFavorList } from "@/composables/favor/useFavorList";
import { Favor } from "@/models/favor";

export default defineComponent({
  name: "MyFavors",
  components: {
    AppScaffold,
    MenuTile,
    RedevAlimModal,
    LoadingFallback,
    ErrorFallback,
    AppFallback,
  },
  setup() {
    // 선택된 관심구역
    const favor = ref<Favor | null>(null);

    const select = (target: Favor) => {
      favor.value = target;
    };

    const favors = useFavorList();

    return {
      favor,
      select,
      favors,
    };
  },
});
</script>

<style lang="scss" scoped>
.star {
  width: (40/2/16) * 1rem;
}
</style>
