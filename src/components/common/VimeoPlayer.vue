<template>
  <div class="vimeo-player">
    <iframe
      ref="iframe"
      :src="`https://player.vimeo.com/video/${id}`"
      title="Player"
      allow="autoplay"
      frameborder="0"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
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
    const iframe = ref<HTMLIFrameElement>();

    let player: Vimeo | undefined;

    watch(
      () => ({ iframe: iframe.value, id: props.id }),
      (current) => {
        if (current.iframe) {
          player = new Vimeo(current.iframe, {
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

    return {
      iframe,
    };
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
