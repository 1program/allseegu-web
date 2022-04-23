<template>
  <AppScaffold title="우리 구역 이야기" has-top-button>
    <form class="page-wrapper" @submit.prevent="submit">
      <div class="container page-content">
        <Field name="title" v-slot="{ field, errorMessage }">
          <FormGroup class="form-group" label="제목" :error-text="errorMessage">
            <FormInput v-bind="field" />
          </FormGroup>
        </Field>
        <Field name="content" v-slot="{ field, errorMessage }">
          <FormGroup label="내용" :error-text="errorMessage">
            <FormTextarea
              v-bind="field"
              placeholder="다른 사람을 비방하거나, 타인에게 불쾌감을 유발하는 부적절한 표현, 영리 목적의 광고는 삼가해주세요!"
            />
          </FormGroup>
        </Field>
        <FormGroup label="첨부 파일">
          <FilePicker
            class="picker"
            :uploaded="uploaded"
            @change-uploaded="uploaded = $event"
            :files="files"
            @change-files="files = $event"
          />
        </FormGroup>
      </div>
      <div class="container page-footer">
        <AppButton full>등록하기</AppButton>
      </div>
    </form>
  </AppScaffold>
</template>

<script lang="ts">
import { Field, useForm } from "vee-validate";
import { defineComponent, ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as yup from "yup";

import AppButton from "@/components/common/AppButton.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import FilePicker from "@/components/common/FilePicker.vue";
import FormGroup from "@/components/common/FormGroup.vue";
import FormInput from "@/components/common/FormInput.vue";
import FormTextarea from "@/components/common/FormTextarea.vue";
import { useStoryCreate } from "@/composables/story/useStoryCreate";
import { useStoryDetail } from "@/composables/story/useStoryDetail";
import { useStoryUpdate } from "@/composables/story/useStoryUpdate";
import { Files } from "@/models/file";
import { diffRemovedFileIds } from "@/utils/file/diffRemovedFileIds";

export default defineComponent({
  name: "RedevDetailStoryForm",
  components: { Field, AppScaffold, AppButton, FormGroup, FormInput, FormTextarea, FilePicker },
  setup() {
    const router = useRouter();

    const route = useRoute();

    const redev_id = computed(() => parseInt(route.params.redev_id as string, 10));

    const story_id = computed(() => parseInt(route.params.story_id as string, 10) || null);

    const detail = useStoryDetail(
      computed(() =>
        story_id.value != null ? { redev_id: redev_id.value, story_id: story_id.value } : null
      )
    );

    const uploaded = ref<Files>();

    const files = ref<File[]>([]);

    const { handleSubmit, resetForm } = useForm({
      validateOnMount: false,
      validationSchema: yup.object({
        title: yup.string().required("제목을 입력해 주세요.").default(""),
        content: yup.string().required("내용을 입력해 주세요.").default(""),
      }),
      initialValues: computed(() => ({
        title: detail.data?.title ?? "",
        content: detail.data?.content ?? "",
      })),
    });

    // 상세가 바뀌면 폼을 리셋한다.
    watch(
      () => detail.data,
      () => {
        resetForm();
        uploaded.value = detail.data?.files;
      },
      { immediate: true }
    );

    const storyCreate = useStoryCreate();

    const storyUpdate = useStoryUpdate();

    const submit = handleSubmit((values) => {
      if (story_id.value == null) {
        storyCreate.mutate(
          {
            redev_id: redev_id.value,
            data: {
              ...values,
              uploadFiles: files.value,
              deleteFiles: [],
            },
          },
          {
            onSuccess: (result) => {
              // 작성된 글로 redirect (replace)
              router.replace(`/redev/${redev_id.value}/story/${result.data.id}`);
            },
          }
        );
      } else {
        storyUpdate.mutate(
          {
            redev_id: redev_id.value,
            story_id: story_id.value,
            data: {
              ...values,
              uploadFiles: files.value,
              // 댓글 데이터 및 변경된 데이터를 비교하여 삭제된 파일 아이디를 찾아낸다.
              deleteFiles:
                detail.data?.files != null && uploaded.value != null
                  ? diffRemovedFileIds(detail.data.files, uploaded.value)
                  : [],
            },
          },
          {
            onSuccess: (result) => {
              router.push(`/redev/${redev_id.value}/story/${result.data.id}`);
            },
          }
        );
      }
    });

    return {
      uploaded,
      files,
      submit,
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
