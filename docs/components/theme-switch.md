# ThemeSwitch 主题切换

主题切换组件。

## 基础用法

::: demo
```vue
<template>
  <div style="display: flex; align-items: center; gap: 16px;">
    <LThemeSwitch />
    <span>点击切换主题</span>
  </div>
</template>
```
:::

## 配合 useTheme Hook

::: demo
```vue
<template>
  <div>
    <LThemeSwitch />
    <p style="margin-top: 16px;">
      当前主题: {{ isDark ? '暗色模式' : '亮色模式' }}
    </p>
    <p style="color: var(--l-text-muted);">
      模式: {{ mode }}
    </p>
  </div>
</template>

<script setup>
import { useTheme } from 'vue3-lite-ui'

const { isDark, mode } = useTheme()
</script>
```
:::

## API

### Props

无

### Events

无

## 相关 API

### useTheme Hook

```ts
const { mode, isDark, toggle, setMode } = useTheme()
```

| 属性/方法 | 说明 | 类型 |
| --- | --- | --- |
| mode | 当前模式 | `Ref<'light' \| 'dark' \| 'auto'>` |
| isDark | 是否为暗色模式 | `Ref<boolean>` |
| toggle | 切换主题 | `() => void` |
| setMode | 设置模式 | `(mode: ThemeMode) => void` |
