import type { DefaultResponse, DefaultResponseError } from '~/shared_slice/types'

export const EMPTY_DEFAULT_RESPONSE: DefaultResponse<never, never> = {
  data: null,
  meta: null,
  status: null,
  error: null,
}

export const EMPTY_DEFAULT_RESPONSE_ERROR: DefaultResponseError = {
  title: 'Ошибка',
  message: '',
  details: [],
}

export const RUB_SYMBOL = '₽'
export const SQUARE_SYMBOL = 'м²'
