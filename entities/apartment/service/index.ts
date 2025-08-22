import type { Apartment, FetchApartmentsParams } from '../model/types'
import { paramsToQuery } from '../model/helpers/paramsToQuery'
import type { DefaultResponse } from '#shared/types'

export async function fetchApartments(
  params: FetchApartmentsParams,
): Promise<DefaultResponse<Apartment[], FetchApartmentsParams>> {
  return await $fetch('/api/apartments', {
    params: paramsToQuery(params),
  })
}
