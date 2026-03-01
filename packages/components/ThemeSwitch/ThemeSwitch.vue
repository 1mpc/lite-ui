<template>
  <button
    class="l-theme-switch"
    :class="{ 'l-theme-switch-dark': isDark }"
    :aria-label="isDark ? '切换到亮色模式' : '切换到暗色模式'"
    @click="toggle"
  >
    <span class="l-theme-switch-icon">
      <svg v-if="!isDark" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
      </svg>
      <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/core'

defineOptions({
  name: 'LThemeSwitch'
})

const { isDark, toggle } = useTheme()
</script>

<style scoped>
.l-theme-switch {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background: var(--l-bg-muted);
  border-radius: var(--l-radius-full);
  cursor: pointer;
  transition: all var(--l-transition-fast);
  outline: none;
}

.l-theme-switch:hover {
  background: var(--l-bg-elevated);
  box-shadow: var(--l-shadow-md);
}

.l-theme-switch:focus-visible {
  box-shadow: 0 0 0 3px var(--l-color-primary-light);
}

.l-theme-switch-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--l-text-secondary);
  transition: transform var(--l-transition-normal);
}

.l-theme-switch:hover .l-theme-switch-icon {
  transform: rotate(15deg);
}

.l-theme-switch-dark .l-theme-switch-icon {
  color: var(--l-color-warning);
}
</style>
