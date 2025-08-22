<template>
  <aside class="apartment-filters">
    <section class="apartment-filters__section">
      <div class="apartment-filters__room-buttons">
        <CheckboxButton
          v-for="room in [1, 2, 3, 4]"
          :key="room"
          :checked="rooms?.includes(room)"
          @handle-check="toggleRoom(room)"
        >
          {{ room }}к
        </CheckboxButton>
      </div>
    </section>

    <section class="apartment-filters__section">
      <BaseTypography
        variant="h4"
        tag="h4"
        class="apartment-filters__section-title"
      >
        Стоимость квартиры, {{ RUB_SYMBOL }}
      </BaseTypography>
      <RangeSlider
        v-model="priceRange"
        :min="defaultPriceRange.min"
        :max="defaultPriceRange.max"
        :step="PRICE_STEP"
        :label-from="`${formatPrice(priceRange.min)}`"
        :label-to="`${formatPrice(priceRange.max)}`"
        @update:model-value="updatePriceRange"
      />
    </section>

    <section class="apartment-filters__section">
      <BaseTypography
        variant="h4"
        tag="h4"
        class="apartment-filters__section-title"
      >
        Площадь, {{ SQUARE_SYMBOL }}
      </BaseTypography>
      <RangeSlider
        v-model="areaRange"
        :min="defaultAreaRange.min"
        :max="defaultAreaRange.max"
        :step="1"
        :label-from="`${formatPrice(areaRange.min)}`"
        :label-to="`${formatPrice(areaRange.max)}`"
        @update:model-value="updateAreaRange"
      />
    </section>

    <BaseButton
      variant="outline"
      size="sm"
      class="apartment-filters__reset-button"
      @click="$emit('handleResetFilters')"
    >
      <span>Сбросить параметры</span>
      <Close />
    </BaseButton>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseTypography from '#shared/ui/BaseTypography/BaseTypography.vue'
import BaseButton from '#shared/ui/BaseButton/BaseButton.vue'
import CheckboxButton from '#shared/ui/CheckboxButton/CheckboxButton.vue'
import RangeSlider from '#shared/ui/RangeSlider/RangeSlider.vue'
import { useDebounce } from '#shared/composables/useDebounce/useDebounce'
import { formatPrice } from '#shared/helpers/formatPrice'
import { RUB_SYMBOL, SQUARE_SYMBOL } from '#shared/constants'
import Close from '#shared/assets/icons/cross_mini.svg'

export type RangeValue = {
  min: number
  max: number
}

export type Filters = {
  rooms?: number[]
  priceRange?: RangeValue
  areaRange?: RangeValue
}

const PRICE_STEP = 100_000
const debounce = useDebounce()

const props = defineProps<{
  filters?: Filters
  defaultPriceRange: RangeValue
  defaultAreaRange: RangeValue
}>()

const emit = defineEmits<{
  handleChangeFilters: [filters: Partial<Filters>]
  handleResetFilters: []
}>()

/** Добавляем локальные состояния, что б обновлять ui оптимистично */
const rooms = ref(props.filters?.rooms ?? [])
const priceRange = ref({
  ...(props.filters?.priceRange ?? props.defaultPriceRange),
})
const areaRange = ref({
  ...(props.filters?.areaRange ?? props.defaultAreaRange),
})

watch(
  () => props.filters,
  (newFilters) => {
    const {
      rooms: newRooms = [],
      priceRange: newPriceRange,
      areaRange: newAreaRange,
    } = newFilters || {}

    rooms.value = [...(newRooms ?? [])]
    priceRange.value = { ...(newPriceRange ?? props.defaultPriceRange) }
    areaRange.value = { ...(newAreaRange ?? props.defaultAreaRange) }
  },
  { deep: true },
)

const toggleRoom = (room: number) => {
  const index = rooms.value.indexOf(room)
  if (index > -1) {
    rooms.value.splice(index, 1)
  } else {
    rooms.value.push(room)
  }

  debounce(() => emit('handleChangeFilters', { rooms: rooms.value }))
}

const updatePriceRange = (value: RangeValue) => {
  priceRange.value = value

  debounce(() =>
    emit('handleChangeFilters', {
      priceRange: value,
    }),
  )
}

const updateAreaRange = (value: RangeValue) => {
  areaRange.value = value

  debounce(() =>
    emit('handleChangeFilters', {
      areaRange: value,
    }),
  )
}
</script>

<style scoped>
.apartment-filters {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  height: min-content;

  background: linear-gradient(#aee4b2, #95d0a1);
  border-radius: var(--border-radius);
}

.apartment-filters__section {
  margin-bottom: var(--spacing-xl);
}

.apartment-filters__section:last-child {
  margin-bottom: 0;
}

.apartment-filters__section-title {
  margin: 0 0 var(--spacing-sm) 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.apartment-filters__room-buttons {
  display: flex;
  gap: var(--spacing-lg);
}

.apartment-filters__reset-button {
  width: auto;
  margin-right: auto;

  span {
    margin-right: var(--spacing-sm);
  }

  svg {
    margin: 0;
    width: 8px;
    height: 8px;
  }
}

@media (max-width: 1399px) {
  .apartment-filters {
    max-width: 318px;
    padding: 1.5rem;
  }
}
</style>
