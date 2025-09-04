<template>
  <div class="about-page">
    <div class="about-page__container">
      <BaseTypography class="about-page__title" tag="h2" variant="h2">
        Об авторе
      </BaseTypography>
      <div class="about-page__info">
        <BaseTypography tag="h3" variant="h3">
          Frontend Developer | React / Vue / TypeScript
        </BaseTypography>
        <BaseTypography tag="h4" variant="h4">
          Мужчина, 32 года, родился 9 февраля 1993
        </BaseTypography>
        <BaseTypography tag="h4" variant="h4">
          Активно ищу работу
        </BaseTypography>
        <BaseTypography tag="h4" variant="h4">
          Контакты +7 986 774-61-73
        </BaseTypography>
        <BaseTypography tag="h4" variant="h4">
          marchuknikita@gmail.com
        </BaseTypography>
        <BaseTypography tag="h4" variant="h4">
          https://t.me/telepu31k
        </BaseTypography>
      </div>
      <a
        class="about-page__resume"
        href="https://hh.ru/resume/2f9bfeefff0f4216600039ed1f35314b313539"
        target="_blank"
      >
        <BaseTypography tag="h3" variant="h3"> Мое резюме </BaseTypography>
      </a>
      <a
        class="about-page__resume"
        href="https://docs.google.com/document/d/1crYRnoax9x7AfeZOtR_mYm9PvA1Rv-l21lG1PyLDa_w/edit?tab=t.0"
        target="_blank"
      >
        <BaseTypography tag="h3" variant="h3"
          >Техническое задание</BaseTypography
        >
      </a>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.about-page {
  display: flex;
  width: 100%;
  min-height: 100vh;
  position: relative;
}

.about-page__container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: var(--spacing-lg) var(--spacing-xxl);
  gap: var(--spacing-md);
}

.about-page__title {
  padding-left: 1rem;
}

.about-page__info {
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  background: var(--color-background);
}
.about-page__resume {
  padding-right: var(--spacing-lg);
  margin-left: auto;
}
</style>
