<template>
  <div class="range-slider" :aria-label="ariaLabel">
    <div class="range-slider__labels">
      <label class="range-slider__label" for="min-area"
        ><span>от</span>{{ labelFrom }}</label
      >
      <label class="range-slider__label" for="max-area"
        ><span>до</span>{{ labelTo }}</label
      >
    </div>
    <div class="range-slider__container" role="group">
      <div class="range-slider__track" />
      <div
        class="range-slider__fill"
        :style="{
          left: minPercent + '%',
          width: maxPercent - minPercent + '%',
        }"
      />
      <input
        type="range"
        class="range-slider__input"
        id="min-area"
        role="slider"
        :value="modelValue.min"
        :min="min"
        :max="max"
        :step="step"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="modelValue.min"
        aria-label="Минимальное значение"
        @input="updateValue('min')($event)"
      />
      <input
        type="range"
        class="range-slider__input"
        role="slider"
        id="max-area"
        :value="modelValue.max"
        :min="min"
        :max="max"
        :step="step"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="modelValue.max"
        aria-label="Максимальное значение"
        @input="updateValue('max')($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface RangeValue {
  min: number
  max: number
}

interface Props {
  modelValue: RangeValue
  min: number
  max: number
  step?: number
  labelFrom?: string
  labelTo?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  step: 1,
  labelFrom: '',
  labelTo: '',
  ariaLabel: 'Выбрать диапазон',
})

const emit = defineEmits<{
  'update:modelValue': [value: RangeValue]
}>()

const minPercent = computed(
  () => ((props.modelValue.min - props.min) / (props.max - props.min)) * 100,
)

const maxPercent = computed(
  () => ((props.modelValue.max - props.min) / (props.max - props.min)) * 100,
)

const updateValue = (key: 'min' | 'max') => (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = Number(target.value)

  if (key === 'min') {
    emit('update:modelValue', {
      ...props.modelValue,
      min: Math.min(value, props.modelValue.max),
    })
  } else {
    emit('update:modelValue', {
      ...props.modelValue,
      max: Math.max(value, props.modelValue.min),
    })
  }
}
</script>

<style scoped>
.range-slider {
  margin-top: var(--spacing-md);
}

.range-slider__labels {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.range-slider__label {
  font-size: 16px;
  color: var(--color-text-primary);

  span {
    margin-right: 8px;
    color: var(--color-text-secondary);
  }
}

.range-slider__container {
  position: relative;
  height: 32px;
}

.range-slider__track {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 4px;
  opacity: 0.3;
  border-radius: 2px;
  transform: translateY(-50%);
  background: var(--color-primary-dark);
}

.range-slider__fill {
  position: absolute;
  top: 50%;
  height: 4px;
  background: var(--color-primary-dark);
  transform: translateY(-50%);
  border-radius: 2px;
}

.range-slider__input {
  position: absolute;
  top: 0;
  left: -2px;
  width: 100%;
  height: 28px;
  background: transparent;
  pointer-events: none;
  -webkit-appearance: none;
  appearance: none;
}

.range-slider__input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: var(--color-primary-dark);
  border-radius: 50%;
  cursor: pointer;
  border: none;
  pointer-events: auto;
}

.range-slider__input::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: var(--color-primary-dark);
  border-radius: 50%;
  cursor: pointer;
  border: none;
  pointer-events: auto;
}
</style>
