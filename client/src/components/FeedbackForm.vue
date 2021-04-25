<template>
  <div class="my-5 text-red-400" v-if="error">
    Произошла ошибка при выполнении запроса. Возможно, севрер недоступен.
  </div>
  <form
    v-if="status !== 201"
    class="flex flex-col items-center"
    :class="{
      disabled: loading,
    }"
    @submit.prevent="submit"
  >
    <h2>Оставьте заявку</h2>
    <p class="mb-10">и мы обязательно вам ответим</p>
    <VInput :validation-model="models.lastName" v-model="lastName" placeholder="Фамилия" />
    <VInput :validation-model="models.firstName" v-model="firstName" placeholder="Имя" />
    <VInput :validation-model="models.patronymic" v-model="patronymic" placeholder="Отчество" />
    <VInput
      :validation-model="models.phoneNumber"
      type="tel"
      v-model="phoneNumber"
      placeholder="Телефон"
      mask="+9 (999) 999-99-99"
    />
    <VInput
      :validation-model="models.message"
      type="textarea"
      v-model="message"
      placeholder="Сообщение"
    />
    <VButton
      :disabled="!valid"
      :loading="loading"
      tag="button"
      class="w-full max-w-2xl"
    >
      Отправить
    </VButton>
  </form>
  <div v-else>
    <h2>Ваш запрос успешно отправлен!</h2>
    <p>Ожидайте ответа!</p>
  </div>
</template>

<script>
import VButton from '@/components/VButton.vue';
import VInput from '@/components/VInput.vue';
import { computed, ref } from 'vue';
import * as models from '@/validation/appeals';
import api from '@/api';

export default {
  components: {
    VButton,
    VInput,
  },
  setup() {
    const loading = ref(false);
    const status = ref(null);
    const error = ref(null);

    const firstName = ref();
    const lastName = ref();
    const patronymic = ref();
    const phoneNumber = ref();
    const message = ref();

    const valid = computed(() => [
      firstName,
      lastName,
      patronymic,
      phoneNumber,
      message,
    ].every((v) => v.value?.isValid));

    const submit = async () => {
      loading.value = true;
      try {
        const { status: resStatus } = await api.sendFeedback({
          firstName: firstName.value?.value,
          lastName: lastName.value?.value,
          patronymic: patronymic.value?.value,
          phoneNumber: phoneNumber.value?.value,
          message: message.value?.value,
        });
        status.value = resStatus;
        error.value = null;
      } catch (e) {
        error.value = e;
      } finally {
        loading.value = false;
      }
    };

    return {
      firstName,
      lastName,
      patronymic,
      phoneNumber,
      message,
      models,
      valid,
      submit,
      loading,
      status,
      error,
    };
  },
};
</script>
