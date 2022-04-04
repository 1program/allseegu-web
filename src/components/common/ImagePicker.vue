<template>
  <div class="image-picker">
    <button type="button" class="add" @click="pick">
      <img class="plus-icon" src="@/images/icons/plus.svg" alt="추가하기" />
    </button>
    <div class="item" v-for="file in files" :key="file.id">
      <img class="thumbnail" :src="file.thumbnail" alt="선택 이미지" />
      <button type="button" class="close" @click="remove(file.id)">
        <img class="close-icon" src="@/images/icons/close.svg" alt="삭제" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useFilePicker } from "@/composables/common/useFilePicker";

export default defineComponent({
  name: "ImagePicker",
  setup() {
    const { files, pick, remove } = useFilePicker({
      accept: ref("image/*"),
    });

    return {
      files,
      pick,
      remove,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.image-picker {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: (30/2/16) * 1rem;
  grid-row-gap: (16/2/16) * 1rem;
}

.item {
  position: relative;
  border: 1px solid #dddddd;
  background-color: #333333;
  aspect-ratio: 1;

  .close {
    position: absolute;
    top: -(13/2/16) * 1rem;
    right: -(13/2/16) * 1rem;
    width: (40/2/16) * 1rem;
    height: (40/2/16) * 1rem;
    border-radius: (40/2/16) * 1rem;
    border: 1px solid #ddd;
    background-color: white;

    @include touchable;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-icon {
    display: flex;
    width: (16/2/16) * 1rem;
  }
}

.thumbnail {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

.add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;

  color: $color-blue;
  border: 1px solid $color-blue;
  border-radius: (10/2/16) * 1rem;
  font-size: (40/2/16) * 1rem;

  @include touchable;

  .plus-icon {
    width: (40/2/16) * 1rem;
    height: (40/2/16) * 1rem;
  }
}
</style>
