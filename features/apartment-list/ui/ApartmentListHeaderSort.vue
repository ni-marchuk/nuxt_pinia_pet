<template>
  <div
    :class="{
      'apartment-list-header-sortable': true,
      active: isActive,
    }"
  >
    <BaseTypography variant="body" color="primary" weight="normal">
      {{ title }}
    </BaseTypography>
    <div class="apartment-list-header-sortable__icons-wrapper">
      <button
        class="icon-button"
        type="button"
        aria-label="Сортировать по возрастанию"
        @click="handleSort('asc')"
      >
        <ArrowUp
          :class="{
            'apartment-list-header-sortable__icon': true,
            active: isActive && order === 'asc',
          }"
        />
      </button>
      <button
        class="icon-button"
        type="button"
        aria-label="Сортировать по убыванию"
        @click="handleSort('desc')"
      >
        <ArrowDown
          :class="{
            'apartment-list-header-sortable__icon': true,
            active: isActive && order === 'desc',
          }"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowUp from '#shared/assets/icons/arrow_up.svg'
import ArrowDown from '#shared/assets/icons/arrow_down.svg'
import BaseTypography from '#shared/ui/BaseTypography/BaseTypography.vue'

export type Order = 'asc' | 'desc'
export type SortBy = 'area' | 'floor' | 'price'

const { title, isActive, order, sortBy } = defineProps<{
  title: string
  isActive: boolean
  order?: Order
  sortBy: SortBy
}>()

const emit = defineEmits<{
  handleChangeSort: [{ sortBy: SortBy; order: Order } | null]
}>()

const handleSort = (newOrder: Order) => {
  if (order !== newOrder) emit('handleChangeSort', { sortBy, order: newOrder })
  if (order === newOrder) emit('handleChangeSort', null)
}
</script>

<style scoped>
.apartment-list-header-sortable {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.apartment-list-header-sortable.active p {
  color: var(--color-primary-dark);
}

.apartment-list-header-sortable__icons-wrapper {
  display: flex;
  flex-direction: column;
  color: var(--color-text-secondary);
  margin-left: var(--spacing-md);
  gap: 2px;
}

.apartment-list-header-sortable__icon {
  margin: 0;
  width: 7px;
  height: 4px;
  color: var(--color-text-secondary);
}

.apartment-list-header-sortable__icon:hover {
  color: var(--color-primary-dark);
}

.apartment-list-header-sortable__icon.active {
  color: var(--color-primary-dark);
}
</style>
