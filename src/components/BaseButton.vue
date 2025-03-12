<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <button class="button" type="submit">{{ title }}</button>
</template>

<style scoped>
.button {
  width: 100%;
  padding: 18px 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #1b84ff;
  border: none;
  outline: transparent;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.8px;
  color: #fff;
  cursor: pointer;
  border-radius: 10px;
  transition: opacity 0.3s ease;
}

.button:hover {
  opacity: 0.9;
}
</style>
