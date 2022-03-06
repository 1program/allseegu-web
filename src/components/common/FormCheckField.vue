<template>
  <div class="form-group">
    <label class="button">
      <input type="checkbox" :checked="checked" @change="handleCheck" :aria-label="label" />
      <div class="knob"><check-icon /></div>
      <div v-if="label != null" class="label">{{ label }}</div>
    </label>
    <div class="content"><slot /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CheckIcon from "../icons/CheckIcon.vue";

export default defineComponent({
  components: { CheckIcon },
  name: "FormCheckField",
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
@import "@/styles/variables";

.form-group {
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
  border: 1px solid #dddddd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: transparent;
  font-size: 1.25em;
  transition: background-color 0.15s ease, color 0.15s ease;
}

input:checked + .knob {
  background-color: $color-blue;
  border-color: transparent;
  color: $color-white;
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
  color: #777777;
}
</style>
