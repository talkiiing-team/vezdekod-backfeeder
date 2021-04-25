<template>
  <form class="flex flex-col items-center" @submit.prevent="reload">
    <div class="flex flex-col md:flex-row items-center mb-4">
      от
      <VInput class="mx-2" v-model="from" placeholder="from" type="date" />
      до
      <VInput class="ml-2" v-model="to" type="date" />
    </div>
    <VButton tag="button" class="w-full max-w-xl px-3 my-6">Перезагрузить</VButton>
  </form>
  <canvas ref="chartRef"></canvas>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import Chart from 'chart.js';
import VInput from '@/components/VInput.vue';
import VButton from '@/components/VButton.vue';
import api from '@/api';

export default {
  name: 'StatCharts',
  components: {
    VButton,
    VInput,
  },
  setup() {
    const from = ref();
    const to = ref();

    const { statTotal, statOpened, statClosed } = api.getters;
    api.loadStats();

    const chartRef = ref();

    let currentChart;

    const createChart = () => {
      // eslint-disable-next-line no-unused-expressions
      currentChart && currentChart.destroy();
      const dataset = [statTotal.value, statClosed.value, statOpened.value];
      const labels = ['Всего', 'Закрыто', 'Открыто'];
      const label = 'Обращения';
      currentChart = new Chart(chartRef.value, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label,
              data: dataset,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'white',
            },
          ],
        },
        options: {
          aspectRatio: 16 / 9,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
          },
        },
      });
    };

    onMounted(() => {
      createChart();
    });

    const reload = () => {
      api.loadStats({
        from: from.value?.value,
        to: to.value?.value,
      });
    };

    watch([statTotal, statOpened, statClosed], () => {
      createChart();
    });

    return {
      chartRef, to, from, reload,
    };
  },
};
</script>
