<template>
  <Teleport to="body">
    <Transition name="l-command">
      <div v-if="visible" class="l-command-overlay" @click.self="close">
        <div class="l-command-palette">
          <div class="l-command-input-wrapper">
            <svg class="l-command-search-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <input
              ref="inputRef"
              v-model="query"
              class="l-command-input"
              placeholder="搜索命令..."
              @keydown.esc="close"
              @keydown.enter="executeSelected"
              @keydown.up.prevent="selectPrevious"
              @keydown.down.prevent="selectNext"
            />
          </div>
          
          <div v-if="filteredCommands.length > 0" class="l-command-list">
            <div
              v-for="(command, index) in filteredCommands"
              :key="command.id"
              class="l-command-item"
              :class="{ 'l-command-item-active': index === selectedIndex }"
              @click="executeCommand(command)"
              @mouseenter="selectedIndex = index"
            >
              <span v-if="command.icon" class="l-command-icon">{{ command.icon }}</span>
              <span class="l-command-label">{{ command.label }}</span>
              <kbd v-if="command.shortcut" class="l-command-shortcut">
                {{ command.shortcut }}
              </kbd>
            </div>
          </div>
          
          <div v-else class="l-command-empty">
            <span>没有找到匹配的命令</span>
          </div>
          
          <div class="l-command-footer">
            <span><kbd>↑</kbd> <kbd>↓</kbd> 导航</span>
            <span><kbd>Enter</kbd> 选择</span>
            <span><kbd>Esc</kbd> 关闭</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'LCommandPalette'
})

interface Command {
  id: string
  label: string
  icon?: string
  shortcut?: string
  action: () => void
}

interface Props {
  commands: Command[]
  shortcut?: string
}

const props = withDefaults(defineProps<Props>(), {
  shortcut: 'ctrl+k'
})

const emit = defineEmits<{
  'open': []
  'close': []
  'select': [command: Command]
}>()

const visible = ref(false)
const query = ref('')
const selectedIndex = ref(0)
const inputRef = ref<HTMLInputElement>()

const filteredCommands = computed(() => {
  if (!query.value) return props.commands
  
  const q = query.value.toLowerCase()
  return props.commands.filter(cmd => 
    cmd.label.toLowerCase().includes(q)
  )
})

watch(filteredCommands, () => {
  selectedIndex.value = 0
})

const executeCommand = (command: Command) => {
  command.action()
  emit('select', command)
  close()
}

const executeSelected = () => {
  if (filteredCommands.value[selectedIndex.value]) {
    executeCommand(filteredCommands.value[selectedIndex.value])
  }
}

const selectPrevious = () => {
  selectedIndex.value = Math.max(0, selectedIndex.value - 1)
}

const selectNext = () => {
  selectedIndex.value = Math.min(filteredCommands.value.length - 1, selectedIndex.value + 1)
}

const open = () => {
  visible.value = true
  query.value = ''
  selectedIndex.value = 0
  emit('open')
  setTimeout(() => inputRef.value?.focus(), 100)
}

const close = () => {
  visible.value = false
  emit('close')
}

const handleKeydown = (e: KeyboardEvent) => {
  const key = props.shortcut.split('+').pop()
  const hasCtrl = props.shortcut.includes('ctrl')
  const hasMeta = props.shortcut.includes('meta')
  
  if (
    e.key.toLowerCase() === key?.toLowerCase() &&
    ((hasCtrl && e.ctrlKey) || (hasMeta && e.metaKey))
  ) {
    e.preventDefault()
    visible.value ? close() : open()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

defineExpose({ open, close })
</script>

<style scoped>
.l-command-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 15vh;
  z-index: 1000;
}

.l-command-palette {
  width: 100%;
  max-width: 560px;
  background: var(--l-bg-elevated);
  border-radius: var(--l-radius-lg);
  box-shadow: var(--l-shadow-xl);
  overflow: hidden;
}

.l-command-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  padding: var(--l-spacing-md);
  border-bottom: 1px solid var(--l-border-color-light);
}

.l-command-search-icon {
  color: var(--l-text-muted);
  margin-right: var(--l-spacing-sm);
}

.l-command-input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: var(--l-font-size-base);
  color: var(--l-text-base);
  outline: none;
}

.l-command-input::placeholder {
  color: var(--l-text-muted);
}

.l-command-list {
  max-height: 320px;
  overflow-y: auto;
  padding: var(--l-spacing-xs);
}

.l-command-item {
  display: flex;
  align-items: center;
  gap: var(--l-spacing-sm);
  padding: var(--l-spacing-sm) var(--l-spacing-md);
  border-radius: var(--l-radius-md);
  cursor: pointer;
  transition: background var(--l-transition-fast);
}

.l-command-item-active {
  background: var(--l-color-primary-light);
}

.l-command-item:hover:not(.l-command-item-active) {
  background: var(--l-bg-muted);
}

.l-command-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: var(--l-text-muted);
}

.l-command-label {
  flex: 1;
  font-size: var(--l-font-size-sm);
  color: var(--l-text-base);
}

.l-command-shortcut {
  padding: 2px 6px;
  background: var(--l-bg-muted);
  border-radius: var(--l-radius-sm);
  font-size: var(--l-font-size-xs);
  color: var(--l-text-muted);
  font-family: inherit;
}

.l-command-empty {
  padding: var(--l-spacing-lg);
  text-align: center;
  color: var(--l-text-muted);
  font-size: var(--l-font-size-sm);
}

.l-command-footer {
  display: flex;
  gap: var(--l-spacing-md);
  padding: var(--l-spacing-sm) var(--l-spacing-md);
  border-top: 1px solid var(--l-border-color-light);
  font-size: var(--l-font-size-xs);
  color: var(--l-text-muted);
}

.l-command-footer kbd {
  padding: 2px 4px;
  background: var(--l-bg-muted);
  border-radius: var(--l-radius-sm);
  font-family: inherit;
}

.l-command-enter-active,
.l-command-leave-active {
  transition: opacity var(--l-transition-normal);
}

.l-command-enter-active .l-command-palette,
.l-command-leave-active .l-command-palette {
  transition: all var(--l-transition-normal);
}

.l-command-enter-from,
.l-command-leave-to {
  opacity: 0;
}

.l-command-enter-from .l-command-palette,
.l-command-leave-to .l-command-palette {
  transform: scale(0.95);
  opacity: 0;
}
</style>
