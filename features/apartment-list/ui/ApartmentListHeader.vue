<template>
  <div class="apartment-list-header">
    <div
      class="apartment-list-header__item apartment-list-header__item--layout"
    >
      <BaseTypography variant="body" color="primary" weight="normal">
        Планировка
      </BaseTypography>
    </div>
    <div class="apartment-list-header__item apartment-list-header__item--type">
      <BaseTypography variant="body" color="primary" weight="normal">
        Квартира
      </BaseTypography>
    </div>
    <div class="apartment-list-header__item apartment-list-header__item--area">
      <ApartmentListHeaderSort
        :is-active="sorting?.sortBy === 'area'"
        :title="`S, ${SQUARE_SYMBOL}`"
        :order="sorting?.order"
        :sort-by="'area'"
        @handle-change-sort="(sort) => $emit('handleChangeSort', sort)"
      />
    </div>
    <div class="apartment-list-header__item apartment-list-header__item--floor">
      <ApartmentListHeaderSort
        :is-active="sorting?.sortBy === 'floor'"
        :title="'Этаж'"
        :order="sorting?.order"
        :sort-by="'floor'"
        @handle-change-sort="(sort) => $emit('handleChangeSort', sort)"
      />
    </div>
    <div class="apartment-list-header__item apartment-list-header__item--price">
      <ApartmentListHeaderSort
        :is-active="sorting?.sortBy === 'price'"
        :title="`Цена, ${RUB_SYMBOL}`"
        :order="sorting?.order"
        :sort-by="'price'"
        @handle-change-sort="(sort) => $emit('handleChangeSort', sort)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ApartmentListHeaderSort, {
  type Order,
  type SortBy,
} from '~/features/apartment-list/ui/ApartmentListHeaderSort.vue'
import BaseTypography from '#shared/ui/BaseTypography/BaseTypography.vue'
import type { MetaSorting } from '#shared/types'
import { RUB_SYMBOL, SQUARE_SYMBOL } from '#shared/constants'

export type Sorting = MetaSorting<SortBy>

const { sorting } = defineProps<{
  sorting?: Sorting
}>()

defineEmits<{ handleChangeSort: [{ sortBy: SortBy; order: Order } | null] }>()
</script>

<style scoped>
.apartment-list-header {
  display: flex;
  align-items: center;
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
  font-size: 14px;
}

.apartment-list-header__item {
  font-weight: 600;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
}

.apartment-list-header__item--layout {
  flex: 1 0 100px;
}

.apartment-list-header__item--type {
  flex: 1 0 100px;
}

.apartment-list-header__item--area {
  flex: 1 0 100px;
}

.apartment-list-header__item--floor {
  flex: 1 0 100px;
}

.apartment-list-header__item--price {
  flex: 1 0 100px;
  justify-content: flex-start;
}

@media (max-width: 1399px) {
  .apartment-list-header {
    border: none;
  }

  .apartment-list-header__item {
    flex: 0 1 auto;
  }

  .apartment-list-header__item--layout,
  .apartment-list-header__item--type {
    display: none;
  }

  .apartment-list-header__item--floor {
    margin-left: var(--spacing-md);
  }

  .apartment-list-header__item--price {
    margin-left: var(--spacing-md);
  }
}
</style>
