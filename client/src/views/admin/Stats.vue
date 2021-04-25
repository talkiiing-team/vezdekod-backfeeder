<template>
  <AdminHeader />
  <div class="text-center">
    <h2>Статистика обращений</h2>
    <StatCharts />
  </div>
</template>

<script>
import StatCharts from '@/components/StatCharts.vue';
import AdminHeader from '@/components/AdminHeader.vue';

export default {
  name: 'Stats',
  components: { AdminHeader, StatCharts },
};
</script>
