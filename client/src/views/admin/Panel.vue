<template>
  <AdminHeader />
  <div class="text-center flex flex-col items-center">
    <h2>Добро пожаловать, <span class="text-green-500">{{ username }}</span>!</h2>
    <p class="mb-5">Нажмите на нужное обращение, чтобы увидеть текст</p>
    <AppealsTable />
  </div>
</template>

<script>
import api from '@/api';
import AppealsTable from '@/components/AppealsTable.vue';
import AdminHeader from '@/components/AdminHeader.vue';

export default {
  name: 'Panel',
  components: { AdminHeader, AppealsTable },
  setup() {
    const { username } = api.getters;
    return {
      username,
    };
  },
};
</script>
