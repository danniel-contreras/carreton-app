<template>
  <div
    class="flex flex-col"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
  >
    <label class="text-xs font-mono text-gray-500 font-semibold" :for="name">{{
      label
    }}</label>
    <input
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      class="border bg-transparent rounded px-2 text-xs py-1"
    />

    <p class="text-red-500 text-xs" v-show="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import { useField } from "vee-validate";

export default {
  props: {
    model: {
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    successMessage: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // we don't provide any rules here because we are using form-level validation
    // https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(props.name, undefined, {
      initialValue: props.value,
    });

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    };
  },
};
</script>
