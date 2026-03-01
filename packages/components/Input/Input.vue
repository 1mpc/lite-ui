<template>
  <div
    class="l-input-wrapper"
    :class="wrapperClasses"
  >
    <span v-if="$slots.prefix" class="l-input-prefix">
      <slot name="prefix" />
    </span>
    
    <input
      ref="inputRef"
      v-model="inputValue"
      class="l-input"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @change="handleChange"
    />
    
    <span v-if="clearable && inputValue" class="l-input-clear" @click="handleClear">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    </span>
    
    <span v-if="$slots.suffix" class="l-input-suffix">
      <slot name="suffix" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineOptions({
  name: 'LInput'
})

type InputSize = 'small' | 'medium' | 'large'

interface Props {
  modelValue?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  size?: InputSize
  maxlength?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  clearable: false,
  size: 'medium'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
  'change': [value: string]
  'clear': []
}>()

const inputRef = ref<HTMLInputElement>()
const isFocused = ref(false)
const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const wrapperClasses = computed(() => [
  `l-input-${props.size}`,
  {
    'l-input-focused': isFocused.value,
    'l-input-disabled': props.disabled,
    'l-input-has-prefix': Boolean(props.disabled),
    'l-input-has-suffix': Boolean(props.clearable)
  }
])

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleInput = () => {
  emit('update:modelValue', inputValue.value)
}

const handleChange = () => {
  emit('change', inputValue.value)
}

const handleClear = () => {
  inputValue.value = ''
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

const focus = () => inputRef.value?.focus()
const blur = () => inputRef.value?.blur()

defineExpose({ focus, blur })
</script>

<style scoped>
.l-input-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  background: var(--l-bg-base);
  border: 1px solid var(--l-border-color);
  border-radius: var(--l-radius-md);
  transition: all var(--l-transition-fast);
}

.l-input-wrapper:hover:not(.l-input-disabled) {
  border-color: var(--l-color-primary);
}

.l-input-focused {
  border-color: var(--l-color-primary);
  box-shadow: 0 0 0 3px var(--l-color-primary-light);
}

.l-input-disabled {
  background: var(--l-bg-muted);
  cursor: not-allowed;
  opacity: 0.6;
}

.l-input {
  flex: 1;
  width: 100%;
  padding: var(--l-spacing-sm) var(--l-spacing-md);
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: var(--l-font-size-sm);
  color: var(--l-text-base);
  outline: none;
}

.l-input::placeholder {
  color: var(--l-text-muted);
}

.l-input:disabled {
  cursor: not-allowed;
}

.l-input-small .l-input {
  padding: var(--l-spacing-xs) var(--l-spacing-sm);
  font-size: var(--l-font-size-xs);
}

.l-input-large .l-input {
  padding: var(--l-spacing-md) var(--l-spacing-md);
  font-size: var(--l-font-size-base);
}

.l-input-prefix,
.l-input-suffix {
  display: flex;
  align-items: center;
  padding: 0 var(--l-spacing-sm);
  color: var(--l-text-muted);
}

.l-input-clear {
  display: flex;
  align-items: center;
  padding: var(--l-spacing-xs);
  margin-right: var(--l-spacing-xs);
  color: var(--l-text-muted);
  cursor: pointer;
  border-radius: var(--l-radius-sm);
  transition: color var(--l-transition-fast);
}

.l-input-clear:hover {
  color: var(--l-text-base);
  background: var(--l-bg-muted);
}
</style>
