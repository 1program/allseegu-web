<template>
  <div class="comment-form">
    <div class="header">
      <div class="title">{{ me.data?.nickname ?? "-" }}</div>
      <div class="count">{{ content.length }}/3000</div>
    </div>
    <!-- eslint-disable-next-line -->
    <textarea class="textarea" placeholder="댓글을 남겨보세요" v-model="content" />
    <FilePicker
      :new-files="files"
      @add-file="files.push($event)"
      @remove-file="files.splice(files.indexOf($event))"
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
import { useCommentCreate } from "@/composables/comment/useCommentCreate";
import { useCommentUpdate } from "@/composables/comment/useCommentUpdate";
import { useMe } from "@/composables/user/useMe";
import { Comment } from "@/models/comment";
import { ContentType } from "@/models/common";
import { pickFile } from "@/utils/file/pickFile";
import { defineComponent, PropType, ref } from "vue";
import AppButton from "../common/AppButton.vue";
import FilePicker from "../common/FilePicker.vue";

export default defineComponent({
  name: "CommentForm",
  components: { AppButton, FilePicker },
  props: {
    /**
     * 글 uuid
     */
    parent_uuid: {
      type: String,
      required: true,
    },

    /**
     * 모델
     */
    model: {
      type: String as PropType<"story">,
      required: true,
    },

    /**
     * 부모 댓글 id
     */
    comment_id: {
      type: Number,
      default: null,
    },

    /**
     * 기존 댓글
     */
    comment: {
      type: Object as PropType<Comment>,
      default: null,
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
    const me = useMe();

    const content = ref(props.comment?.content ?? "");

    const files = ref<File[]>([]);

    const deleteFiles = ref<number[]>([]);

    const pick = async () => {
      const file = await pickFile("image/*");
      files.value.push(file);
    };

    const create = useCommentCreate();

    const update = useCommentUpdate();

    const reset = () => {
      content.value = props.comment?.content ?? "";
      files.value = [];
      context.emit("ok");
    };

    // TODO: 직관적으로 축약하기
    // TODO: SERVER: 생성 직후 담아 보낸 파일도 와야 할 듯
    const ok = () => {
      if (props.comment == null) {
        // 생성
        create.mutate(
          {
            comment_id: props.comment_id,
            parent_uuid: props.parent_uuid,
            model: props.model,
            data: {
              content_type: ContentType.PLAIN,
              content: content.value,
              uploadFiles: files.value,
              deleteFiles: [],
            },
          },
          {
            onSuccess: reset,
          }
        );
      } else {
        // 수정
        update.mutate(
          {
            id: props.comment.id,
            comment_id: props.comment_id,
            parent_uuid: props.parent_uuid,
            model: props.model,
            data: {
              content_type: ContentType.PLAIN,
              content: content.value,
              uploadFiles: files.value,
              deleteFiles: deleteFiles.value,
            },
          },
          {
            onSuccess: reset,
          }
        );
      }
    };

    const cancel = () => {
      context.emit("cancel");
    };

    return {
      files,
      pick,
      ok,
      cancel,
      content,
      me,
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
