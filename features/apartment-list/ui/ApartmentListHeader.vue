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
      <div class="apartment-list-header__sortable">
        <BaseTypography variant="body" color="primary" weight="normal">
          S, {{ SQUARE_SYMBOL }}
        </BaseTypography>
        <div class="apartment-list-header__sortable-wrapper">
          <ArrowUp
            :class="{
              'apartment-list-header__sort-icon': true,
              'active': sorting?.sortBy === 'area' && sorting?.order === 'asc'
            }"
          />
          <ArrowDown
            :class="{
              'apartment-list-header__sort-icon': true,
              'active': sorting?.sortBy === 'area' && sorting?.order === 'desc'
            }"
          />
        </div>
      </div>
    </div>
    <div class="apartment-list-header__item apartment-list-header__item--floor">
      <div class="apartment-list-header__sortable">
        <BaseTypography variant="body" color="primary" weight="normal"
        >Этаж
        </BaseTypography>
        <div class="apartment-list-header__sortable-wrapper">
          <ArrowUp
            :class="{
              'apartment-list-header__sort-icon': true,
              'active': sorting?.sortBy === 'floor' && sorting?.order === 'asc'
            }"
          />
          <ArrowDown
            :class="{
              'apartment-list-header__sort-icon': true,
              'active': sorting?.sortBy === 'floor' && sorting?.order === 'desc'
            }"
          />
        </div>
      </div>
    </div>
    <div class="apartment-list-header__item apartment-list-header__item--price">
      <div class="apartment-list-header__sortable">
        <BaseTypography variant="body" color="primary" weight="normal"
        >Цена, {{ RUB_SYMBOL }}
        </BaseTypography>
        <div class="apartment-list-header__sortable-wrapper">
          <ArrowUp
            :class="{
              'apartment-list-header__sort-icon': true,
              'active': sorting?.sortBy === 'price' && sorting?.order === 'asc'
            }"
          />
          <ArrowDown
            :class="{
              'apartment-list-header__sort-icon': true,
              'active': sorting?.sortBy === 'price' && sorting?.order === 'desc'
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RUB_SYMBOL, SQUARE_SYMBOL } from '#shared/constants'
import ArrowUp from '#shared/assets/icons/arrow_up.svg'
import ArrowDown from '#shared/assets/icons/arrow_down.svg'
import BaseTypography from '#shared/ui/BaseTypography/BaseTypography.vue'
import type { MetaSorting } from '#shared/types'

type ApartmentsSorting = 'area' | 'floor' | 'price'
const { sorting } = defineProps<{
  sorting?: MetaSorting<ApartmentsSorting>
}>()

</script>

<style scoped>
.apartment-list-header {
  display: flex;
  align-items: center;
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
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

.apartment-list-header__sortable {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.apartment-list-header__sortable-wrapper {
  display: flex;
  flex-direction: column;
  color: var(--color-text-secondary);
  margin-left: var(--spacing-md);
  gap: 2px;
}

.apartment-list-header__sort-icon {
  opacity: 0.6;
  margin: 0;
  width: 7px;
  height: 4px;
}

.apartment-list-header__sort-icon:hover {
  opacity: 1;
  color: var(--color-primary-dark);
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
