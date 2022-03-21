<template>
  <AppScaffold title="우리 구역 이야기">
    <form class="page-wrapper" @submit.prevent="submit">
      <div class="container page-content">
        <FormGroup label="제목">
          <FormInput />
        </FormGroup>
        <FormGroup label="내용">
          <FormTextarea
            placeholder="다른 사람을 비방하거나, 타인에게 불쾌감을 유발하는 부적절한 표현, 영리 목적의 광고는 삼가해주세요!"
          />
        </FormGroup>
        <FormGroup label="첨부 파일">
          <ImagePicker class="picker" />
        </FormGroup>
      </div>
      <div class="container page-footer">
        <AppButton full>등록하기</AppButton>
      </div>
    </form>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import AppButton from "@/components/common/AppButton.vue";
import FormGroup from "@/components/common/FormGroup.vue";
import FormInput from "@/components/common/FormInput.vue";
import FormTextarea from "@/components/common/FormTextarea.vue";
import ImagePicker from "@/components/common/ImagePicker.vue";

export default defineComponent({
  name: "RedevDetailStoryWrite",
  components: { AppScaffold, AppButton, FormGroup, FormInput, FormTextarea, ImagePicker },
  setup() {
    return {
      submit() {
        //
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
</style>
