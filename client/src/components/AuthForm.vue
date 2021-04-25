<template>
  <div class="my-5 text-red-400" v-if="error">
    Ошибка авторизации
  </div>
  <form
    class="flex flex-col items-center"
    :class="{
      disabled: loading,
    }"
    @submit.prevent="submit"
  >
    <VInput
      v-model="username"
      :validation-model="models.username"
      placeholder="Имя пользователя"
    />
    <VInput
      type="password"
      v-model="password"
      :validation-model="models.password"
      placeholder="Пароль"
    />
    <VButton
      :disabled="!valid"
      :loading="loading"
      tag="button"
      class="w-full max-w-2xl"
    >
      Вход
    </VButton>
  </form>
</template>

<script>
import VButton from '@/components/VButton.vue';
import VInput from '@/components/VInput.vue';
import { computed, ref } from 'vue';
import * as models from '@/validation/auth';
import api from '@/api';
import { useRouter } from 'vue-router';

export default {
  name: 'AuthForm',
  components: {
    VButton,
    VInput,
  },
  setup() {
    const { push } = useRouter();

    const { username: nickname } = api.getters;
    const loading = ref(false);
    const status = ref(null);
    const error = ref(false);

    const username = ref();
    const password = ref();

    const valid = computed(() => [
      username,
      password,
    ].every((v) => v.value?.isValid));

    const submit = async () => {
      loading.value = true;
      const { status: resStatus } = await api.authorize({
        strategy: 'local',
        username: username.value?.value,
        password: password.value?.value,
      });
      status.value = resStatus;
      error.value = false;
      loading.value = false;
      if (resStatus === 201) {
        push('/admin/panel');
      } else {
        error.value = true;
      }
    };

    return {
      username,
      password,
      models,
      valid,
      loading,
      status,
      error,
      nickname,
      submit,
    };
  },
};
</script>
