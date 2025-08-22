export interface Apartment {
  id: string
  type: string
  number: string
  area: number
  floor: number
  totalFloors: number
  price: number
  layout: string
}

export interface RangeValue {
  min: number
  max: number
}

export interface ApartmentFilters {
  rooms: number[]
  priceRange: RangeValue
  areaRange: RangeValue
}

export interface ApartmentState {
  apartments: Apartment[]
  filters: ApartmentFilters
  loading: boolean
  hasMore: boolean
} 