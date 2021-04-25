<template>
  <select class="
    w-full h-12 pl-6 pr-5 border-b-2 bg-white bg-opacity-5 outline-none
    focus:bg-opacity-10 focus:outline-none focus:border-opacity-90 transition-all
    duration-300
  " @input="handleInput">
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >{{ option.display || option.value }}</option>
  </select>
</template>

<script>
export default {
  name: 'VSelect',
  props: {
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const handleInput = (e) => emit('update:modelValue', e.target.value);
    return { handleInput };
  },
};
</script>
