<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ISector } from '@/types/types.ts';
import PopupComponent from '@/components/PopupComponent.vue';
import SectorList from '@/components/SectorList.vue';
import ButtonAdd from '@/components/BaseButton.vue';
import DiagramItem from '@/components/DiagramItem.vue';
import CaptionList from '@/components/CaptionList.vue';
import { data } from '@/mock/mock.ts';

const isOpen = ref(false);
const currentSector = ref<ISector | null>(null);
const currentSelectedIndex = ref<number | null>(null);

const handleClose = () => {
  currentSector.value = null;
  currentSelectedIndex.value = null;
  isOpen.value = false;
};

const handleOpen = (sector?: ISector, index?: number) => {
  if (sector && index) {
    currentSector.value = sector;
    currentSelectedIndex.value = index;
  }
  isOpen.value = true;
};

const handleSaveSector = (sector: ISector & { isEdit: boolean }) => {
  if (!sector.percent) sector.percent = 0;
  if (!sector.title) sector.title = 'Сектор без названия';
  if (sector.isEdit && currentSelectedIndex.value !== null) {
    data.value[currentSelectedIndex.value] = {
      title: sector.title,
      percent: sector.percent,
      color: sector.color,
    };
  } else {
    data.value.push(sector);
  }
  handleClose();
};

const handleDeleteSector = (index: number) => {
  data.value = data.value.filter((_, i) => i !== index);
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
        <SectorList :data="data" @deleteSector="handleDeleteSector" @editSector="handleOpen" />
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
      :isOpen="isOpen"
      v-if="isOpen"
      :handle-close-modal="handleClose"
      @save="handleSaveSector"
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

  @media screen and (max-width: 1279px) {
    align-items: center;
  }
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
    padding-right: 0;
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
