<template>
  <div class="index-page" :class="{ 'has-map': !searching }">
    <redev-app-bar
      class="app-bar"
      :input-ref="(el) => (input = el)"
      :searching="searching"
      @open="open"
      v-model:keyword="keyword"
    />
    <div class="map" :class="{ hidden: searching }">
      <redev-map :relayout-key="keyword" :position="initialPosition" />
      <div class="bottom">
        <redev-hot-bar @open="open" />
      </div>
      <button class="position-button" @click="start" :disabled="positionLoading">
        <loading-dots class="position-dots" v-if="positionLoading" />
        <img src="@/images/icons/gps.svg" alt="내 위치" v-else />
      </button>
    </div>
    <redev-list :keyword="keyword" v-if="searching" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from "vue";
import RedevMap from "@/components/redev/RedevMap.vue";
import RedevAppBar from "@/components/redev/RedevAppBar.vue";
import RedevHotBar from "@/components/redev/RedevHotBar.vue";
import RedevList from "@/components/redev/RedevList.vue";
import { useRoute, useRouter } from "vue-router";
import { useGeolocation } from "@/composables/common/useGeolocation";
import LoadingDots from "@/components/common/LoadingDots.vue";
import { useAlert } from "@/composables/common/useAlert";

export default defineComponent({
  name: "IndexPage",
  components: { RedevMap, RedevAppBar, RedevHotBar, RedevList, LoadingDots },
  setup() {
    const alert = useAlert();

    const {
      initialPosition,
      loading: positionLoading,
      start,
    } = useGeolocation({
      onMessage: alert,
    });

    const input = ref<HTMLInputElement | null>(null);

    const router = useRouter();

    const route = useRoute();

    const searching = computed(() => route.query.search != null);

    const keyword = computed({
      get: () => route.query.search as string,
      set: (value) => {
        router.replace({ path: "", query: { search: value } });
      },
    });

    const open = (value: boolean) => {
      if (value === true) {
        router.replace({ path: "", query: { search: "" } });
        input.value?.focus();
      } else {
        router.replace({ path: "", query: { search: undefined } });
      }
    };

    return { input, searching, open, keyword, start, positionLoading, initialPosition };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.index-page {
  display: flex;
  flex-direction: column;

  &.has-map {
    @include height-100vh;
  }
}

.app-bar {
  position: sticky;
  top: 0;
  // https://mui.com/customization/z-index/
  z-index: 1100;
}

.map {
  flex: 1 1 auto;
  position: relative;

  &.hidden {
    position: absolute;
    top: -99999px;
    visibility: hidden;
  }
}

.content {
  position: relative;
  flex: 1 1 auto;
}

.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  margin: 0 auto;
  padding: (20/2/16) * 1rem (12/2/16) * 1rem;
}

.position-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: (80/2/16) * 1rem;
  height: (80/2/16) * 1rem;
  box-shadow: 0 (3/2/16) * 1rem (7/2/16) * 1rem rgba(0, 0, 0, 0.3);
  border-radius: (10/2/16) * 1rem;
  background-color: white;

  @include touchable;

  position: fixed;
  z-index: 1;
  bottom: (137/2/16) * 1rem;
  left: (12/2/16) * 1rem;

  img {
    display: block;
    width: (44/2/16) * 1rem;
  }
}

.position-dots {
  font-size: 0.75rem;
}
</style>
