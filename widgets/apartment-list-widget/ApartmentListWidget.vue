<template>
  <aside class="apartment-filters">
    <ApartmentFilterByRooms
      :rooms="store.params?.filters?.rooms"
      @handle-change-rooms-filter="(rooms)=> handleChangeFilters({rooms})"
    />
    <ApartmentFilterByPrice
      :range="store?.params?.filters?.priceRange"
      :min="store.priceRange.min"
      :max="store.priceRange.max"
      :step="PRICE_STEP"
      @handle-change-price-filter="(priceRange) => handleChangeFilters({priceRange})"
    />
    <ApartmentFilterByArea
      :range="store?.params?.filters?.areaRange"
      :min="store.areaRange.min"
      :max="store.areaRange.max"
      :step="AREA_STEP"
      @handle-change-area-filter="(areaRange) => handleChangeFilters({areaRange})"
    />
    <section>
      <BaseButton
        variant="outline"
        size="sm"
        class="apartment-filters__reset-button"
        @click="handleResetFilters"
      >
        <span>Сбросить параметры</span>
        <Close />
      </BaseButton>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { useApartmentStore } from '~/entities/apartment/model/store'
import { paramsToQuery } from '~/entities/apartment/model/helpers/paramsToQuery'
import type { ApartmentFilters } from '~/entities/apartment/model/types'
import ApartmentFilterByPrice from '~/features/apartment-filters-by-price/ApartmentFilterByPrice.vue'
import ApartmentFilterByArea from '~/features/apartment-filters-by-area/ApartmentFilterByArea.vue'
import BaseButton from '#shared/ui/BaseButton/BaseButton.vue'
import Close from '#shared/assets/icons/cross_mini.svg'
import ApartmentFilterByRooms from '~/features/apartment-filters-by-rooms/ApartmentFilterByRooms.vue'

const PRICE_STEP = 50000
const AREA_STEP = 5
const router = useRouter()
const store = useApartmentStore()



// const handlePageChange = (page: number) => {
//   if (store.params.pagination) {
//     store.updatePagination({ ...store.params.pagination, page: page })
//     router.replace({ query: paramsToQuery(store.params) })
//     store.fetchApartments()
//   }
// }
//
// const handleSortChange = (sorting: MetaSorting<ApartmentsSorting>) => {
//   store.updateSorting(sorting)
//   router.replace({ query: paramsToQuery(store.params) })
//   store.fetchApartments()
// }

const handleChangeFilters = (filters: ApartmentFilters) => {
  store.updateFilters(filters)
  router.replace({ query: paramsToQuery(store.params) })
  store.fetchApartments()
}

const handleResetFilters = () => {
  store.resetFilters()
  router.replace('')
  store.fetchApartments()
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

.apartment-filters section {
  margin-bottom: var(--spacing-xl);
}

.apartment-filters section:last-child {
  margin-bottom: 0;
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
