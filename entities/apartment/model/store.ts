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

export const useApartmentStore = defineStore('apartment', {
  state: (): ApartmentState => ({
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
  }),

  actions: {
    initParamsFromQuery(query: Record<string, any>) {
      const parsed = queryToParams(query)
      this.params = {
        ...this.params,
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
        const { data, meta } = await fetchApartmentsService(this.params)

        if (meta) this.params = meta
        if (data) this.apartments = data

        return data
      } catch (error) {
        console.error(error)
        return error
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
