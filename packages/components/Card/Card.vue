<template>
  <div
    class="l-card"
    :class="cardClasses"
    :style="cardStyle"
  >
    <div v-if="$slots.cover" class="l-card-cover">
      <slot name="cover" />
    </div>
    
    <div v-if="title || $slots.title" class="l-card-header">
      <div class="l-card-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="$slots.extra" class="l-card-extra">
        <slot name="extra" />
      </div>
    </div>
    
    <div class="l-card-body" :style="bodyStyle">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="l-card-footer">
      <slot name="footer" />
    </div>
    
    <div v-if="loading" class="l-card-loading">
      <div class="l-card-loading-content">
        <span class="l-card-loading-spinner" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'LCard'
})

type CardSize = 'small' | 'medium' | 'large'

interface Props {
  title?: string
  size?: CardSize
  bordered?: boolean
  glass?: boolean
  hoverable?: boolean
  loading?: boolean
  shadow?: 'always' | 'hover' | 'never'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  bordered: true,
  glass: false,
  hoverable: false,
  loading: false,
  shadow: 'always'
})

const cardClasses = computed(() => [
  `l-card-${props.size}`,
  {
    'l-card-bordered': props.bordered,
    'l-card-glass': props.glass,
    'l-card-hoverable': props.hoverable,
    'l-card-shadow-always': props.shadow === 'always',
    'l-card-shadow-hover': props.shadow === 'hover',
    'l-card-shadow-never': props.shadow === 'never'
  }
])

const cardStyle = computed(() => ({}))

const bodyStyle = computed(() => ({}))
</script>

<style scoped>
.l-card {
  position: relative;
  background: var(--l-bg-base);
  border-radius: var(--l-radius-lg);
  overflow: hidden;
  transition: all var(--l-transition-normal);
}

.l-card-bordered {
  border: 1px solid var(--l-border-color);
}

.l-card-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

[data-theme="dark"] .l-card-glass {
  background: rgba(30, 41, 59, 0.7);
}

.l-card-shadow-always {
  box-shadow: var(--l-shadow-md);
}

.l-card-shadow-hover {
  box-shadow: none;
}

.l-card-shadow-hover:hover {
  box-shadow: var(--l-shadow-lg);
}

.l-card-shadow-never {
  box-shadow: none;
}

.l-card-hoverable {
  cursor: pointer;
}

.l-card-hoverable:hover {
  transform: translateY(-2px);
  box-shadow: var(--l-shadow-lg);
}

.l-card-small .l-card-body {
  padding: var(--l-spacing-sm);
}

.l-card-medium .l-card-body {
  padding: var(--l-spacing-md);
}

.l-card-large .l-card-body {
  padding: var(--l-spacing-lg);
}

.l-card-cover {
  overflow: hidden;
}

.l-card-cover :deep(img) {
  width: 100%;
  display: block;
}

.l-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--l-spacing-md);
  border-bottom: 1px solid var(--l-border-color-light);
}

.l-card-title {
  font-size: var(--l-font-size-base);
  font-weight: 600;
  color: var(--l-text-base);
}

.l-card-extra {
  font-size: var(--l-font-size-sm);
  color: var(--l-text-muted);
}

.l-card-body {
  font-size: var(--l-font-size-sm);
  color: var(--l-text-secondary);
}

.l-card-footer {
  padding: var(--l-spacing-md);
  border-top: 1px solid var(--l-border-color-light);
}

.l-card-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--l-bg-base);
  z-index: 1;
}

.l-card-loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--l-border-color);
  border-top-color: var(--l-color-primary);
  border-radius: 50%;
  animation: l-spin 0.8s linear infinite;
}
</style>
