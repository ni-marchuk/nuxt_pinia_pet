<template>
  <section class="apartment-list">
    <header class="apartment-list__header">
      <Typography variant="h2" tag="h2">Квартиры</Typography>
      <Typography v-if="loading" variant="body" color="secondary">Загрузка...</Typography>
    </header>

    <div class="apartment-list__table-container">
      <table class="apartment-list__table">
        <ApartmentListHeader />
        <tbody class="apartment-list__tbody">
          <ApartmentListRow
            v-for="apartment in filteredApartments"
            :key="apartment.id"
            :apartment="apartment"
          />
        </tbody>
      </table>

      <div v-if="filteredApartments.length === 0 && !loading" class="apartment-list__empty">
        <Typography variant="body" color="secondary">Квартиры не найдены</Typography>
      </div>
    </div>

    <div v-if="hasMore && filteredApartments.length > 0" class="apartment-list__load-more">
      <BaseButton
        variant="outline"
        :disabled="loading"
        @click="loadMore"
      >
        {{ loading ? 'Загрузка...' : 'Загрузить еще' }}
      </BaseButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useApartmentStore } from '~/entities/apartment/model/store'
import Typography from '~/shared/ui/Typography/Typography.vue'
import BaseButton from '~/shared/ui/BaseButton/BaseButton.vue'
import ApartmentListHeader from './ApartmentListHeader.vue'
import ApartmentListRow from './ApartmentListRow.vue'

const store = useApartmentStore()

const filteredApartments = computed(() => store.filteredApartments)
const loading = computed(() => store.loading)
const hasMore = computed(() => store.hasMore)

const loadMore = () => {
  console.log('Loading more apartments...')
}

</script>

<style scoped>
.apartment-list {
  flex: 1;
  min-width: 0;
}

.apartment-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
}

.apartment-list__table-container {
  background: var(--color-white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-light);
}

.apartment-list__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.apartment-list__empty {
  padding: 48px var(--spacing-xl);
  text-align: center;
}

.apartment-list__load-more {
  margin-top: var(--spacing-xl);
  text-align: center;
}
</style> 