<template>
  <button
    v-if="scrollY > 0"
    class="scroll-to-top"
    type="button"
    aria-label="Прокрутить наверх"
    @click="scrollToTop"
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 4L16 10L14.59 11.41L10 6.83L5.41 11.41L4 10L10 4Z"
        fill="currentColor"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const scrollY = ref(0)

const updateScrollY = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  updateScrollY()
  window.addEventListener('scroll', updateScrollY)
})

onUnmounted(() => window.removeEventListener('scroll', updateScrollY))

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: var(--spacing-xl);
  right: var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease;
  z-index: 1000;
}

.scroll-to-top:hover {
  background: var(--color-primary-dark);
}
</style>
