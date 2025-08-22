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
  type: 'button',
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => [
  'button',
  `button--${props.variant}`,
  `button--${props.size}`,
  { 'button--disabled': props.disabled },
])
</script>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
}

.button--primary {
  background: var(--color-primary-dark);
  color: var(--color-white);
}

.button--primary:hover:not(.button--disabled) {
  background: var(--color-primary-dark);
}

.button--secondary {
  color: var(--color-text-primary);
  background: var(--color-white);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border-secondary-button);
}

.button--secondary:hover:not(.button--disabled) {
  background: var(--color-text-secondary);
  color: var(--color-white);
}

.button--outline {
  color: var(--color-text-primary);
  background: transparent;
  border: transparent;
  border: 1px solid transparent;
}

.button--outline:hover:not(.button--disabled) {
  background: transparent;
  border-color: transparent;
  border: 1px solid var(--color-border);
}

.button--sm {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: 14px;
}

.button--md {
  padding: var(--spacing-sm) var(--spacing-xl);
  font-size: 16px;
}

.button--lg {
  padding: var(--spacing-md) var(--spacing-xxl);
  font-size: 18px;
}

.button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
