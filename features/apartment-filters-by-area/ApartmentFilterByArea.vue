<template>
  <section class="apartment-filters-by-price__section">
    <BaseTypography
      variant="h4"
      tag="h4"
      class="apartment-filters-by-price__section-title"
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
import { useDebounce } from '#shared/composables/useDebounce/useDebounce'
import RangeSlider from '#shared/ui/RangeSlider/RangeSlider.vue'
import BaseTypography from '#shared/ui/BaseTypography/BaseTypography.vue'
import { RUB_SYMBOL } from '#shared/constants'

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

const emit = defineEmits<{ handleChangePriceFilter: [range: RangeValue] }>()

const priceRange = ref({ ...(props.range ?? { min: props.min, max: props.max }) })

watch(
  () => props.range,
  (newFilters) => {
    priceRange.value = { ...(newFilters ?? { min: props.min, max: props.max }) }
  },
  { deep: true },
)

const updatePriceRange = (value: RangeValue) => {
  priceRange.value = value

  debounce(() =>
    emit('handleChangePriceFilter', { min: priceRange.value.min, max: priceRange.value.max }),
  )
}
</script>

<style scoped>
.apartment-filters-by-price__section {
  margin-bottom: var(--spacing-xl);
}

.apartment-filters-by-price__section:last-child {
  margin-bottom: 0;
}

.apartment-filters-by-price__section-title {
  margin: 0 0 var(--spacing-sm) 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}
</style>
