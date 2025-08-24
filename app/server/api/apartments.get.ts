import type { Apartment } from '~/entities/apartment/model/types'
import { DEFAULT_APARTMENT_PAGINATION } from '~/entities/apartment/model/const'
import { queryToParams } from '~/entities/apartment/model/helpers/queryToParams'
import apartments from '~/shared_slice/public/mocks/apartments.json'
import type { MetaPagination } from '~/shared_slice/types'
import { EMPTY_DEFAULT_RESPONSE } from '~/shared_slice/constants'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const { filters, pagination, sorting } = queryToParams(query)
  let data: Apartment[] = [...apartments]

  return new Promise((resolve) =>
    setTimeout(async () => {
      /** Filters */
      if (filters) {
        data = data.filter((apartment) => {
          if (filters.rooms?.length && !filters.rooms.includes(apartment.rooms))
            return false
          if (filters.priceRange) {
            if (
              apartment.price < filters.priceRange.min ||
              apartment.price > filters.priceRange.max
            )
              return false
          }
          if (filters.areaRange) {
            if (
              apartment.area < filters.areaRange.min ||
              apartment.area > filters.areaRange.max
            )
              return false
          }
          return true
        })
      }

      /** Sorting */
      if (sorting?.sortBy && sorting?.order) {
        const order = sorting.order === 'desc' ? -1 : 1
        data.sort(
          (a, b) =>
            ((a[sorting.sortBy as keyof Apartment] as number) -
              (b[sorting.sortBy as keyof Apartment] as number)) *
            order,
        )
      }

      /** Pagination */
      const total = data.length
      const page = pagination?.page ?? DEFAULT_APARTMENT_PAGINATION.page
      const perPage =
        pagination?.perPage ?? DEFAULT_APARTMENT_PAGINATION.perPage
      const offset = (page - 1) * perPage
      const totalPages = Math.ceil(total / perPage)

      const metaPagination: Required<MetaPagination> = {
        page,
        perPage,
        total,
        offset,
        totalPages,
      }

      data = data.slice(0, page * perPage)

      resolve({
        ...EMPTY_DEFAULT_RESPONSE,
        data: data,
        meta: {
          pagination: metaPagination,
          sorting: sorting ?? {},
          filters: filters ?? {},
        }
        // error: {
        //   message: 'Какая то ошибка'
        // }
      })
    }, 250),
  )
})
