import { watch } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import type { App } from 'vue'

import '../../../packages/styles/index.css'
import {
  LButton,
  LInput,
  LAIInput,
  LCard,
  LModal,
  LToast,
  LCommandPalette,
  LThemeSwitch,
  toast
} from '../../../packages'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('LButton', LButton)
    app.component('LInput', LInput)
    app.component('LAIInput', LAIInput)
    app.component('LCard', LCard)
    app.component('LModal', LModal)
    app.component('LToast', LToast)
    app.component('LCommandPalette', LCommandPalette)
    app.component('LThemeSwitch', LThemeSwitch)
    
    app.config.globalProperties.$toast = toast
  },
  setup() {
    const { isDark } = useData()
    
    watch(isDark, (dark) => {
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    }, { immediate: true })
  }
}
