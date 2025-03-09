import { createRouter, createWebHistory } from 'vue-router';
import ProgressBarView from '../views/ProgressBarView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bar',
      component: ProgressBarView,
    },
    {
      path: '/diagram',
      name: 'diagram',
      component: () => import('../views/DiagramView.vue'),
    },
  ],
});

export default router;
