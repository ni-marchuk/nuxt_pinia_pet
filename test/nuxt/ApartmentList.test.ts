import { it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ApartmentList from '~/features/apartment-list/ApartmentList.vue'

it('показывает plug, если список пуст', async () => {
  const component = mount(ApartmentList, {
    props: {
      loading: false,
      hasMore: false,
      apartments: [],
    },
  })

  expect(component.find('.apartment-list__plug').text()).toBe('Квартиры не найдены')
})
