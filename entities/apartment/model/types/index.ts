import type { MetaPagination, MetaSorting } from '#shared/types'

export type Apartment = {
  id: number
  rooms: number
  img: string
  number: string
  area: number
  floor: number
  totalFloors: number
  price: number
  layout: string
}

export type RangeValue = {
  min: number
  max: number
}

export type ApartmentFilters = {
  rooms?: number[]
  priceRange?: RangeValue
  areaRange?: RangeValue
}

export type ApartmentsSorting = 'area' | 'floor' | 'price'

export type FetchApartmentsParams = {
  pagination?: MetaPagination
  sorting?: MetaSorting<ApartmentsSorting>
  filters?: Partial<ApartmentFilters>
}

export type ApartmentState = {
  apartments: Apartment[]
  params: FetchApartmentsParams
  priceRange: RangeValue
  areaRange: RangeValue
  isLoading: boolean
}
