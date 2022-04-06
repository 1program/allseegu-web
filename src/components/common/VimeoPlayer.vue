<template>
  <div class="vimeo-player">
    <iframe ref="element" :src="src" title="Player" allow="autoplay" frameborder="0" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import Vimeo from "@vimeo/player";

export default defineComponent({
  name: "VimeoPlayer",
  props: {
    id: {
      type: Number,
      required: true,
    },
    playing: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const element = ref<HTMLIFrameElement>();

    let player: Vimeo | undefined;

    const options = new URLSearchParams({
      loop: "1",
      autopause: "0",
      background: "1",
    });

    const src = computed(() => `https://player.vimeo.com/video/${props.id}?${options}`);

    watch(
      () => ({ element: element.value, id: props.id }),
      (current) => {
        if (current.element) {
          player = new Vimeo(current.element, {
            id: current.id,
            loop: true,
            autopause: false,
            background: true,
          });

          player.setMuted(true);
        }
      },
      { immediate: true }
    );

    watch(
      () => props.playing,
      (playing) => {
        if (player) {
          if (playing) {
            player.play();
          } else {
            player.pause();
          }
        }
      },
      { immediate: true }
    );

    return { src, element };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.vimeo-player {
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
