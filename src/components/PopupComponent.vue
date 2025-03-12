<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { ColorInputWithoutInstance } from 'tinycolor2';
import { ColorPicker } from 'vue3-colorpicker';
import ButtonAdd from '@/components/BaseButton.vue';

const props = defineProps<{
  handleCloseModal: () => void;
  show: boolean;
  title?: string;
  percent?: number;
  color?: string;
}>();

const emit = defineEmits(['add']);
const pureColor = ref<ColorInputWithoutInstance>(props.color || '#b0e0e6');
const titleValue = ref(props.title || '');
const percentValue = ref(props.percent || null);
const isColorPickerOpen = ref(false);
const currentInput = ref<number | null>(null);
const isFocused = ref(false);

const handleFocus = (id: number) => {
  currentInput.value = id;
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
  currentInput.value = null;
};

const closeModal = () => {
  props.handleCloseModal();
};

onMounted(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      props.handleCloseModal();
    }
  };
  document.addEventListener('keydown', handleKeyDown);

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);
  });
});

const toggleOpenColorPicker = () => {
  isColorPickerOpen.value = !isColorPickerOpen.value;
};

const handleAddSector = () => {
  emit('add', { title: titleValue.value, percent: percentValue.value, color: pureColor.value });
};

// const changedColor = computed(() => {
//   pureColor.value =
// })
</script>

<template>
  <div class="modal" v-if="show" @click.self="closeModal" role="dialog">
    <div class="modal__container">
      <h3 class="modal__title">{{ color ? 'Изменение сектора' : 'Добавление сектора' }}</h3>
      <form class="modal__form" @submit.prevent="handleAddSector">
        <div
          class="modal__input-box"
          :class="{ 'modal__input-box_focused': isFocused && currentInput === 1 }"
        >
          <label class="modal__label" for="title">Наименование</label>
          <input
            class="modal__input"
            type="text"
            id="title"
            v-model="titleValue"
            @focus="handleFocus(1)"
            @blur="handleBlur"
          />
        </div>
        <div
          class="modal__input-box"
          :class="{ 'modal__input-box_focused': isFocused && currentInput === 2 }"
        >
          <label class="modal__label" for="percent">Значение</label>
          <input
            class="modal__input"
            type="text"
            pattern="[0-9]*"
            id="percent"
            v-model="percentValue"
            @focus="handleFocus(2)"
            @blur="handleBlur"
          />
        </div>
        <div>
          <div
            class="modal__input-box"
            :class="{
              'modal__input-box_focused': isColorPickerOpen || (isFocused && currentInput === 3),
            }"
          >
            <label class="modal__label" for="color">Цвет</label>
            <div class="modal__color-control">
              <input
                class="modal__input"
                type="text"
                id="color"
                v-model="pureColor"
                @focus="handleFocus(3)"
                @blur="handleBlur"
              />
              <div class="modal__color-container">
                <div class="modal__color" :style="`background-color: ${pureColor}`"></div>
                <button
                  class="modal__color-btn"
                  :class="{ 'modal__color-btn_close': !isColorPickerOpen }"
                  @click="toggleOpenColorPicker"
                  type="button"
                ></button>
              </div>
            </div>
          </div>
          <color-picker
            v-model:pureColor="pureColor"
            is-widget
            shape="circle"
            format="hex"
            disable-history
            v-if="isColorPickerOpen"
            picker-type="chrome"
          />
        </div>
        <ButtonAdd :title="color ? 'Изменить сектор' : 'Добавить сектор'" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: opacity 0.1s linear;
  transform-origin: top;
}

.modal__container {
  width: 390px;
  padding: 22px 20px;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.modal__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal__title {
  color: #252f4a;
  font-weight: 500;
  font-size: 20px;
  line-height: 100%;
}

.modal__input-box {
  display: flex;
  flex-direction: column;
  padding: 8px 20px 8px 18px;
  border: 1px solid #dbdfe9;
  border-radius: 10px;
}

.modal__label {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #99a1b7;
}

.modal__input {
  font-family: inherit;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #252f4a;
  border: none;
  outline: transparent;
  background-color: transparent;
}

.modal__input-box_focused {
  border: 1px solid #1b84ff;
}

.modal__color-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal__color {
  height: 24px;
  width: 24px;
  border-radius: 50%;
}

.modal__color-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.modal__color-btn {
  background-image: url('@/components/icons/arrow.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  background-color: transparent;
  width: 16px;
  height: 16px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.modal__color-btn_close {
  transform: rotate(180deg);
}
</style>
<style>
.vc-colorpicker {
  box-shadow: none !important;
  width: 100% !important;
}

.vc-colorpicker--container {
  padding: 10px 0 !important;
}

.vc-saturation {
  border-radius: 10px !important;
}
</style>
