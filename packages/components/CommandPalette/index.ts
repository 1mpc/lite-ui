export { default as LCommandPalette } from './CommandPalette.vue'

export interface Command {
  id: string
  label: string
  icon?: string
  shortcut?: string
  action: () => void
}
