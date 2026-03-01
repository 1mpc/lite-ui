import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useRipple() {
  const ripples = ref<Array<{ x: number; y: number; id: number }>>([])
  let rippleId = 0

  const createRipple = (event: MouseEvent) => {
    const x = event.offsetX
    const y = event.offsetY
    
    ripples.value.push({ x, y, id: rippleId++ })
    
    setTimeout(() => {
      ripples.value.shift()
    }, 600)
  }

  return { ripples, createRipple }
}

export function useReducedMotion() {
  const prefersReducedMotion = ref(false)

  onMounted(() => {
    if (typeof window !== 'undefined') {
      prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
  })

  return prefersReducedMotion
}

export function useFocusTrap(container: Ref<HTMLElement | null>) {
  const focusableSelectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ')

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab' || !container.value) return

    const focusables = container.value.querySelectorAll(focusableSelectors)
    if (focusables.length === 0) return

    const firstFocusable = focusables[0] as HTMLElement
    const lastFocusable = focusables[focusables.length - 1] as HTMLElement

    if (e.shiftKey && document.activeElement === firstFocusable) {
      e.preventDefault()
      lastFocusable.focus()
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      e.preventDefault()
      firstFocusable.focus()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
}

export function useAnnouncer() {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div')
    announcer.setAttribute('aria-live', priority)
    announcer.setAttribute('aria-atomic', 'true')
    announcer.className = 'l-sr-only'
    announcer.textContent = message
    document.body.appendChild(announcer)
    
    setTimeout(() => {
      document.body.removeChild(announcer)
    }, 1000)
  }

  return { announce }
}

export function useClickOutside(
  element: Ref<HTMLElement | null>,
  callback: () => void
) {
  const handleClick = (e: MouseEvent) => {
    if (element.value && !element.value.contains(e.target as Node)) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClick)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClick)
  })
}
