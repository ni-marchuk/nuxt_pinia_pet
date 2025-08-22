import type { FetchApartmentsParams } from '../types'

/** используем для замены в router.replace({query}) */

export const paramsToQuery = (
  params: Partial<FetchApartmentsParams>,
): Record<string, string> => {
  const query: Record<string, string> = {}

  if (params.pagination?.page) query.page = String(params.pagination.page)
  if (params.pagination?.perPage)
    query.perPage = String(params.pagination.perPage)
  if (params.sorting?.sortBy) query.sortBy = params.sorting.sortBy
  if (params.sorting?.order) query.order = params.sorting.order
  if (params.filters?.rooms?.length)
    query.rooms = params.filters.rooms.join(',')
  if (params.filters?.priceRange?.min)
    query.priceMin = String(params.filters.priceRange.min)
  if (params.filters?.priceRange?.max)
    query.priceMax = String(params.filters.priceRange.max)
  if (params.filters?.areaRange?.min)
    query.areaMin = String(params.filters.areaRange.min)
  if (params.filters?.areaRange?.max)
    query.areaMax = String(params.filters.areaRange.max)

  return query
}
