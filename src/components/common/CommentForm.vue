<template>
  <div class="comment-form">
    <div class="header">
      <div class="title">서쪽바다</div>
      <div class="count">1/3000</div>
    </div>
    <!-- eslint-disable-next-line -->
    <textarea class="textarea" placeholder="댓글을 남겨보세요" />
    <ImagePicker />
    <div class="gap-horizontal button-group">
      <AppButton class="plus" palette="outlined-blue">+</AppButton>
      <AppButton class="grow" palette="outlined-blue" v-if="showCancel">{{
        cancelLabel
      }}</AppButton>
      <AppButton class="grow">{{ okLabel }}</AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "./AppButton.vue";
import ImagePicker from "./ImagePicker.vue";

export default defineComponent({
  name: "CommentForm",
  components: { AppButton, ImagePicker },
  props: {
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

  .grow {
    flex: 1 1 auto;
  }
}
</style>
