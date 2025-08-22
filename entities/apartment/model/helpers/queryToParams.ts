import type { FetchApartmentsParams } from '~/entities/apartment/model/types'

/** используем для parse query из строки */
export const queryToParams = (
  query: Record<string, any>,
): Partial<FetchApartmentsParams> => {
  const result: Partial<FetchApartmentsParams> = {}

  if (query.page && query.perPage) {
    result.pagination = {
      page: Number(query.page),
      perPage: Number(query.perPage),
    }
  }

  if (query.sortBy && query.order) {
    result.sorting = {
      sortBy: query.sortBy ?? 'price',
      order: query.order === 'desc' ? 'desc' : 'asc',
    }
  }

  const filters: Partial<FetchApartmentsParams['filters']> = {}

  if (query.rooms) {
    filters.rooms = query.rooms.split(',').map(Number)
  }

  if (query.priceMin || query.priceMax) {
    filters.priceRange = {
      min: Number(query.priceMin),
      max: Number(query.priceMax),
    }
  }

  if (query.areaMin && query.areaMax) {
    filters.areaRange = {
      min: Number(query.areaMin),
      max: Number(query.areaMax),
    }
  }

  if (Object.keys(filters).length) {
    result.filters = filters
  }

  return result
}
