<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    status: 'in progress' | 'success' | 'warning' | 'error' | null; // добавлен null для демонстрации
    isDashboard?: boolean;
    percent: number;
  }>(),
  {
    status: 'in progress',
    isDashboard: false,
    percent: 0,
  },
);

//настройки меняющихся цветов
const changedColor = computed(() => {
  let red = 0;
  let green = 0;
  let blue = 0;
  if (props.percent <= 33) {
    red = Math.round(255 - props.percent * 4);
    green = Math.round(props.percent * 2.5);
    blue = Math.round(props.percent * 7.8);
  } else if (props.percent > 33 && props.percent <= 66) {
    red = 0;
    green = Math.round(props.percent * 2.5);
    blue = Math.round(255 - (props.percent - 32) * 2);
  } else if (props.percent > 66) {
    red = 0;
    blue = Math.round(255 - (props.percent - 32) * 2);
    green = Math.round(112.5 + Math.round((props.percent - 32) * 1.5));
  }
  return `rgb(${Math.round(red) < 0 ? 0 : Math.round(red)}, ${Math.round(green) < 0 ? 0 : Math.round(green)}, ${Math.round(blue) < 0 ? 0 : Math.round(blue)})`;
});

//изменение цвета при изменении статуса
const circleColor = computed(() => {
  if (props.status === 'error') {
    return 'red';
  } else if (props.status === 'success') {
    return 'rgb(0, 215, 119)';
  } else if (props.status === 'warning') {
    return 'orange';
  } else {
    return changedColor.value;
  }
});

// длина окружности
const len = computed(() => {
  if (props.isDashboard) {
    return 2 * Math.PI * 90 - 155;
  } else {
    return 2 * Math.PI * 90;
  }
});

// изменение стилей
const circleStyle = computed(() => {
  const offset = len.value - (len.value * props.percent) / 100;
  const dashArray = props.isDashboard
    ? len.value + ' ' + (len.value + 155)
    : len.value + ' ' + len.value;
  return {
    strokeDasharray: dashArray,
    strokeDashoffset: offset,
    transition: 'stroke-dashoffset .2s linear',
  };
});
</script>

<template>
  <div class="loader">
    <svg
      class="loader__container"
      height="200"
      width="200"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="loader__background"
        cx="100"
        cy="100"
        r="90"
        stroke-width="9"
        stroke="#ebebeb"
        fill="none"
        :transform="isDashboard ? 'rotate(-220 100 100)' : ''"
        :class="{ 'loader__background_type-dashboard': isDashboard }"
      ></circle>
      <circle
        class="loader__animate"
        cx="100"
        cy="100"
        r="90"
        stroke-width="9"
        fill="none"
        :transform="isDashboard ? 'rotate(-220 100 100)' : 'rotate(-90 100 100)'"
        :stroke="circleColor"
        :style="circleStyle"
        stroke-linejoin="round"
        stroke-linecap="round"
      ></circle></svg
    ><text class="loader-text" v-if="status === 'in progress' || !status"> {{ percent }}% </text>
    <span v-else-if="status === 'error'" class="loader__icon">
      <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 16 16">
        <path
          d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
        />
      </svg>
    </span>
    <svg
      class="loader__icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="orange"
      viewBox="0 0 16 16"
      v-else-if="status === 'warning'"
    >
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"
      />
    </svg>
    <svg
      class="loader__icon loader__icon_type-big"
      xmlns="http://www.w3.org/2000/svg"
      fill="rgb(0, 215, 119)"
      viewBox="0 0 16 16"
      v-else-if="status === 'success'"
    >
      <path
        d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"
      />
    </svg>
  </div>
</template>

<style scoped>
.loader {
  position: relative;
  display: flex;
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
}

.loader__icon {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
}

.loader__icon_type-big {
  width: 30px;
  height: 30px;
}

.loader-text {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 30px;
  color: #5f6c78;
  transform: translate(-50%, -50%);
}

.loader__background {
  stroke-linecap: round;
}

.loader__container {
  position: relative;
}

.loader__background_type-dashboard {
  stroke-dasharray: 565.48;
  stroke-dashoffset: 155;
}
</style>
