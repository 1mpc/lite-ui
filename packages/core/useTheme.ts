import { ref, watch, onMounted, onUnmounted } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'auto'

export function useTheme() {
  const mode = ref<ThemeMode>('auto')
  const isDark = ref(false)

  const getSystemTheme = (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const applyTheme = (dark: boolean) => {
    isDark.value = dark
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    }
  }

  let mediaQuery: MediaQueryList | null = null

  const handleMediaChange = (e: MediaQueryListEvent) => {
    if (mode.value === 'auto') {
      applyTheme(e.matches)
    }
  }

  watch(mode, (newMode) => {
    if (newMode === 'auto') {
      applyTheme(getSystemTheme())
    } else {
      applyTheme(newMode === 'dark')
    }
  })

  const toggle = () => {
    mode.value = isDark.value ? 'light' : 'dark'
  }

  const setMode = (newMode: ThemeMode) => {
    mode.value = newMode
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', handleMediaChange)
      
      if (mode.value === 'auto') {
        applyTheme(getSystemTheme())
      }
    }
  })

  onUnmounted(() => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  })

  return {
    mode,
    isDark,
    toggle,
    setMode
  }
}
