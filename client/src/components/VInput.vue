<template>
  <div class="w-full flex flex-col">
    <textarea
      @input="handleInput"
      @change="handleInput"
      v-if="type === 'textarea'"
      :placeholder="placeholder"
      :class="classBind"
    ></textarea>
    <input
      v-else
      ref="input"
      @input="handleInput"
      @change="handleInput"
      :type="type"
      :placeholder="placeholder"
      :class="classBind"
    >
    <small
      v-if="validationModel"
      class="h-7 text-red-400 text-left px-6" v-text="modelValue && modelValue.value && error"
    ></small>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import * as yup from 'yup';
import InputMask from 'inputmask';

export default {
  name: 'VInput',
  props: {
    type: {
      type: String,
      validate: (val) => ['tel', 'password', 'date', 'textarea'].includes(val),
      required: false,
    },
    mask: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    modelValue: {
      type: Object,
    },
    validationModel: {
      type: yup.StringSchema,
    },
  },
  setup(props, { emit }) {
    const input = ref(null);

    const error = ref(null);

    const handleInput = async (event) => {
      const value = props.type !== 'tel' ? event.target.value : event.target.value.replace(/[^0-9]/g, '');
      let isValid = false;
      error.value = null;
      if (!props.validationModel) {
        isValid = true;
      } else {
        try {
          await props.validationModel.validate(value);
          isValid = true;
        } catch (e) {
          error.value = e.message;
        }
      }

      emit('update:modelValue', {
        value,
        isValid,
      });
    };

    onMounted(() => {
      if (props.mask) {
        const im = new InputMask(props.mask);
        im.mask(input.value);
      }
    });
    const classBind = computed(() => ({
      'border-opacity-100': props.modelValue?.value,
      'border-white border-opacity-50 hover:border-opacity-70': !props.modelValue?.value,
      'border-green-500': !error.value && props.modelValue?.value,
      'border-red-500': error.value && props.modelValue?.value,
    }));
    return {
      handleInput,
      error,
      input,
      classBind,
    };
  },
};

// const props = defineProps({
//
// });
//
// const emit = defineEmit();
//
// const model = ref('');
// const { validationModel } = toRefs(props);
//
// const error = computed<string | undefined>(() => {
//   try {
//     if (validationModel && validationModel.value) {
//       validationModel.value.validateSync(model.value);
//     }
//   } catch (e) {
//     return e.message;
//   }
//   return undefined;
// });
//
// watch(model, () => emit('type', model.value, !error.value));
//
//
</script>

<style lang="postcss" scoped>
input, textarea {
  @apply w-full pl-6 pr-5 border-b-2 bg-white bg-opacity-5 outline-none
  focus:bg-opacity-10 focus:outline-none focus:border-opacity-90 transition-all
  duration-300;
}
input {
  @apply h-14;
}
textarea {
  @apply h-24 py-3;
}
</style>
