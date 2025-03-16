<script setup lang="ts">
import type { ISector } from '@/types/types.ts';
import CaptionItem from '@/components/CaptionItem.vue';

const props = defineProps<{
  captions?: ISector[];
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
