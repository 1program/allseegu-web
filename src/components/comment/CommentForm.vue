<template>
  <div class="comment-form">
    <div class="header">
      <div class="title">서쪽바다</div>
      <div class="count">1/3000</div>
    </div>
    <!-- eslint-disable-next-line -->
    <textarea class="textarea" placeholder="댓글을 남겨보세요" v-model="content" />
    <FilePicker
      :files="files"
      @change-files="files = $event"
      accept="image/*"
      :add-button="false"
    />
    <div class="gap-horizontal button-group">
      <AppButton class="plus" palette="outlined-blue" @click="pick">
        <img class="plus-icon" src="@/images/icons/plus.svg" alt="이미지 추가" />
      </AppButton>
      <AppButton class="grow" palette="outlined-blue" v-if="showCancel" @click="cancel">
        {{ cancelLabel }}
      </AppButton>
      <AppButton class="grow" @click="ok">{{ okLabel }}</AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import { useUi } from "@/composables/common/useUi";
import { TempChildComment, TempComment } from "@/models/comment";
import { FileInfo } from "@/models/file/FileInfo";
import { pickFileInfo } from "@/utils/file/pickFileInfo";
import { defineComponent, PropType, ref } from "vue";
import AppButton from "../common/AppButton.vue";
import FilePicker from "../common/FilePicker.vue";

export default defineComponent({
  name: "CommentForm",
  components: { AppButton, FilePicker },
  props: {
    comment: {
      type: Object as PropType<TempComment | TempChildComment>,
    },
    showCancel: {
      type: Boolean,
      default: false,
    },
    cancelLabel: {
      type: String,
      default: "취소",
    },
    okLabel: {
      type: String,
      default: "등록",
    },
  },
  setup(props, context) {
    const { notImplemented } = useUi();

    const files = ref<FileInfo[]>([]);

    const pick = async () => {
      const file = await pickFileInfo("image/*");
      files.value.push(file);
    };

    const ok = () => {
      notImplemented();
    };

    const cancel = () => {
      context.emit("cancel");
    };

    const content = ref(props.comment?.content ?? "");

    return {
      files,
      pick,
      ok,
      cancel,
      content,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.comment-form {
  padding: (38/2/16) * 1rem (19/2/16) * 1rem;
  border: 1px solid #cccccc;
  font-size: (26/2/16) * 1rem;
  background-color: #ffffff;
}

.header {
  display: flex;
  margin-bottom: (4/2/16) * 1rem;
  padding: 0 (19/2/16) * 1rem;

  .title {
    flex: 1 1 auto;
    color: $color-gray;
  }

  .count {
    color: #cccccc;
  }
}

.textarea {
  padding: (4/2/16) * 1rem (19/2/16) * 1rem;
  border: 1px solid transparent;
  background-color: transparent;
  width: 100%;
  resize: vertical;
  min-height: (146/2/16) * 1rem;
  line-height: 1.5;
  outline: none;

  &:focus {
    border: 1px solid $color-blue;
  }

  &::placeholder {
    color: #cccccc;
  }
}

.image-picker {
  margin-top: (32/2/16) * 1rem;
}

.button-group {
  display: flex;
  margin-top: (32/2/16) * 1rem;

  .plus {
    width: (98/2/16) * 1rem;
  }

  .plus-icon {
    width: (40/2/16) * 1rem;
  }

  .grow {
    flex: 1 1 auto;
  }
}
</style>
