<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'vue-chartjs';
import { options } from '../utils/chartConfig.ts';
import type { Chart } from '@/types/types.ts';

ChartJS.register(ArcElement, Tooltip);

const props = defineProps<{
  data: Chart;
}>();
</script>

<template>
  <Pie class="diagram" :data="data" :options="options" />
</template>

<style scoped>
.diagram {
  max-width: 500px;
  width: 100%;
}
</style>
