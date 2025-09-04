<template>
  <section
    class="apartment-filters-by-price"
    aria-label="Выбрать диапазон стоимости квартир"
  >
    <BaseTypography
      variant="h4"
      tag="h4"
      class="apartment-filters-by-price__title"
    >
      Стоимость квартиры, {{ RUB_SYMBOL }}
    </BaseTypography>
    <RangeSlider
      v-model="priceRange"
      :min="min"
      :max="max"
      :step="step"
      :label-from="`${priceRange.min}`"
      :label-to="`${priceRange.max}`"
      @update:model-value="updatePriceRange"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDebounce } from '~/shared_slice/composables/useDebounce/useDebounce'
import { RUB_SYMBOL } from '~/shared_slice/constants'

const { debounceFn } = useDebounce()

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

const emit = defineEmits<{ handleChangePriceFilter: [range: RangeValue] }>()

const priceRange = ref({
  ...(props.range ?? { min: props.min, max: props.max }),
})

watch(
  () => props.range,
  (newFilters) => {
    priceRange.value = { ...(newFilters ?? { min: props.min, max: props.max }) }
  },
  { deep: true },
)

const updatePriceRange = (value: RangeValue) => {
  priceRange.value = value

  debounceFn(
    () =>
      emit('handleChangePriceFilter', {
        min: priceRange.value.min,
        max: priceRange.value.max,
      }),
    1000,
  )
}
</script>

<style scoped>
.apartment-filters-by-price__title {
  margin: 0 0 var(--spacing-sm) 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}
</style>
