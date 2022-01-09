<template>
  <div :class="['form-group', !!error && 'has-error']">
    <label class="text-sm font-semibold text-gray-500" for="email">{{
      label
    }}</label>
    <input
      :id="name"
      :name="name"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
      class="w-full border text-xs px-2 h-8 rounded"
      @blur="$emit('validate')"
      @keypress="$emit('validate')"
    />
    <p class="text-xs text-red-500" v-if="!!error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "form-input",
  props: {
    type: { required: true },
    label: { required: true },
    name: { required: true },
    value: { required: true },
    error: { required: true },
  },
};
</script>
