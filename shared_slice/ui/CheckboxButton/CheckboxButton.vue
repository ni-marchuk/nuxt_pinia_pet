<template>
  <button
    :class="checkboxButtonClasses"
    :disabled="disabled"
    type="button"
    @click="$emit('handleCheck')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  checked?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
  disabled: false,
})

defineEmits<{
  handleCheck: []
}>()

const checkboxButtonClasses = computed(() => [
  'checkbox-button',
  { 'checkbox-button--checked': props.checked },
  { 'checkbox-button--disabled': props.disabled },
])
</script>

<style scoped>
.checkbox-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--color-white);
  border-radius: var(--border-radius-round);
  border-width: 0;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
  color: var(--color-text-primary);
  box-shadow: var(--shadow-light-green);
}

.checkbox-button:hover:not(.checkbox-button--disabled) {
  background: var(--color-primary-dark);
  color: var(--color-white);
}

.checkbox-button:hover:not(.checkbox-button--disabled) p {
  color: var(--color-white);
}

.checkbox-button--checked {
  background: var(--color-primary-dark);
  color: var(--color-white);
}

.checkbox-button--disabled {
  opacity: 0.6;
  color: var(--color-text-secondary);
  cursor: not-allowed;
}
</style>
