<template>
  <div class="image-picker">
    <button class="add">
      <img class="plus-icon" src="@/images/icons/plus.svg" alt="추가하기" />
    </button>
    <div class="item" v-for="index in 6" :key="index">
      <button class="close">
        <img class="close-icon" src="@/images/icons/remove-icon.svg" alt="삭제" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ImagePicker",
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

.add {
  display: inline-flex;
  align-items: center;
  justify-content: center;

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
