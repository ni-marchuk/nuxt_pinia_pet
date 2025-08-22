<template>
  <div class="range-slider">
    <div class="range-slider__labels">
      <span class="range-slider__label">{{ label }}</span>
    </div>
    <div class="range-slider__container">
      <div class="range-slider__track"/>
      <div 
        class="range-slider__fill"
        :style="{ left: minPercent + '%', width: (maxPercent - minPercent) + '%' }"
      />
      <input
        type="range"
        :value="modelValue.min"
        :min="min"
        :max="max"
        :step="step"
        class="range-slider__input"
        @input="updateMin"
      >
      <input
        type="range"
        :value="modelValue.max"
        :min="min"
        :max="max"
        :step="step"
        class="range-slider__input"
        @input="updateMax"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface RangeValue {
  min: number
  max: number
}

interface Props {
  modelValue: RangeValue
  min: number
  max: number
  step?: number
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  step: 1,
  label: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: RangeValue]
}>()

const minPercent = computed(() => ((props.modelValue.min - props.min) / (props.max - props.min)) * 100)
const maxPercent = computed(() => ((props.modelValue.max - props.min) / (props.max - props.min)) * 100)

const updateMin = (event: Event) => {
  const target = event.target as HTMLInputElement
  const newMin = Math.min(Number(target.value), props.modelValue.max)
  emit('update:modelValue', { ...props.modelValue, min: newMin })
}

const updateMax = (event: Event) => {
  const target = event.target as HTMLInputElement
  const newMax = Math.max(Number(target.value), props.modelValue.min)
  emit('update:modelValue', { ...props.modelValue, max: newMax })
}
</script>

<style scoped>
.range-slider {
  margin-top: var(--spacing-md);
}

.range-slider__labels {
  margin-bottom: var(--spacing-sm);
}

.range-slider__label {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.range-slider__container {
  position: relative;
  height: 30px;
}

.range-slider__track {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--color-border);
  border-radius: 2px;
  transform: translateY(-50%);
}

.range-slider__fill {
  position: absolute;
  top: 50%;
  height: 4px;
  background: var(--color-primary);
  transform: translateY(-50%);
  border-radius: 2px;
}

.range-slider__input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
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
  background: var(--color-primary);
  border-radius: 50%;
  cursor: pointer;
  border: none;
  pointer-events: auto;
}

.range-slider__input::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: var(--color-primary);
  border-radius: 50%;
  cursor: pointer;
  border: none;
  pointer-events: auto;
}
</style> 