<script setup lang="ts">
import type { Sector } from '@/types/types.ts';

const props = defineProps<{
  caption: Sector;
}>();
</script>

<template>
  <li class="caption">
    <div class="caption__color" :style="{ backgroundColor: caption.color }"></div>
    <p class="caption__text">{{ caption.title }}</p>
  </li>
</template>

<style scoped>
.caption {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.caption__color {
  height: 14px;
  width: 14px;
  border-radius: 50%;
}

.caption__text {
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  color: #3c3c3c;
}
</style>
