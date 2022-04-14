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
          <FilePicker class="picker" :files="uploadFiles" @change-files="uploadFiles = $event" />
        </FormGroup>
      </div>
      <div class="container page-footer">
        <AppButton full>등록하기</AppButton>
      </div>
    </form>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Field, useForm } from "vee-validate";
import * as yup from "yup";

import AppScaffold from "@/components/common/AppScaffold.vue";
import AppButton from "@/components/common/AppButton.vue";
import FormGroup from "@/components/common/FormGroup.vue";
import FormInput from "@/components/common/FormInput.vue";
import FormTextarea from "@/components/common/FormTextarea.vue";
import FilePicker from "@/components/common/FilePicker.vue";
import { useStoryCreate } from "@/composables/story/useStoryCreate";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "RedevDetailStoryWrite",
  components: { Field, AppScaffold, AppButton, FormGroup, FormInput, FormTextarea, FilePicker },
  setup() {
    const router = useRouter();

    const route = useRoute();

    const redev_id = computed(() => parseInt(route.params.redev_id as string, 10));

    const uploadFiles = ref<File[]>([]);

    const { handleSubmit } = useForm({
      validateOnMount: false,
      validationSchema: yup.object({
        title: yup.string().required("제목을 입력해 주세요.").default(""),
        content: yup.string().required("내용을 입력해 주세요.").default(""),
      }),
    });

    const storyCreate = useStoryCreate();

    const submit = handleSubmit((values) => {
      storyCreate.mutate(
        {
          redev_id: redev_id.value,
          data: {
            ...values,
            uploadFiles: uploadFiles.value,
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
    });

    return {
      uploadFiles,
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
