<template>
  <div class="form-check">
    <label class="button">
      <input type="checkbox" :checked="checked" @change="handleCheck" :aria-label="label" />
      <div class="knob">
        <img src="@/images/icons/check.svg" alt="체크" />
      </div>
      <div v-if="label != null" class="label">{{ label }}</div>
    </label>
    <div class="content"><slot /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormCheck",
  props: {
    checked: {
      type: Boolean,
      default: null,
      description: "체크 되었는가?",
    },
    label: {
      type: String,
      default: null,
      description: "필드의 label",
    },
  },
  setup(props, context) {
    return {
      handleCheck: () => context.emit("update:checked", !props.checked),
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.form-check {
  margin-bottom: 1.5rem;
}

.button {
  display: block;
  background-color: transparent;
  display: flex;
  align-items: flex-start;
}

.knob {
  width: 1.625rem;
  height: 1.625rem;
  border-radius: 1.625rem;
  border: 1px solid $color-light;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25em;
  background-color: $color-white;
  transition: background-color 0.15s ease;

  img {
    user-select: none;
    width: (28/2/16) * 1rem;
  }
}

input:checked + .knob {
  background-color: $color-blue;
  border-color: transparent;
}

input {
  display: none;
}

.label {
  font-size: 1.0625rem;
  margin-top: 0.1rem;
  margin-left: 0.5rem;
  line-height: 1.15;
}

.content {
  padding-left: 2.2rem;
  margin-top: 0.5rem;
  line-height: 1.5;
  color: $color-gray;
}
</style>
