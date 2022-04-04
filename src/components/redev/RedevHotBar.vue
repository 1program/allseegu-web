<template>
  <div class="redev-hot-bar">
    <RedevHotIcon />
    <div class="main">
      <transition-group>
        <router-link class="item" v-if="hot" :key="hot.id" :to="`/redev/${hot.id}`">
          <div class="title">
            <strong>{{ index + 1 }}</strong>
            {{ hot.title }}
          </div>
        </router-link>
      </transition-group>
    </div>
    <button class="button" @click="open(true)">
      <img src="@/images/icons/redev-list-search.svg" alt="검색" />
    </button>
  </div>
</template>

<script lang="ts">
import { useInterval } from "@/composables/common/useInterval";
import { useRedevHotIssueList } from "@/composables/redev/useRedevHotIssueList";
import { defineComponent, computed } from "vue";
import RedevHotIcon from "./RedevHotIcon.vue";

export default defineComponent({
  name: "RedevHotBar",
  components: { RedevHotIcon },
  setup(props, context) {
    const count = useInterval(3000);

    const open = (value: boolean) => {
      context.emit("open", value);
    };

    const hotList = useRedevHotIssueList();

    const length = computed(() => hotList.data?.length ?? 0);

    const index = computed(() => count.value % length.value);

    const hot = computed(() => hotList.data?.[index.value]);

    return { open, index, hot };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.redev-hot-bar {
  display: flex;
  align-items: center;

  border-radius: (10/2/16) * 1rem;
  background-color: $color-blue;
  color: white;
}

.main {
  position: relative;
  flex: 1 1 auto;
  align-self: stretch;
}

.item {
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;

  padding: 0 (50/2/16) * 1rem;
  font-size: (30/2/16) * 1rem;

  strong {
    display: inline-block;
    margin-right: (35/2/16) * 1rem;
    font-weight: 900;
  }

  &.v-enter-active,
  &.v-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  &.v-enter-from, &.v-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  &.v-enter-from {
    transform: translateY(20px);
  }
  &.v-leave-to {
    transform: scaleY(0) translateY(-10px);
  }
}

.title {
  @include ellipsis;
}

.button {
  padding: 0 (34/2/16) * 1rem;

  @include touchable;

  img {
    display: block;
    width: (42/2/16) * 1rem;
  }
}
</style>
