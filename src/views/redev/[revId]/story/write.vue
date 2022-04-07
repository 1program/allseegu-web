<template>
  <AppScaffold title="우리 구역 이야기" has-top-button>
    <form class="page-wrapper" @submit.prevent="submit">
      <div class="container page-content">
        <FormGroup class="form-group" label="제목">
          <FormInput />
        </FormGroup>
        <FormGroup label="내용">
          <FormTextarea
            placeholder="다른 사람을 비방하거나, 타인에게 불쾌감을 유발하는 부적절한 표현, 영리 목적의 광고는 삼가해주세요!"
          />
        </FormGroup>
        <FormGroup label="첨부 파일">
          <FilePicker class="picker" :files="files" @change-files="files = $event" />
        </FormGroup>
      </div>
      <div class="container page-footer">
        <AppButton full>등록하기</AppButton>
      </div>
    </form>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import AppButton from "@/components/common/AppButton.vue";
import FormGroup from "@/components/common/FormGroup.vue";
import FormInput from "@/components/common/FormInput.vue";
import FormTextarea from "@/components/common/FormTextarea.vue";
import FilePicker from "@/components/common/FilePicker.vue";
import { useAlert } from "@/composables/common/useAlert";
import { FileInfo } from "@/models/file/FileInfo";

export default defineComponent({
  name: "RedevDetailStoryWrite",
  components: { AppScaffold, AppButton, FormGroup, FormInput, FormTextarea, FilePicker },
  setup() {
    const alert = useAlert();

    const files = ref<FileInfo[]>([]);

    return {
      files,
      submit() {
        //
        alert("이야기가 등록 되었습니다.");
      },
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.picker {
  margin-top: 1rem;
}

.form-group {
  margin-bottom: (100/2/16) * 1rem;
}
</style>
