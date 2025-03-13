import { ref } from 'vue';
import type { Sector } from '@/types/types.ts';

export const data = ref<Sector[]>([
  {
    title: 'Что делать',
    percent: 33,
    color: '#FF6384',
  },
  {
    title: 'с длинным',
    percent: 33,
    color: '#FFCD56',
  },
  {
    title: 'заголовком и процентами?',
    percent: 34,
    color: '#4BC0C0',
  },
]);
