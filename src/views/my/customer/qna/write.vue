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
import * as yup from "yup";

import AppButton from "@/components/common/AppButton.vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import FilePicker from "@/components/common/FilePicker.vue";
import FormGroup from "@/components/common/FormGroup.vue";
import FormTextarea from "@/components/common/FormTextarea.vue";
import OptionButton from "@/components/common/OptionButton.vue";
import OptionButtonGroup from "@/components/common/OptionButtonGroup.vue";
import SkeletonBox from "@/components/common/SkeletonBox.vue";
import { useAlert } from "@/composables/common/useAlert";
import { useQnaTypes } from "@/composables/qna/useQnaTypes";

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
  },
  setup() {
    const alert = useAlert();

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        content: yup.string().required("문의 내용을 입력해 주세요."),
      }),
    });

    const inquiryType = ref("NORMAL");

    const submit = handleSubmit(() => alert("문의가 등록 되었습니다."));

    const files = ref([]);

    const types = useQnaTypes();

    const type_id = ref<number>();

    watchEffect(() => {
      type_id.value = types.data?.[0].id;
    });

    return { inquiryType, submit, files, types, type_id };
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
