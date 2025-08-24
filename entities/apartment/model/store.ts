import { defineStore } from 'pinia'
import type {
  ApartmentFilters,
  ApartmentsSorting,
  ApartmentState,
} from './types'
import { AREA_MAX, AREA_MIN, PRICE_MAX, PRICE_MIN } from './const'
import { fetchApartments as fetchApartmentsService } from '../service'
import { queryToParams } from '../model/helpers/queryToParams'
import type { MetaPagination, MetaSorting } from '~/shared_slice/types'

const defaultStore = {
  apartments: [],
  params: {},
  priceRange: {
    min: PRICE_MIN,
    max: PRICE_MAX,
  },
  areaRange: {
    min: AREA_MIN,
    max: AREA_MAX,
  },
  isLoading: false,
  isError: false,
  errorMessage: '',
}

export const useApartmentStore = defineStore('apartment', {
  state: (): ApartmentState => (defaultStore),

  actions: {
    initParamsFromQuery(query: Record<string, any>) {
      this.$state = defaultStore
      const parsed = queryToParams(query)
      this.params = {
        ...(parsed.pagination && { pagination: parsed.pagination }),
        ...(parsed.sorting && { sorting: parsed.sorting }),
        ...(parsed.filters && {
          filters: {
            ...this.params.filters,
            ...parsed.filters,
          },
        }),
      }
    },

    async fetchApartments() {
      try {
        this.isLoading = true
        const { data, meta, error } = await fetchApartmentsService(this.params)
        if (error) {
          this.isError = true
          this.errorMessage = error.message
        } else {
          if (meta) this.params = meta
          if (data) this.apartments = data
        }
      } catch (error) {
        console.error(error)
        this.isError = true
        this.errorMessage = 'Неизвестная ошибка при получении данных'
      } finally {
        this.isLoading = false
      }
    },

    updatePagination(pagination: MetaPagination) {
      this.params.pagination = pagination
    },

    updateSorting(sorting: MetaSorting<ApartmentsSorting> | null) {
      this.params.sorting = sorting ?? {}
    },

    updateFilters(filters: Partial<ApartmentFilters>) {
      this.params.filters = {
        ...this.params.filters,
        ...filters,
      }
    },

    resetFilters() {
      this.params.filters = {}
    },
  },
})
