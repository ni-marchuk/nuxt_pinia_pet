<template>
  <ApartmentList
    class="apartment-page__list"
    :sorting="store.params.sorting"
    :apartments="store.apartments"
    :has-more="hasMore"
    :loading="store.isLoading"
    @handle-change-sort="handleChangeSort"
    @handle-load-more="handleLoadMore"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useApartmentStore } from '~/entities/apartment/model/store'
import { paramsToQuery } from '~/entities/apartment/model/helpers/paramsToQuery'
import {
  type Order,
  type SortBy,
} from '~/features/apartment-list/ui/ApartmentListHeaderSort.vue'
import ApartmentList from '~/features/apartment-list/ApartmentList.vue'

const router = useRouter()
const store = useApartmentStore()

const hasMore = computed(() => {
  if (store.apartments.length === 0) return false
  if (
    store.params.pagination &&
    store.params.pagination.totalPages &&
    store.params.pagination.page
  ) {
    return (
      store.params.pagination.totalPages >= store.params?.pagination?.page + 1
    )
  }
  return false
})

const handleLoadMore = () => {
  store.updatePagination({
    ...store.params.pagination,
    page: (store.params?.pagination?.page ?? 1) + 1,
  })
  router.replace({ query: paramsToQuery(store.params) })
  store.fetchApartments()
}

const handleChangeSort = (sorting: { sortBy: SortBy; order: Order } | null) => {
  store.updateSorting(sorting)
  router.replace({ query: paramsToQuery(store.params) })
  store.fetchApartments()
}
</script>

<style scoped>
.apartment-filters section {
  margin-bottom: var(--spacing-xl);
}

.apartment-filters section:last-child {
  margin-bottom: 0;
}
</style>
