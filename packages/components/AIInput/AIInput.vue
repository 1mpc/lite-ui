<template>
  <div class="l-ai-input" :class="{ 'l-ai-input-focused': isFocused }">
    <input
      ref="inputRef"
      v-model="inputValue"
      class="l-ai-input-field"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
    />
    
    <Transition name="l-ai-suggestion">
      <div v-if="showSuggestion && suggestion" class="l-ai-suggestion">
        <span class="l-ai-suggestion-text">{{ suggestion }}</span>
        <kbd class="l-ai-suggestion-hint">Tab</kbd>
      </div>
    </Transition>
    
    <div v-if="loading" class="l-ai-loading">
      <span class="l-ai-loading-dot" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

defineOptions({
  name: 'LAIInput'
})

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  suggestions?: string[] | ((query: string) => Promise<string[]>)
  debounce?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '输入内容...',
  disabled: false,
  debounce: 300
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'select': [value: string]
  'search': [value: string]
}>()

const inputRef = ref<HTMLInputElement>()
const inputValue = ref(props.modelValue)
const isFocused = ref(false)
const loading = ref(false)
const suggestion = ref('')
const showSuggestion = ref(false)

let debounceTimer: ReturnType<typeof setTimeout>

watch(() => props.modelValue, (val) => {
  inputValue.value = val
})

const handleInput = async () => {
  emit('update:modelValue', inputValue.value)
  emit('search', inputValue.value)
  
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(async () => {
    if (!inputValue.value) {
      suggestion.value = ''
      showSuggestion.value = false
      return
    }
    
    if (typeof props.suggestions === 'function') {
      loading.value = true
      try {
        const results = await props.suggestions(inputValue.value)
        loading.value = false
        if (results.length > 0 && isFocused.value) {
          suggestion.value = results[0]
          showSuggestion.value = true
        }
      } catch {
        loading.value = false
      }
    } else if (Array.isArray(props.suggestions)) {
      const match = props.suggestions.find(s => 
        s.toLowerCase().startsWith(inputValue.value.toLowerCase()) &&
        s.toLowerCase() !== inputValue.value.toLowerCase()
      )
      if (match && isFocused.value) {
        suggestion.value = match
        showSuggestion.value = true
      } else {
        showSuggestion.value = false
      }
    }
  }, props.debounce)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Tab' && suggestion.value && showSuggestion.value) {
    e.preventDefault()
    inputValue.value = suggestion.value
    emit('update:modelValue', suggestion.value)
    emit('select', suggestion.value)
    showSuggestion.value = false
  }
}

const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  setTimeout(() => {
    isFocused.value = false
    showSuggestion.value = false
  }, 200)
}

const focus = () => inputRef.value?.focus()
const blur = () => inputRef.value?.blur()

defineExpose({ focus, blur })
</script>

<style scoped>
.l-ai-input {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.l-ai-input-field {
  width: 100%;
  padding: var(--l-spacing-sm) var(--l-spacing-md);
  border: 1px solid var(--l-border-color);
  border-radius: var(--l-radius-md);
  background: var(--l-bg-base);
  font-family: inherit;
  font-size: var(--l-font-size-sm);
  color: var(--l-text-base);
  outline: none;
  transition: all var(--l-transition-fast);
}

.l-ai-input-field::placeholder {
  color: var(--l-text-muted);
}

.l-ai-input-focused .l-ai-input-field {
  border-color: var(--l-color-primary);
  box-shadow: 0 0 0 3px var(--l-color-primary-light);
}

.l-ai-suggestion {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: var(--l-spacing-sm) var(--l-spacing-md);
  background: var(--l-bg-elevated);
  border: 1px solid var(--l-border-color);
  border-radius: var(--l-radius-md);
  margin-top: var(--l-spacing-xs);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--l-shadow-md);
  z-index: 10;
}

.l-ai-suggestion-text {
  color: var(--l-text-secondary);
  font-size: var(--l-font-size-sm);
}

.l-ai-suggestion-hint {
  padding: 2px 6px;
  background: var(--l-bg-muted);
  border-radius: var(--l-radius-sm);
  font-size: var(--l-font-size-xs);
  color: var(--l-text-muted);
  font-family: inherit;
}

.l-ai-loading {
  position: absolute;
  right: var(--l-spacing-md);
  display: flex;
  align-items: center;
}

.l-ai-loading-dot {
  width: 8px;
  height: 8px;
  background: var(--l-color-primary);
  border-radius: 50%;
  animation: l-pulse 1s ease-in-out infinite;
}

.l-ai-suggestion-enter-active,
.l-ai-suggestion-leave-active {
  transition: all var(--l-transition-fast);
}

.l-ai-suggestion-enter-from,
.l-ai-suggestion-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
