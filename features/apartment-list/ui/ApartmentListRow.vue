<template>
  <div class="apartment-list-row">
    <!-- Mobile content -->
    <div class="apartment-list-row__item apartment-list-row__item--mobile">
      <BaseTypography
        class="apartment-list-row__mobile-apartment"
        variant="body"
      >
        {{ apartment.rooms }}-комнатная №{{ apartment.number }}
      </BaseTypography>
      <div class="apartment-list-row__mobile-info">
        <BaseTypography variant="body" color="secondary"
          >{{ apartment.area }} {{ SQUARE_SYMBOL }}</BaseTypography
        >
        <BaseTypography variant="body" color="secondary">
          <span class="text-primary">{{ apartment.floor }}</span> из
          {{ apartment.totalFloors }} этаж
        </BaseTypography>
        <BaseTypography variant="body" weight="semibold"
          >{{ formatPrice(apartment.price) }} {{ RUB_SYMBOL }}
        </BaseTypography>
      </div>
    </div>
    <!-- Mobile content end -->
    <div class="apartment-list-row__item apartment-list-row__item--layout">
      <div class="apartment-list-row__layout">
        <nuxt-img
          :src="`${config.public.baseURL}/${apartment.img}`"
          alt="изображение квартиры"
        />
      </div>
    </div>
    <div class="apartment-list-row__item apartment-list-row__item--type">
      <BaseTypography variant="body">
        {{ apartment.rooms }}-комнатная №{{ apartment.number }}
      </BaseTypography>
    </div>
    <div class="apartment-list-row__item apartment-list-row__item--area">
      <div class="apartment-list-row__area-content">
        <BaseTypography variant="body" color="secondary"
          >{{ apartment.area }} {{ SQUARE_SYMBOL }}</BaseTypography
        >
      </div>
    </div>
    <div class="apartment-list-row__item apartment-list-row__item--floor">
      <BaseTypography variant="body" color="secondary">
        <span class="text-primary">{{ apartment.floor }}</span> из
        {{ apartment.totalFloors }} этаж
      </BaseTypography>
    </div>
    <div class="apartment-list-row__item apartment-list-row__item--price">
      <BaseTypography variant="body" weight="normal"
        >{{ formatPrice(apartment.price) }} {{ RUB_SYMBOL }}
      </BaseTypography>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Apartment } from '../types'
import { RUB_SYMBOL, SQUARE_SYMBOL } from '~/shared_slice/constants'
import { formatPrice } from '~/shared_slice/helpers/formatPrice'

const config = useRuntimeConfig()

defineProps<{
  apartment: Apartment
}>()
</script>

<style scoped>
.apartment-list-row {
  display: flex;
  padding: var(--spacing-lg) 0 var(--spacing-xl) 0;
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.apartment-list-row:hover {
  background: var(--color-hover);
}

.apartment-list-row__item {
  display: flex;
}

.apartment-list-row__item--mobile {
  display: none;
}

.apartment-list-row__item--layout {
  flex: 1 0 100px;
}

.apartment-list-row__item--type {
  flex: 1 0 100px;
}

.apartment-list-row__item--area {
  flex: 1 0 100px;
}

.apartment-list-row__item--floor {
  flex: 1 0 100px;
}

.apartment-list-row__item--price {
  flex: 1 0 100px;
  justify-content: flex-start;
}

.apartment-list-row__layout {
  display: flex;
  justify-content: center;
  align-items: center;
}

.apartment-list-row__layout img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.apartment-list-row__area-content {
  display: flex;
  flex-direction: column;
}

@media (max-width: 1399px) {
  .apartment-list-row {
    padding: var(--spacing-lg) var(--spacing-xl) var(--spacing-lg)
      var(--spacing-xl);
    justify-content: space-between;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
  }

  .apartment-list-row__item--mobile {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .apartment-list-row__mobile-apartment {
    margin-bottom: var(--spacing-lg);
  }

  .apartment-list-row__mobile-info {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 20px;
  }

  .apartment-list-row__item--layout {
    width: 80px;
  }

  .apartment-list-row__item--type {
    display: none;
  }

  .apartment-list-row__item--area {
    display: none;
  }

  .apartment-list-row__item--floor {
    display: none;
  }

  .apartment-list-row__item--price {
    display: none;
  }
}
</style>
