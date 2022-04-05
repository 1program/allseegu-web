<template>
  <div class="file-picker">
    <div class="images">
      <button type="button" class="add" @click="pick" v-if="addButton">
        <img class="plus-icon" src="@/images/icons/plus.svg" alt="추가하기" />
      </button>
      <div class="item" v-for="image in images" :key="image.id">
        <img class="thumbnail" :src="image.url" alt="선택 이미지" />
        <button type="button" class="close" @click="remove(image.id)">
          <img class="close-icon" src="@/images/icons/close.svg" alt="삭제" />
        </button>
      </div>
    </div>
    <div class="attachments" v-if="attachments.length > 0">
      <AttachmentTile
        v-for="attachment in attachments"
        :key="attachment.id"
        class="attachment"
        :url="attachment.url"
        removable
        @remove="remove(attachment.id)"
      >
        {{ attachment.file?.name }}
      </AttachmentTile>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { pickFileInfo, FileInfo } from "@/utils/file/pickFileInfo";
import AttachmentTile from "./AttachmentTile.vue";

export default defineComponent({
  name: "FilePicker",
  components: { AttachmentTile },
  props: {
    files: {
      type: Array as PropType<FileInfo[]>,
      default: () => [],
    },
    accept: {
      type: String,
      default: "image/*",
    },
    addButton: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    const images = computed(() =>
      props.files.filter((file) => file.file?.type.startsWith("image"))
    );

    const attachments = computed(() =>
      props.files.filter((file) => !file.file?.type.startsWith("image"))
    );

    const pick = async () => {
      const file = await pickFileInfo(props.accept);
      context.emit("change-files", [...props.files, file]);
    };

    const remove = (id: string) => {
      context.emit(
        "change-files",
        props.files.filter((file) => file.id !== id)
      );
    };

    return { pick, remove, images, attachments };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.images {
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

.attachments {
  margin-top: (20/2/16) * 1rem;
  display: grid;
  grid-template-columns: 1;
  grid-row-gap: (8/2/16) * 1rem;
}
</style>
