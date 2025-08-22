import type { ApartmentFilters } from '../types'

export const PRICE_MIN = 5_500_000
export const PRICE_MAX = 18_900_000
export const PRICE_STEP = 100_000

export const AREA_MIN = 33
export const AREA_MAX = 123

export const DEFAULT_FILTERS: ApartmentFilters = {
  rooms: [],
  priceRange: {
    min: PRICE_MIN,
    max: PRICE_MAX
  },
  areaRange: {
    min: AREA_MIN,
    max: AREA_MAX
  }
} 