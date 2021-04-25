<script>
import { h } from 'vue';
import VLoader from '@/components/VLoader.vue';

export default {
  name: 'VButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'div',
    },
    variant: {
      type: String,
      default: 'light',
      validator: (v) => ['light', 'green', 'concave'].includes(v),
    },
  },
  setup(props, { slots }) {
    // Using render function approach here to get rid of code duplication
    // because VButton can be either a <button> or a <div>
    return () => h(
      props.tag,
      {
        class: [
          `cursor-pointer flex items-center h-16
          justify-center border-2 border-gray-400 text-gray-400
          hover:border-white hover:text-white transition-all duration-300 select-none
          outline-none focus:outline-none`,
          {
            disabled: props.disabled,
          },
        ],
      },
      // eslint-disable-next-line no-nested-ternary
      // slots.default ? slots.default() : props.loading ? h(VLoader) : [],
      props.loading ? h(VLoader) : slots.default && slots.default(),
    );
  },
};
</script>
