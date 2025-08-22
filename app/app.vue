<template>
  <!--  Поставил что б избавиться от FOUC -->
  <!-- TODO Нужно будет добавить suspense + fallback || skeleton -->
  <div v-cloak>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
