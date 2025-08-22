<template>
  <div
    :class="{
      'apartment-list-header-sortable': true,
      'active':isActive
    }"
  >
    <BaseTypography variant="body" color="primary" weight="normal">
      {{ title }}
    </BaseTypography>
    <div class="apartment-list-header-sortable__icons-wrapper">
      <ArrowUp
        :class="{
              'apartment-list-header-sortable__icon': true,
              'active': isActive && order === 'asc'
            }"
      />
      <ArrowDown
        :class="{
              'apartment-list-header-sortable__icon': true,
              'active': isActive && order === 'asc'
            }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowUp from '#shared/assets/icons/arrow_up.svg'
import ArrowDown from '#shared/assets/icons/arrow_down.svg'
import BaseTypography from '#shared/ui/BaseTypography/BaseTypography.vue'

const { title, order, isActive } = defineProps<{
  title: string
  order?: 'asc' | 'desc'
  isActive: boolean
}>()

</script>

<style scoped>

.apartment-list-header-sortable {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.apartment-list-header-sortable__icons-wrapper {
  display: flex;
  flex-direction: column;
  color: var(--color-text-secondary);
  margin-left: var(--spacing-md);
  gap: 2px;
}

.apartment-list-header-sortable__icon {
  opacity: 0.6;
  margin: 0;
  width: 7px;
  height: 4px;
}

.apartment-list-header-sortable__icon:hover {
  opacity: 1;
  color: var(--color-primary-dark);
}
</style>
