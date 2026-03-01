<template>
  <Teleport to="body">
    <div class="l-toast-container" :class="`l-toast-${position}`">
      <TransitionGroup name="l-toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="l-toast"
          :class="`l-toast-${toast.type}`"
          role="alert"
          :aria-live="toast.type === 'error' ? 'assertive' : 'polite'"
        >
          <span class="l-toast-icon">
            <component :is="getIcon(toast.type)" />
          </span>
          <span class="l-toast-content">{{ toast.message }}</span>
          <button
            v-if="toast.closable"
            class="l-toast-close"
            @click="removeToast(toast.id)"
            aria-label="关闭"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { h, defineComponent } from 'vue'

defineOptions({
  name: 'LToastContainer'
})

type ToastType = 'info' | 'success' | 'warning' | 'error'
type ToastPosition = 'top' | 'bottom'

interface Toast {
  id: number
  message: string
  type: ToastType
  duration: number
  closable: boolean
}

const toasts = ref<Toast[]>([])
let toastId = 0

const props = defineProps<{
  position?: ToastPosition
}>()

const position = computed(() => props.position || 'top')

const getIcon = (type: ToastType) => {
  const icons: Record<ToastType, ReturnType<typeof defineComponent>> = {
    info: defineComponent({
      render: () => h('svg', { viewBox: '0 0 24 24', width: 20, height: 20, fill: 'currentColor' }, [
        h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z' })
      ])
    }),
    success: defineComponent({
      render: () => h('svg', { viewBox: '0 0 24 24', width: 20, height: 20, fill: 'currentColor' }, [
        h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' })
      ])
    }),
    warning: defineComponent({
      render: () => h('svg', { viewBox: '0 0 24 24', width: 20, height: 20, fill: 'currentColor' }, [
        h('path', { d: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z' })
      ])
    }),
    error: defineComponent({
      render: () => h('svg', { viewBox: '0 0 24 24', width: 20, height: 20, fill: 'currentColor' }, [
        h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' })
      ])
    })
  }
  return icons[type]
}

const addToast = (toast: Omit<Toast, 'id'>) => {
  const id = toastId++
  const newToast = { ...toast, id }
  toasts.value.push(newToast)
  
  if (toast.duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, toast.duration)
  }
  
  return id
}

const removeToast = (id: number) => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index !== -1) {
    toasts.value.splice(index, 1)
  }
}

defineExpose({ addToast, removeToast })
</script>

<script lang="ts">
import { ref, computed } from 'vue'
export default {
  methods: {
    addToast(toast: Omit<Toast, 'id'>) {
      return (this as any).addToast(toast)
    },
    removeToast(id: number) {
      (this as any).removeToast(id)
    }
  }
}
</script>

<style scoped>
.l-toast-container {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: var(--l-spacing-sm);
  pointer-events: none;
}

.l-toast-top {
  top: var(--l-spacing-lg);
}

.l-toast-bottom {
  bottom: var(--l-spacing-lg);
}

.l-toast {
  display: flex;
  align-items: center;
  gap: var(--l-spacing-sm);
  padding: var(--l-spacing-sm) var(--l-spacing-md);
  background: var(--l-bg-elevated);
  border-radius: var(--l-radius-md);
  box-shadow: var(--l-shadow-lg);
  pointer-events: auto;
  min-width: 280px;
  max-width: 400px;
}

.l-toast-info {
  border-left: 3px solid var(--l-color-info);
}

.l-toast-success {
  border-left: 3px solid var(--l-color-success);
}

.l-toast-warning {
  border-left: 3px solid var(--l-color-warning);
}

.l-toast-error {
  border-left: 3px solid var(--l-color-danger);
}

.l-toast-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.l-toast-info .l-toast-icon {
  color: var(--l-color-info);
}

.l-toast-success .l-toast-icon {
  color: var(--l-color-success);
}

.l-toast-warning .l-toast-icon {
  color: var(--l-color-warning);
}

.l-toast-error .l-toast-icon {
  color: var(--l-color-danger);
}

.l-toast-content {
  flex: 1;
  font-size: var(--l-font-size-sm);
  color: var(--l-text-base);
}

.l-toast-close {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--l-spacing-xs);
  color: var(--l-text-muted);
  cursor: pointer;
  border: none;
  background: transparent;
  border-radius: var(--l-radius-sm);
  transition: all var(--l-transition-fast);
}

.l-toast-close:hover {
  color: var(--l-text-base);
  background: var(--l-bg-muted);
}

.l-toast-enter-active,
.l-toast-leave-active {
  transition: all var(--l-transition-normal);
}

.l-toast-enter-from,
.l-toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
