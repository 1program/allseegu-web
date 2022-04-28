<template>
  <AppScaffold title="1:1문의">
    <form class="page-wrapper" @submit.prevent="submit">
      <div class="container page-content-medium">
        <FormGroup label="유형 선택" class="form-group">
          <OptionButtonGroup class="option-button-group">
            <template v-if="types.isLoading == true">
              <OptionButton v-for="index of 4" :key="index" :active="index === 1" label-center>
                <SkeletonBox />
              </OptionButton>
            </template>
            <OptionButton
              v-else
              v-for="type in types.data"
              :key="type.id"
              :active="type_id == type.id"
              @click="type_id = type.id"
              label-center
            >
              {{ type.title }}
            </OptionButton>
          </OptionButtonGroup>
        </FormGroup>
        <Field name="title" v-slot="{ field, errorMessage }">
          <FormGroup class="form-group" label="제목" :error-text="errorMessage">
            <FormInput v-bind="field" />
          </FormGroup>
        </Field>
        <field name="content" v-slot="{ field, errorMessage }">
          <FormGroup label="문의 내용" :error-text="errorMessage">
            <FormTextarea
              v-bind="field"
              placeholder="자세히 설명해 주실수록 더 정확하고 빠른 답변을 받아 보실 수 있게 됩니다."
            />
          </FormGroup>
        </field>
        <FormGroup label="첨부 파일">
          <FilePicker
            class="image-picker"
            accept="*"
            :files="files"
            @change-files="files = $event"
          />
          <div class="description">
            문제를 발견했거나 참고가 될만한 자료를 첨부하시면 더 정확하고 빠른 답변을 받아 보실 수
            있게 됩니다.
          </div>
        </FormGroup>
        <AppButton full>문의하기</AppButton>
      </div>
    </form>
  </AppScaffold>
</template>

<script lang="ts">
import { Field, useForm } from "vee-validate";
import { defineComponent, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";

import AppButton from "@/components/common/AppButton.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import FilePicker from "@/components/common/FilePicker.vue";
import FormGroup from "@/components/common/FormGroup.vue";
import FormInput from "@/components/common/FormInput.vue";
import FormTextarea from "@/components/common/FormTextarea.vue";
import OptionButton from "@/components/common/OptionButton.vue";
import OptionButtonGroup from "@/components/common/OptionButtonGroup.vue";
import SkeletonBox from "@/components/common/SkeletonBox.vue";
import { useAlert } from "@/composables/common/useAlert";
import { useQnaCreate } from "@/composables/qna/useQnaCreate";
import { useQnaTypes } from "@/composables/qna/useQnaTypes";
import { ContentType } from "@/models/common";

export default defineComponent({
  name: "MyCustomerWriteInquiry",
  components: {
    AppScaffold,
    FormGroup,
    OptionButtonGroup,
    OptionButton,
    FormTextarea,
    FilePicker,
    Field,
    AppButton,
    SkeletonBox,
    FormInput,
  },
  setup() {
    const router = useRouter();

    const alert = useAlert();

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        title: yup.string().default("").required("제목을 입력해 주세요."),
        content: yup.string().default("").required("문의 내용을 입력해 주세요."),
      }),
    });

    const types = useQnaTypes();

    const type_id = ref<number>();

    const files = ref([]);

    const create = useQnaCreate();

    const submit = handleSubmit((values) => {
      if (type_id.value == null) return alert("문의 유형을 선택해 주세요.");

      return create.mutate(
        {
          input: {
            ...values,
            is_visible: 1,
            qna_type_id: type_id.value,
            content_type: ContentType.PLAIN,
            uploadFiles: files.value,
            deleteFiles: [],
          },
        },
        {
          onSuccess: () => router.back(),
        }
      );
    });

    // 문의하기 타입 데이터가 로드되면 그 중 첫번째를 선택한다.
    watchEffect(() => {
      type_id.value = types.data?.[0].id;
    });

    return { submit, files, types, type_id };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.option-button-group {
  margin-top: (30/2/16) * 1rem;
}

.form-group {
  margin-bottom: (95/2/16) * 1rem;
}

.image-picker {
  margin-top: (20/2/16) * 1rem;
}

.description {
  color: $color-gray;
  font-size: (26/2/16) * 1rem;
  margin-top: (26/2/16) * 1rem;
}
</style>
