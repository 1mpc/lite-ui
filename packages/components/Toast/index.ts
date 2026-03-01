import { createApp, h, ref } from 'vue'
import LToast from './Toast.vue'

type ToastType = 'info' | 'success' | 'warning' | 'error'
type ToastPosition = 'top' | 'bottom'

interface ToastOptions {
  message: string
  type?: ToastType
  duration?: number
  closable?: boolean
}

let toastInstance: any = null
let toastContainer: HTMLDivElement | null = null

const createToastInstance = (position: ToastPosition = 'top') => {
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    document.body.appendChild(toastContainer)
  }
  
  if (!toastInstance) {
    const app = createApp(LToast, { position })
    toastInstance = app.mount(toastContainer)
  }
  
  return toastInstance
}

const toast = (options: ToastOptions) => {
  const instance = createToastInstance()
  return instance.addToast({
    message: options.message,
    type: options.type || 'info',
    duration: options.duration ?? 3000,
    closable: options.closable ?? true
  })
}

toast.info = (message: string, duration?: number) => {
  return toast({ message, type: 'info', duration })
}

toast.success = (message: string, duration?: number) => {
  return toast({ message, type: 'success', duration })
}

toast.warning = (message: string, duration?: number) => {
  return toast({ message, type: 'warning', duration })
}

toast.error = (message: string, duration?: number) => {
  return toast({ message, type: 'error', duration })
}

toast.clear = () => {
  if (toastInstance) {
    toastInstance.toasts = []
  }
}

export { toast }
export { default as LToast } from './Toast.vue'
