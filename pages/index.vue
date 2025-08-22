<template>
  <main class="apartment-page">
    <div class="apartment-page__container">
      <div class="apartment-page__content">
        <div class="apartment-page__list">
          <ApartmentListWidget />
        </div>
        <ApartmentFilters />
        <ScrollToTop />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useApartmentStore } from '~/entities/apartment/model/store'
import ScrollToTop from '~/features/scroll-to-top/ScrollToTop.vue'
import ApartmentFilters from '~/widgets/apartment-filters/ApartmentFilters.vue'
import ApartmentListWidget from '~/widgets/apartment-list-widget/ApartmentListWidget.vue'

useHead({
  title: 'My App',
  meta: [
    { name: 'description', content: 'Поиск самых лучших квартир в Москве' },
  ],
  bodyAttrs: {
    class: 'test',
  },
})

useSeoMeta({
  title: 'Квартирный вопрос',
  ogTitle: 'Квартирный вопрос',
  description: 'Поиск самых лучших квартир в Москве',
  ogDescription: 'Поиск самых лучших квартир в Москве',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})

const route = useRoute()
const store = useApartmentStore()

store.initParamsFromQuery(route.query)

await callOnce('apartments', () => store.fetchApartments(), {
  mode: 'navigation',
})
</script>

<style scoped>
.apartment-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
}

.apartment-page__container {
  display: flex;
  width: 100%;
  max-width: var(--max-width);
  padding: 6rem 5rem;
}

.apartment-page__content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.apartment-page__list {
  display: flex;
  flex-direction: column;
  margin-right: 5rem;
  width: 100%;
}

@media (max-width: 1399px) {
  .apartment-page__container {
    padding: 3rem 3.5rem;
  }

  .apartment-page__list {
    margin-right: 1.5rem;
  }
}
</style>
