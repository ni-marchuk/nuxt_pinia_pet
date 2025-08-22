<template>
  <button
    :class="checkboxButtonClasses"
    :disabled="disabled"
    type="button"
    @click="$emit('toggle')"
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
  disabled: false
})

defineEmits<{
  toggle: []
}>()

const checkboxButtonClasses = computed(() => [
  'checkbox-button',
  { 'checkbox-button--checked': props.checked },
  { 'checkbox-button--disabled': props.disabled }
])
</script>

<style scoped>
.checkbox-button {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-lg);
  border: 1px solid var(--color-border);
  background: var(--color-border);
  border-radius: var(--border-radius-small);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  color: var(--color-text-primary);
}

.checkbox-button:hover:not(.checkbox-button--disabled) {
  background: var(--color-text-secondary);
  color: var(--color-white);
}

.checkbox-button--checked {
  background: var(--color-primary);
  color: var(--color-white);
  border-color: var(--color-primary);
}

.checkbox-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style> 