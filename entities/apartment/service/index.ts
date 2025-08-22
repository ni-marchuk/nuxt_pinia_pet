import type { Apartment } from '../model/types'
import { mockApartments } from '../model/mocks/apartments'

export async function fetchApartments(): Promise<Apartment[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockApartments
} 