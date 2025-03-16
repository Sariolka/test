<script setup lang="ts">
import SectorItemComponent from '@/components/SectorItem.vue';
import type { ISector } from '@/types/types.ts';

const props = defineProps<{
  data: ISector[];
}>();

const emit = defineEmits(['editSector', 'deleteSector']);

const handleEdit = (sector: ISector, index: number) => {
  console.log(sector, index);
  emit('editSector', sector, index);
};

const handleDelete = (index: number) => {
  emit('deleteSector', index);
};
</script>

<template>
  <ul class="sector-list">
    <SectorItemComponent
      @edit="handleEdit"
      @delete="handleDelete"
      v-for="(item, index) in data"
      :key="index"
      :sector="item"
      :index="index"
    />
  </ul>
</template>

<style scoped>
.sector-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-left: 0;
}
</style>
