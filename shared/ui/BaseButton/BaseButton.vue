<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    :type="type"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button'
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => [
  'button',
  `button--${props.variant}`,
  `button--${props.size}`,
  { 'button--disabled': props.disabled }
])
</script>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--border-radius-small);
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
}

.button--primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.button--primary:hover:not(.button--disabled) {
  background: var(--color-primary-dark);
}

.button--secondary {
  background: var(--color-border);
  color: var(--color-text-primary);
}

.button--secondary:hover:not(.button--disabled) {
  background: var(--color-text-secondary);
  color: var(--color-white);
}

.button--outline {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.button--outline:hover:not(.button--disabled) {
  background: var(--color-hover);
  border-color: var(--color-text-secondary);
}

.button--sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 12px;
}

.button--md {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 14px;
}

.button--lg {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: 16px;
}

.button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style> 