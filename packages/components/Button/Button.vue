<template>
  <button
    class="l-button"
    :class="buttonClasses"
    :disabled="disabled || loading"
    :type="nativeType"
    @click="handleClick"
    @mousedown="createRipple"
  >
    <span
      v-for="ripple in ripples"
      :key="ripple.id"
      class="l-button-ripple"
      :style="{ left: ripple.x + 'px', top: ripple.y + 'px' }"
    />
    
    <span v-if="loading" class="l-button-spinner" />
    
    <span class="l-button-content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRipple } from '@/core'

defineOptions({
  name: 'LButton'
})

type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
type ButtonSize = 'small' | 'medium' | 'large'
type NativeButtonType = 'button' | 'submit' | 'reset'

interface Props {
  type?: ButtonType
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  block?: boolean
  nativeType?: NativeButtonType
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'medium',
  loading: false,
  disabled: false,
  block: false,
  nativeType: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const { ripples, createRipple } = useRipple()

const buttonClasses = computed(() => [
  `l-button-${props.type}`,
  `l-button-${props.size}`,
  {
    'l-button-loading': props.loading,
    'l-button-disabled': props.disabled,
    'l-button-block': props.block
  }
])

const handleClick = (event: MouseEvent) => {
  if (!props.loading && !props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.l-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--l-spacing-xs);
  padding: var(--l-spacing-sm) var(--l-spacing-md);
  border: 1px solid var(--l-border-color);
  border-radius: var(--l-radius-md);
  font-family: inherit;
  font-size: var(--l-font-size-sm);
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  overflow: hidden;
  transition: all var(--l-transition-fast);
  outline: none;
}

.l-button:focus-visible {
  box-shadow: 0 0 0 3px var(--l-color-primary-light);
}

.l-button-default {
  background: var(--l-bg-base);
  color: var(--l-text-base);
  border-color: var(--l-border-color);
}

.l-button-default:hover:not(:disabled) {
  border-color: var(--l-color-primary);
  color: var(--l-color-primary);
}

.l-button-primary {
  background: var(--l-color-primary);
  color: white;
  border-color: var(--l-color-primary);
}

.l-button-primary:hover:not(:disabled) {
  background: var(--l-color-primary-dark);
  border-color: var(--l-color-primary-dark);
}

.l-button-success {
  background: var(--l-color-success);
  color: white;
  border-color: var(--l-color-success);
}

.l-button-success:hover:not(:disabled) {
  filter: brightness(1.1);
}

.l-button-warning {
  background: var(--l-color-warning);
  color: white;
  border-color: var(--l-color-warning);
}

.l-button-warning:hover:not(:disabled) {
  filter: brightness(1.1);
}

.l-button-danger {
  background: var(--l-color-danger);
  color: white;
  border-color: var(--l-color-danger);
}

.l-button-danger:hover:not(:disabled) {
  filter: brightness(1.1);
}

.l-button-info {
  background: var(--l-color-info);
  color: white;
  border-color: var(--l-color-info);
}

.l-button-info:hover:not(:disabled) {
  filter: brightness(1.1);
}

.l-button-small {
  padding: var(--l-spacing-xs) var(--l-spacing-sm);
  font-size: var(--l-font-size-xs);
}

.l-button-large {
  padding: var(--l-spacing-md) var(--l-spacing-lg);
  font-size: var(--l-font-size-base);
}

.l-button-block {
  display: flex;
  width: 100%;
}

.l-button-disabled,
.l-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.l-button-loading {
  cursor: wait;
}

.l-button-ripple {
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: l-ripple 0.6s ease-out;
  pointer-events: none;
}

.l-button-default .l-button-ripple {
  background: rgba(0, 0, 0, 0.1);
}

.l-button-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: l-spin 0.6s linear infinite;
}

.l-button-content {
  display: inline-flex;
  align-items: center;
  gap: var(--l-spacing-xs);
}
</style>
