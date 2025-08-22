<template>
  <section
    class="apartment-filters-by-area__section"
    aria-label="Выбрать диапазон площади квартир"
  >
    <BaseTypography
      variant="h4"
      tag="h4"
      class="apartment-filters-by-area__section-title"
    >
      Площадь, {{ SQUARE_SYMBOL }}
    </BaseTypography>
    <RangeSlider
      v-model="areaRange"
      :min="min"
      :max="max"
      :step="step"
      :label-from="`${areaRange.min}`"
      :label-to="`${areaRange.max}`"
      @update:model-value="updateAreaRange"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDebounce } from '#shared/composables/useDebounce/useDebounce'
import RangeSlider from '#shared/ui/RangeSlider/RangeSlider.vue'
import BaseTypography from '#shared/ui/BaseTypography/BaseTypography.vue'
import { SQUARE_SYMBOL } from '#shared/constants'

const debounce = useDebounce()

export type RangeValue = {
  min: number
  max: number
}

const props = defineProps<{
  range?: RangeValue
  min: number
  max: number
  step?: number
}>()

const emit = defineEmits<{ handleChangeAreaFilter: [range: RangeValue] }>()

const areaRange = ref({
  ...(props.range ?? { min: props.min, max: props.max }),
})

watch(
  () => props.range,
  (newFilters) => {
    areaRange.value = { ...(newFilters ?? { min: props.min, max: props.max }) }
  },
  { deep: true },
)

const updateAreaRange = (value: RangeValue) => {
  areaRange.value = value

  debounce(
    () =>
      emit('handleChangeAreaFilter', {
        min: areaRange.value.min,
        max: areaRange.value.max,
      }),
    1000,
  )
}
</script>

<style scoped>
.apartment-filters-by-area__section-title {
  margin: 0 0 var(--spacing-sm) 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}
</style>
