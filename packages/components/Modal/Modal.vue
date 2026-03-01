<template>
  <Teleport to="body">
    <Transition name="l-modal">
      <div
        v-if="modelValue"
        class="l-modal-overlay"
        :class="{ 'l-modal-mask': mask }"
        @click.self="handleMaskClick"
      >
        <div
          ref="modalRef"
          class="l-modal"
          :class="modalClasses"
          :style="modalStyle"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
        >
          <div v-if="showClose" class="l-modal-close" @click="handleClose">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </div>
          
          <div v-if="title || $slots.header" :id="titleId" class="l-modal-header">
            <slot name="header">{{ title }}</slot>
          </div>
          
          <div class="l-modal-body">
            <slot />
          </div>
          
          <div v-if="$slots.footer" class="l-modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useFocusTrap } from '@/core'

defineOptions({
  name: 'LModal'
})

type ModalSize = 'small' | 'medium' | 'large' | 'full'

interface Props {
  modelValue: boolean
  title?: string
  size?: ModalSize
  mask?: boolean
  maskClosable?: boolean
  showClose?: boolean
  closeOnEsc?: boolean
  width?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  size: 'medium',
  mask: true,
  maskClosable: true,
  showClose: true,
  closeOnEsc: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
  'open': []
}>()

const modalRef = ref<HTMLElement | null>(null)
const titleId = `l-modal-title-${Math.random().toString(36).slice(2)}`

useFocusTrap(modalRef)

const modalClasses = computed(() => [
  `l-modal-${props.size}`
])

const modalStyle = computed(() => {
  if (props.width) {
    return {
      width: typeof props.width === 'number' ? `${props.width}px` : props.width
    }
  }
  return {}
})

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleMaskClick = () => {
  if (props.maskClosable) {
    handleClose()
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.closeOnEsc && props.modelValue) {
    handleClose()
  }
}

watch(() => props.modelValue, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    emit('open')
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.l-modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--l-spacing-lg);
  z-index: 1000;
}

.l-modal-mask {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.l-modal {
  position: relative;
  background: var(--l-bg-base);
  border-radius: var(--l-radius-lg);
  box-shadow: var(--l-shadow-xl);
  max-height: calc(100vh - var(--l-spacing-lg) * 2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.l-modal-small {
  width: 360px;
  max-width: 100%;
}

.l-modal-medium {
  width: 520px;
  max-width: 100%;
}

.l-modal-large {
  width: 720px;
  max-width: 100%;
}

.l-modal-full {
  width: calc(100vw - var(--l-spacing-lg) * 2);
  height: calc(100vh - var(--l-spacing-lg) * 2);
}

.l-modal-close {
  position: absolute;
  top: var(--l-spacing-md);
  right: var(--l-spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--l-text-muted);
  cursor: pointer;
  border-radius: var(--l-radius-md);
  transition: all var(--l-transition-fast);
  z-index: 1;
}

.l-modal-close:hover {
  color: var(--l-text-base);
  background: var(--l-bg-muted);
}

.l-modal-header {
  padding: var(--l-spacing-md) var(--l-spacing-lg);
  font-size: var(--l-font-size-lg);
  font-weight: 600;
  color: var(--l-text-base);
  border-bottom: 1px solid var(--l-border-color-light);
}

.l-modal-body {
  flex: 1;
  padding: var(--l-spacing-lg);
  overflow-y: auto;
  font-size: var(--l-font-size-sm);
  color: var(--l-text-secondary);
}

.l-modal-footer {
  padding: var(--l-spacing-md) var(--l-spacing-lg);
  border-top: 1px solid var(--l-border-color-light);
  display: flex;
  justify-content: flex-end;
  gap: var(--l-spacing-sm);
}

.l-modal-enter-active,
.l-modal-leave-active {
  transition: all var(--l-transition-normal);
}

.l-modal-enter-active .l-modal,
.l-modal-leave-active .l-modal {
  transition: all var(--l-transition-normal);
}

.l-modal-enter-from,
.l-modal-leave-to {
  opacity: 0;
}

.l-modal-enter-from .l-modal,
.l-modal-leave-to .l-modal {
  transform: scale(0.95);
  opacity: 0;
}
</style>
