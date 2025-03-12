<script setup lang="ts">
import { ref, watch } from 'vue';
import { FAST_TIMOUT, TIMEOUT } from '@/constants/constants.ts';
import ProgressBar from '@/components/ProgressBar.vue';

const percent = ref(0);
const status = ref<'in progress' | 'success' | 'warning' | 'error' | null>('in progress');
const interval = ref<number | null>(null);
const isDashboard = ref(false);

const setStatus = (newStatus: 'in progress' | 'success' | 'warning' | 'error' | null) => {
  status.value = newStatus;
  handleStop();
};

const start = (timeout: number) => {
  if (interval.value) return;

  interval.value = setInterval(() => {
    if (percent.value < 100) {
      percent.value += 1;
    } else {
      stop();
      status.value = 'success';
    }
  }, timeout);
};

const stop = () => {
  if (interval.value) {
    clearInterval(interval.value);
    interval.value = null;
  }
};

watch(status, (newStatus) => {
  if (newStatus === 'in progress') {
    start(TIMEOUT);
  } else if (newStatus === 'success') {
    start(FAST_TIMOUT);
  } else {
    stop();
  }
});

const handleStart = () => {
  setStatus('in progress');
  start(TIMEOUT);
};

const handleStop = () => {
  if (interval.value) {
    clearInterval(interval.value);
    interval.value = null;
  }
};

const handleReset = () => {
  handleStop();
  percent.value = 0;
  status.value = null;
};

const handlePlus = () => {
  if (percent.value < 100) {
    if (percent.value + 10 > 100) {
      percent.value = 100;
    } else {
      percent.value += 10;
    }
  }
};

const handleMinus = () => {
  if (percent.value >= 0) {
    if (percent.value - 10 < 0) {
      percent.value = 0;
    } else {
      percent.value -= 10;
    }
  }
};

const handleSetDashboard = () => {
  isDashboard.value = !isDashboard.value;
};
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
      <button class="main__btn main__btn_type-dashboard" @click="handleSetDashboard">
        Dashboard
      </button>
    </div>
    <ProgressBar :status="status" :percent="percent" :is-dashboard="isDashboard" />
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

.main__btn_type-dashboard {
  background-color: black;
}
</style>
