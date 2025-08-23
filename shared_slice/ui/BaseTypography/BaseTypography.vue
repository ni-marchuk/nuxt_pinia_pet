<template>
  <component :is="tag" :class="typographyClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'md' | 'body' | 'caption' | 'button'
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  color?: 'primary' | 'secondary'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'body',
  tag: 'p',
  color: 'primary',
  weight: 'normal',
})

const typographyClasses = computed(() => [
  'typography',
  `typography--${props.variant}`,
  `typography--${props.color}`,
  `typography--${props.weight}`,
])
</script>

<style scoped>
.typography {
  margin: 0;
  line-height: 1.5;
}

.typography--h1 {
  font-weight: 700;
  font-size: 54px;
  line-height: 55px;
}

.typography--h2 {
  font-size: 24px;
  font-weight: 600;
}

.typography--h3 {
  font-size: 18px;
  font-weight: 600;
}

.typography--h4 {
  font-size: 14px;
  font-weight: 500;
}

.typography--md {
  font-size: 16px;
}

.typography--body {
  font-size: 14px;
}

.typography--caption {
  font-size: 12px;
}

.typography--button {
  font-size: 14px;
  font-weight: 500;
}

.typography--primary {
  color: var(--color-text-primary);
}

.typography--secondary {
  color: var(--color-text-secondary);
}

.typography--normal {
  font-weight: 400;
}

.typography--medium {
  font-weight: 500;
}

.typography--semibold {
  font-weight: 600;
}

.typography--bold {
  font-weight: 700;
}
</style>
