<script setup lang="ts">
import CaptionItem from '@/components/CaptionItem.vue';
import type { Sector } from '@/types/types.ts';

const props = defineProps<{
  captions?: Sector[];
}>();
</script>

<template>
  <ul class="captions" v-if="captions">
    <CaptionItem v-for="(caption, index) in captions" :key="index" :caption="caption" />
  </ul>
</template>

<style scoped>
.captions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 30px;
}
</style>
