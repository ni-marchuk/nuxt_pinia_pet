<template>
  <div class="layout">
    <header class="header">
      <nav class="nav" aria-label="Главное меню">
        <ul class="nav-list">
          <li class="nav-list__item">
            <BaseTypography variant="h3" color="secondary">
              Квартирный Вопрос
            </BaseTypography>
          </li>
          <li class="nav-list__item">
            <NuxtLink to="/" class="nav-link">
              <BaseTypography variant="caption" color="primary">
                Главная
              </BaseTypography>
            </NuxtLink>
          </li>
          <li class="nav-list__item">
            <NuxtLink to="/about" class="nav-link">
              <BaseTypography variant="caption" color="primary">
                Об авторе
              </BaseTypography>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import BaseTypography from '~/shared_slice/ui/BaseTypography/BaseTypography.vue'
</script>

<style>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  backdrop-filter: blur(6px);
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  min-height: var(--spacing-xxxl);
}

.nav {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: var(--max-width);
}

.nav-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: var(--spacing-lg);
}

.nav-list__item {
  display: flex;
}

.nav-link {
  color: black;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-link.router-link-active p {
  color: var(--color-primary-dark);
}
</style>
