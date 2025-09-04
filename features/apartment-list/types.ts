import type { MetaSorting } from '~/shared_slice/types'

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

export type Order = 'asc' | 'desc'
export type SortBy = 'area' | 'floor' | 'price'

export type Sorting = MetaSorting<SortBy>
