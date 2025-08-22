export type DefaultResponse<T, S> = {
  data: T | null
  meta: S | null
  status: 'success' | 'error' | null // null это initial state для использования в формах
  error: DefaultResponseError | null
}

export type MetaPagination = {
  total?: number
  totalPages?: number
  page?: number
  perPage?: number
  offset?: number
}

export type MetaSorting<T> = {
  sortBy?: T
  order?: 'asc' | 'desc'
}

export type DefaultResponseError = {
  title: string
  message: string
  details: { field: string; value: string; code?: number }[]
  code?: number
}
