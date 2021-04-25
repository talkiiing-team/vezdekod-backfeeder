import { ref } from 'vue';

const useForceReload = () => {
  const key = ref(0);
  const forceReload = () => {
    key.value += 1;
  };
  return {
    key,
    forceReload,
  };
};

export default useForceReload;
