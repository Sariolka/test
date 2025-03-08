<script setup lang="ts">
import SvgComponent from '@/components/SvgComponent.vue'
import { ref } from 'vue'

const percent = ref(0)
const status = ref<'in progress' | 'success' | 'warning' | 'error' | null>('in progress')
const interval = ref<number | null>(null)

const setStatus = (newStatus: 'in progress' | 'success' | 'warning' | 'error' | null) => {
  status.value = newStatus
  if (newStatus === 'error' || newStatus === 'warning') {
    if (interval.value) {
      clearInterval(interval.value)
      interval.value = null
    }
  }
}

const handleStart = () => {
  if (interval.value) return
  setStatus('in progress')
  interval.value = setInterval(() => {
    if (percent.value < 100) {
      percent.value += 1
    } else if (status.value === 'error' || status.value === 'warning') {
      stop()
      return
    } else if (status.value === 'success') {
      percent.value = 100
    }
  }, 100)
}

const handleStop = () => {
  if (interval.value) {
    clearInterval(interval.value)
    interval.value = null
  }
}
const handleReset = () => {
  interval.value = null
  percent.value = 0
  status.value = null
  handleStop()
}

const handlePlus = () => {
  if (percent.value < 100) {
    if (percent.value + 10 > 100) {
      percent.value = 100
    } else {
      percent.value += 10
    }
  }
}

const handleMinus = () => {
  if (percent.value >= 0) {
    if (percent.value - 10 < 0) {
      percent.value = 0
    } else {
      percent.value -= 10
    }
  }
}
</script>

<template>
  <main class="main">
    <div class="main__btns">
      <button class="main__btn" @click="handleStart">start</button>
      <button class="main__btn" @click="handleStop">stop</button>
      <button class="main__btn" @click="handleReset">reset</button>
      <button class="main__btn" @click="handlePlus">+10%</button>
      <button class="main__btn" @click="handleMinus">-10%</button>
      <button class="main__btn main__btn_type-error" @click="setStatus('error')">Error</button>
      <button class="main__btn main__btn_type-ok" @click="setStatus('success')">Ok</button>
      <button class="main__btn main__btn_type-warning" @click="setStatus('warning')">
        Warning
      </button>
    </div>
    <SvgComponent :status="status" :percent="percent" />
    <SvgComponent :status="status" :percent="percent" is-dashboard/>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main__btns {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 100px;
}

.main__btn {
  display: inline-flex;
  padding: 5px 25px;
  border: none;
  border-radius: 5px;
  background-color: #5f839a;
  text-transform: uppercase;
  color: #fff;
  font-size: 20px;
}

.main__btn_type-error {
  background-color: darkred;
}

.main__btn_type-ok {
  background-color: darkgreen;
}

.main__btn_type-warning {
  background-color: orange;
}
</style>
