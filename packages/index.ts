import type { App } from 'vue'

export * from './core'
export * from './styles'

export { LButton } from './components/Button'
export { LInput } from './components/Input'
export { LAIInput } from './components/AIInput'
export { LCard } from './components/Card'
export { LModal } from './components/Modal'
export { LToast, toast } from './components/Toast'
export { LCommandPalette } from './components/CommandPalette'
export { LThemeSwitch } from './components/ThemeSwitch'

import { LButton } from './components/Button'
import { LInput } from './components/Input'
import { LAIInput } from './components/AIInput'
import { LCard } from './components/Card'
import { LModal } from './components/Modal'
import { LToast, toast } from './components/Toast'
import { LCommandPalette } from './components/CommandPalette'
import { LThemeSwitch } from './components/ThemeSwitch'

const components = [
  LButton,
  LInput,
  LAIInput,
  LCard,
  LModal,
  LToast,
  LCommandPalette,
  LThemeSwitch
]

const install = (app: App) => {
  components.forEach((comp) => {
    if (comp.name) {
      app.component(comp.name, comp)
    }
  })
  
  app.config.globalProperties.$toast = toast
}

export default {
  install
}
