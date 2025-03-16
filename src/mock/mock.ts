import { ref } from 'vue';
import type { ISector } from '@/types/types.ts';

export const data = ref<ISector[]>([
  {
    title: 'Длинные заголовки?',
    percent: 33,
    color: '#FF6384',
  },
  {
    title: 'Пересчитывать проценты?',
    percent: 33,
    color: '#FFCD56',
  },
  {
    title: 'Сектор-3',
    percent: 34,
    color: '#4BC0C0',
  },
]);
