<template>
  <section class="apartment-list">
    <header class="apartment-list__header">
      <BaseTypography variant="h1" tag="h1" weight="bold">Квартиры</BaseTypography>
    </header>

    <ApartmentListHeader
      :sorting="sorting"
      @handle-change-sort="(sort)=>$emit('handleChangeSort', sort)"
    />

    <div v-if="!loading" class="apartment-list__content">
      <div class="apartment-list__items">
        <ApartmentListRow
          v-for="apartment in apartments"
          :key="apartment.id"
          :apartment="apartment"
        />
      </div>
      <div v-if="apartments.length === 0" class="apartment-list__plug">
        <BaseTypography variant="body" color="secondary">
          Квартиры не найдены
        </BaseTypography>
      </div>
      <div
        v-if="hasMore && apartments.length > 0"
        class="apartment-list__load-more"
      >
        <BaseButton
          variant="secondary"
          size="md"
          :disabled="loading"
          @click="$emit('handleChangeLoadMore')"
        >
          {{ loading ? 'Загрузка...' : 'Загрузить еще' }}
        </BaseButton>
      </div>
    </div>
    <BaseTypography
      v-else
      class="apartment-list__plug"
      variant="body"
      color="secondary"
    >
      Загрузка...
    </BaseTypography>
  </section>
</template>

<script setup lang="ts">
import type { Sorting } from '~/features/apartment-list/ui/ApartmentListHeader.vue'
import type { Apartment } from '~/features/apartment-list/ui/ApartmentListRow.vue'
import { type Order, type SortBy } from '~/features/apartment-list/ui/ApartmentListHeaderSort.vue'
import ApartmentListHeader from './ui/ApartmentListHeader.vue'
import ApartmentListRow from './ui/ApartmentListRow.vue'
import BaseTypography from '#shared/ui/BaseTypography/BaseTypography.vue'
import BaseButton from '#shared/ui/BaseButton/BaseButton.vue'

const { apartments } = defineProps<{
  sorting?: Sorting
  loading: boolean
  hasMore: boolean
  apartments: Apartment[]
}>()

defineEmits<{
  handleChangeLoadMore: []
  handleChangeSort: [{ sortBy: SortBy, order: Order } | null]
}>()
</script>

<style scoped>
.apartment-list {
  display: flex;
}

.apartment-list__header {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-xxxl);
}

.apartment-list__content {
  display: flex;
  flex-direction: column;
}

.apartment-list__items {
  display: flex;
  flex-direction: column;
}

.apartment-list__load-more {
  padding-top: var(--spacing-xxl);
}

.apartment-list__plug {
  padding: 48px var(--spacing-xl);
  text-align: center;
}

@media (max-width: 1399px) {
  .apartment-list__header {
    margin-bottom: var(--spacing-xl);
  }

  .apartment-list__items {
    gap: var(--spacing-xs);
  }
}
</style>
