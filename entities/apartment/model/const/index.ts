import type {
  ApartmentFilters,
  ApartmentsSorting,
  FetchApartmentsParams,
} from '../types'
import type { MetaPagination, MetaSorting } from '#shared/types'

/** макс мин значения по сути нужно получать с бека (как минимум потому что пагинация и мы не знаем всех данных) */
export const PRICE_MIN = 3_500_000
export const PRICE_MAX = 24_000_000
export const AREA_MIN = 33
export const AREA_MAX = 320
export const MAX_ROOMS_COUNT = 4

/** дефолтные значения фильтров сортировки нужно обсуждать с бизнесом */
export const DEFAULT_APARTMENT_SORT: MetaSorting<ApartmentsSorting> = {
  sortBy: 'price',
  order: 'asc',
}

export const DEFAULT_APARTMENT_PAGINATION: Required<MetaPagination> = {
  total: 1,
  totalPages: 1,
  page: 1,
  perPage: 20,
  offset: 0,
}

export const DEFAULT_APARTMENT_FILTERS: ApartmentFilters = {
  rooms: [],
  priceRange: {
    min: PRICE_MIN,
    max: PRICE_MAX,
  },
  areaRange: {
    min: AREA_MIN,
    max: AREA_MAX,
  },
}

export const DEFAULT_APARTMENT_PARAMS: FetchApartmentsParams = {
  pagination: DEFAULT_APARTMENT_PAGINATION,
  sorting: DEFAULT_APARTMENT_SORT,
  filters: DEFAULT_APARTMENT_FILTERS,
}
