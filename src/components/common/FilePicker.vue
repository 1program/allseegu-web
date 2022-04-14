<template>
  <div class="file-picker">
    <div class="images">
      <button type="button" class="add" @click="pick" v-if="showAddButton">
        <img class="plus-icon" src="@/images/icons/plus.svg" alt="추가하기" />
      </button>
      <!-- 서버에 업로드된 이미지 -->
      <div class="item" v-for="image in uploaded.images" :key="image.name">
        <img class="thumbnail" :src="image.url" alt="선택 이미지" />
        <button type="button" class="close" @click="removeUploadedImage(image)">
          <img class="close-icon" src="@/images/icons/close.svg" alt="삭제" />
        </button>
      </div>
      <!-- 유저가 업로드한 이미지 -->
      <div class="item" v-for="image in images" :key="image.name">
        <img class="thumbnail" :src="URL.createObjectURL(image)" alt="선택 이미지" />
        <button type="button" class="close" @click="remove(image)">
          <img class="close-icon" src="@/images/icons/close.svg" alt="삭제" />
        </button>
      </div>
    </div>
    <div class="docs" v-if="uploaded.docs.length > 0 || docs.length > 0">
      <!-- 서버에 업로드된 파일 -->
      <AttachmentTile
        v-for="doc in uploaded.docs"
        :key="doc.id"
        :url="doc.url"
        removable
        @remove="removeUploadedDoc(doc)"
      >
        {{ doc.name }}
      </AttachmentTile>
      <!-- 유저가 선택한 파일 -->
      <AttachmentTile
        v-for="doc in docs"
        :key="doc.name"
        :url="URL.createObjectURL(doc)"
        removable
        @remove="remove(doc)"
      >
        {{ doc.name }}
      </AttachmentTile>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";

import { FileInfo } from "@/models/file/FileInfo";
import { Files } from "@/models/file";

import { pickFile } from "@/utils/file/pickFile";

import AttachmentTile from "./AttachmentTile.vue";

export default defineComponent({
  name: "FilePicker",
  components: { AttachmentTile },
  props: {
    /**
     * 허용되는 Mime Types
     */
    accept: {
      type: String,
      default: "image/*",
    },

    /**
     * 추가 버튼 노출 여부
     */
    showAddButton: {
      type: Boolean,
      default: true,
    },

    /**
     * 서버에 업로드된 파일들
     */
    uploaded: {
      type: Object as PropType<Files>,
      default: () => ({
        docs: [],
        images: [],
      }),
    },

    /**
     * 새로 선택된 파일들
     */
    files: {
      type: Array as PropType<File[]>,
      default: () => [],
    },
  },
  setup(props, context) {
    // 새로운 이미지 파일들
    const images = computed(() => props.files.filter((file) => file.type.startsWith("image")));

    // 새로운 도큐먼트 파일들
    const docs = computed(() => props.files.filter((file) => !file.type.startsWith("image")));

    const pick = async () => {
      const file = await pickFile(props.accept);
      context.emit("change-files", [...props.files, file]);
    };

    const remove = (file: File) => {
      context.emit(
        "change-files",
        props.files.filter((item) => item.name !== file.name)
      );
    };

    const removeUploadedDoc = (file: FileInfo) => {
      context.emit("change-uploaded", {
        ...props.uploaded,
        docs: props.uploaded.docs.filter((doc) => doc.id !== file.id),
      });
    };

    const removeUploadedImage = (file: FileInfo) => {
      context.emit("change-uploaded", {
        ...props.uploaded,
        images: props.uploaded.images.filter((image) => image.id !== file.id),
      });
    };

    return { images, docs, pick, remove, URL, removeUploadedDoc, removeUploadedImage };
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

.docs {
  margin-top: (20/2/16) * 1rem;
  display: grid;
  grid-template-columns: 1;
  grid-row-gap: (8/2/16) * 1rem;
}
</style>
