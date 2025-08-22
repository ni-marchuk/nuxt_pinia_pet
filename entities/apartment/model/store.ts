import { defineStore } from 'pinia'
import type { ApartmentFilters, ApartmentState } from './types'
import { DEFAULT_FILTERS } from './const'
import { fetchApartments as fetchApartmentsService } from '../service'

export const useApartmentStore = defineStore('apartment', {
  state: (): ApartmentState => ({
    apartments: [],
    filters: { ...DEFAULT_FILTERS },
    loading: false,
    hasMore: true
  }),

  getters: {
    filteredApartments: (state) => {
      return state.apartments.filter(apartment => {
        if (state.filters.rooms.length > 0) {
          const roomCount = parseInt(apartment.type.split('-')[0] || '0')
          if (!state.filters.rooms.includes(roomCount)) {
            return false
          }
        }

        if (apartment.price < state.filters.priceRange.min || 
            apartment.price > state.filters.priceRange.max) {
          return false
        }

        if (apartment.area < state.filters.areaRange.min || 
            apartment.area > state.filters.areaRange.max) {
          return false
        }

        return true
      })
    }
  },

  actions: {
    async fetchApartments() {
      this.loading = true
      try {
        const apartments = await fetchApartmentsService()
        this.apartments = apartments
      } catch (error) {
        console.error('Error fetching apartments:', error)
      } finally {
        this.loading = false
      }
    },

    updateFilters(filters: Partial<ApartmentFilters>) {
      this.filters = { ...this.filters, ...filters }
    },

    resetFilters() {
      this.filters = { ...DEFAULT_FILTERS }
    }
  }
}) 