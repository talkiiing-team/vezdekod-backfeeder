<template>
  <div class="max-w-3xl">
    <h3
      class="cursor-pointer text-gray-200 hover:text-white transition-colors duration-200"
      @click="expandFilters"
    >
      Фильтры ({{ filtersExpanded ? '-' : '+' }})
    </h3>
    <form v-show="filtersExpanded" class="flex flex-col" @submit.prevent="reload">
      <div class="flex flex-col md:flex-row items-center mb-4">
        от
        <VInput class="mx-2" v-model="from" placeholder="from" type="date" />
        до
        <VInput class="ml-2" v-model="to" type="date" />
      </div>
      <div class="grid grid-flow-row gap-y-4">
        <VSelect v-model="statusFilter" :options="options" />
        <VInput
          v-model="phoneNumber"
          mask="+9 (999) 999-99-99"
          type="tel"
          placeholder="Номер телефона"
        />
        <VInput
          v-model="idFilter"
          placeholder="ID Обращения"
        />
      </div>
      <div class="flex flex-col md:flex-row items-center my-4">
        <div class="flex-shrink-0">Отображать по</div>
        <VSelect v-model="limitFilter" :options="limitOptions" class="w-16 ml-2" />
      </div>
      <VButton tag="button" class="w-full max-w-xl px-3 my-6">Перезагрузить</VButton>
    </form>
  </div>

  <div class="divide-y divide-white w-full">
    <div class="hidden md:grid grid-cols-appeals font-bold text-gray-500 mb-2">
      <div>ID</div>
      <div>Дата</div>
      <div>ФИО</div>
      <div>Телефон</div>
      <div>Статус</div>
      <div>Закрыто</div>
    </div>
    <div
      v-for="appeal in appeals"
      :key="appeal._id"
    >
      <div
        @click="reveal(appeal._id)"
        class="
          flex flex-col justify-center items-center md:grid grid-cols-appeals
          cursor-pointer text-gray-200 hover:text-white transition-colors duration-200
        "
      >
        <div class="grid grid-flow-col gap-x-2">
          <div class="md:hidden text-gray-600">ID</div>
          {{ appeal.altId }}
        </div>
        <div class="grid grid-flow-col gap-x-2">
          <div class="md:hidden text-gray-600">Дата</div>
          {{ formatDate(appeal.createdAt) }}
        </div>
        <div class="grid grid-flow-col gap-x-2">
          <div class="md:hidden text-gray-600">ФИО</div>
          {{ appeal.lastName }} {{ appeal.firstName }} {{ appeal.patronymic }}</div>
        <div class="grid grid-flow-col gap-x-2">
          <div class="md:hidden text-gray-600">Телефон</div>
          +{{ appeal.phoneNumber }}
        </div>
        <div class="grid grid-flow-col gap-x-2">
          <div class="md:hidden text-gray-600">Статус</div>
          {{ formatStatus(appeal.status) }}
        </div>
        <div class="grid grid-flow-col gap-x-2" v-if="appeal.closedAt">
          <div class="md:hidden text-gray-600">Закрыто</div>
          {{ formatDate(appeal.closedAt) }}
        </div>
      </div>
      <div v-if="revealed === appeal._id" class="flex flex-col items-center">
        <p class="mt-5">{{ appeal.message }}</p>
        <p class="mt-5" v-if="appeal.answer">
          <span class="text-gray-500 mr-3">Ваш ответ:</span>
          {{ appeal.answer }}
        </p>
        <form
          class="w-full max-w-2xl flex flex-col items-center mt-5"
          @submit.prevent="close(appeal._id)"
          v-if="appeal.status !== 'closed'"
        >
          <VInput
            v-model="answer"
            class="w-full"
            type="textarea"
            placeholder="Ваш ответ"
            :validation-model="messageModel"
          />
          <VButton
            @click="close(appeal._id)"
            class="max-w-md w-full max-h-10 my-4"
          >
            Завершить
          </VButton>
        </form>

      </div>
    </div>
    <div class="w-full flex justify-center mb-24">
      <div
        v-for="a in totalPages"
        :key="a"
        @click="loadPage(a)"
        class="mx-2 cursor-pointer text-gray-300 hover:text-white transition-colors duration-200"
        :class="{
          'text-green-500': page === a - 1,
        }"
      >
        {{ a }}
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { computed, ref } from 'vue';
import { DateTime } from 'luxon';
import VInput from '@/components/VInput.vue';
import VButton from '@/components/VButton.vue';
import VSelect from '@/components/VSelect.vue';
import { message as messageModel } from '@/validation/appeals';

export default {
  name: 'AppealsTable',
  components: { VSelect, VButton, VInput },
  setup() {
    const from = ref();
    const to = ref();
    const statusFilter = ref();
    const phoneNumber = ref();
    const idFilter = ref();
    const limitFilter = ref(10);
    const page = ref(0);

    const answer = ref();

    const { appeals, total, limit } = api.getters;

    const totalPages = computed(() => Math.ceil(total.value / limit.value));

    api.loadAppeals();

    const revealed = ref(null);
    const reveal = (id) => {
      if (answer.value) {
        answer.value.value = '';
      }
      if (revealed.value === id) {
        revealed.value = null;
      } else {
        revealed.value = id;
      }
    };

    const formatDate = (iso) => DateTime.fromISO(iso).toFormat('dd.MM.yyyy');
    const formatStatus = (status) => ({
      closed: 'Закрыто',
      opened: 'Открыто',
    }[status]);

    const options = [{
      value: undefined,
      display: 'Все',
    }, {
      value: 'closed',
      display: 'Закрытые',
    }, {
      value: 'opened',
      display: 'Открытые',
    }];

    const limitOptions = [{
      value: 10,
    }, {
      value: 20,
    }, {
      value: 50,
    }];

    const close = () => api.closeAppeal(revealed.value, answer.value?.value);

    const filtersExpanded = ref(false);

    const expandFilters = () => { filtersExpanded.value = !filtersExpanded.value; };

    const reload = () => {
      api.loadAppeals({
        from: from.value?.value,
        to: to.value?.value,
        status: statusFilter.value,
        phoneNumber: phoneNumber.value?.value,
        id: idFilter.value?.value,
        limit: limitFilter.value,
        skip: page.value * limitFilter.value,
      });
      filtersExpanded.value = false;
    };

    const loadPage = (p) => {
      console.log(p);
      page.value = p - 1;
      reload();
    };

    return {
      appeals,
      revealed,
      reveal,
      formatDate,
      from,
      to,
      reload,
      formatStatus,
      close,
      statusFilter,
      options,
      phoneNumber,
      idFilter,
      answer,
      messageModel,
      limitFilter,
      limitOptions,
      totalPages,
      loadPage,
      page,
      expandFilters,
      filtersExpanded,
    };
  },
};
</script>
