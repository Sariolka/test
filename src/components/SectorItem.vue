<script setup lang="ts">
import type { Sector } from '@/types/types.ts';

const props = defineProps<{
  sector: Sector;
}>();
//что делать с длинными названиями?
</script>

<template>
  <li class="sector">
    <div class="sector__left-side">
      <div class="sector__title">{{ sector.title }}</div>
      <hr class="sector__line" />
      <div class="sector__percent">{{ sector.percent }}%</div>
      <hr class="sector__line" />
      <div class="sector__color" :style="{ backgroundColor: sector.color }"></div>
    </div>
    <div class="sector__controls">
      <button
        class="sector__btn sector__btn_type-edit"
        @click="$emit('edit', sector)"
        aria-label="Изменить сектор"
      ></button>
      <button
        class="sector__btn sector__btn_type-delete"
        @click="$emit('delete', sector.title)"
        aria-label="Удалить сектор"
      ></button>
    </div>
  </li>
</template>

<style scoped>
.sector {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-radius: 10px;
  gap: 10px;
  background-color: rgba(219, 223, 233, 0.2);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #252f4a;
}

.sector__title {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  width: 125.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 5px;
}

.sector__percent {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  width: 80.9px;
  align-items: center;
  justify-content: center;
}

.sector__left-side {
  display: flex;
  align-items: center;
}

.sector__line {
  height: 16px;
  width: 2px;
  color: #dbdfe9;
}

.sector__color {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-left: 24.2px;
}

.sector__controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

.sector__btn {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.sector__btn:hover {
  opacity: 0.5;
}

.sector__btn_type-edit {
  background-image: url('@/components/icons/pen.svg');
}

.sector__btn_type-delete {
  background-image: url('@/components/icons/trash.svg');
}
</style>
