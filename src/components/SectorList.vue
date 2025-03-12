<script setup lang="ts">
import SectorItemComponent from '@/components/SectorItem.vue';
import type { Sector } from '@/types/types.ts';

const props = defineProps<{
  data: Sector[];
}>();
const emit = defineEmits(['editSector', 'deleteSector']);

const handleEdit = (sector: Sector) => {
  emit('editSector', sector);
};

const handleDelete = (title: string) => {
  emit('deleteSector', title);
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
