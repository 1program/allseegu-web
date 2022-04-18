<template>
  <AppScaffold title="1:1문의">
    <form class="page-wrapper" @submit.prevent="submit">
      <div class="container page-content-medium">
        <FormGroup label="유형 선택" class="form-group">
          <OptionButtonGroup class="option-button-group">
            <OptionButton
              :active="inquiryType === 'NORMAL'"
              @click="inquiryType = 'NORMAL'"
              label-center
            >
              일반 문의
            </OptionButton>
            <OptionButton
              :active="inquiryType === 'ESTATE'"
              @click="inquiryType = 'ESTATE'"
              label-center
            >
              부동산 문의
            </OptionButton>
            <OptionButton
              :active="inquiryType === 'ADVERTISE'"
              @click="inquiryType = 'ADVERTISE'"
              label-center
            >
              광고 및 제휴 문의
            </OptionButton>
            <OptionButton
              :active="inquiryType === 'REST'"
              @click="inquiryType = 'REST'"
              label-center
            >
              기타 문의
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
import { defineComponent, ref } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import FormGroup from "@/components/common/FormGroup.vue";
import OptionButtonGroup from "@/components/common/OptionButtonGroup.vue";
import OptionButton from "@/components/common/OptionButton.vue";
import FormTextarea from "@/components/common/FormTextarea.vue";
import FilePicker from "@/components/common/FilePicker.vue";
import AppButton from "@/components/common/AppButton.vue";
import { useAlert } from "@/composables/common/useAlert";
import { Field, useForm } from "vee-validate";
import * as yup from "yup";

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

    return { inquiryType, submit, files };
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
