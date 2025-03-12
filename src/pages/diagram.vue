<script setup lang="ts">
import { computed, ref } from 'vue';
import PopupComponent from '@/components/PopupComponent.vue';
import SectorList from '@/components/SectorList.vue';
import ButtonAdd from '@/components/BaseButton.vue';
import type { Sector } from '@/types/types.ts';
import DiagramItem from '@/components/DiagramItem.vue';
import CaptionList from '@/components/CaptionList.vue';

const show = ref(false);
const currentSector = ref<Sector | null>(null);

const data = ref<Sector[]>([
  {
    title: 'Сектор-1',
    percent: 25,
    color: '#FF6384',
  },
  {
    title: 'Сектор-2',
    percent: 25,
    color: '#FFCD56',
  },
  {
    title: 'Сектор-3',
    percent: 25,
    color: '#4BC0C0',
  },
]);

const handleClose = () => {
  currentSector.value = null;
  show.value = false;
};

const handleOpen = () => {
  show.value = true;
};

const handleAddNewSector = (sector: Sector) => {
  if (!sector.percent) sector.percent = 0;
  if (!sector.title) sector.title = 'Сектор без названия';
  data.value.push(sector);
  handleClose();
};

const handleDeleteSector = (title: string) => {
  const index = data.value.findIndex((sector) => sector.title === title);
  if (index !== -1) {
    data.value.splice(index, 1);
  }
};

const handleEditSector = (sector: Sector) => {
  currentSector.value = sector;
  handleOpen();
};

const chartData = computed(() => {
  return {
    labels: data.value.map((item) => item.title),
    datasets: [
      {
        backgroundColor: data.value.map((item) => item.color),
        data: data.value.map((item) => item.percent),
      },
    ],
  };
});
</script>

<template>
  <section class="diagram-page">
    <h1 class="diagram-page__title">Круговая диаграмма</h1>
    <div class="diagram-page__content">
      <div class="diagram-page__forms">
        <SectorList
          :data="data"
          @deleteSector="handleDeleteSector"
          @editSector="handleEditSector"
        />
        <ButtonAdd @click="handleOpen" :title="'Добавить сектор'" />
      </div>
      <div class="diagram-page__circle-block">
        <div class="diagram-page__circle">
          <DiagramItem :data="chartData" />
        </div>
        <CaptionList :captions="data" />
      </div>
    </div>
    <PopupComponent
      :title="currentSector?.title"
      :percent="currentSector?.percent"
      :color="currentSector?.color"
      :show="show"
      v-if="show"
      :handle-close-modal="handleClose"
      @add="handleAddNewSector"
    />
  </section>
</template>

<style scoped>
.diagram-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100vh;
  max-width: 1170px;
}

.diagram-page__title {
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 32px;
  line-height: 100%;
  color: #252f4a;
  padding: 30px 10px 32px;
  border-bottom: 1px solid #dbdfe9;
  margin-bottom: 40px;
}

.diagram-page__content {
  display: flex;
  justify-content: space-between;
  padding-right: 40px;

  @media screen and (max-width: 1279px) {
    flex-direction: column;
    gap: 30px;
  }
}

.diagram-page__forms {
  max-width: 541px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.diagram-page__circle-block {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 500px;
  width: 100%;
  align-items: center;
}

.diagram-page__circle {
  max-width: 500px;
  min-width: 200px;
  width: 100%;
}
</style>
