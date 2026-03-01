# 主题定制

Vue3-LiteUI 使用 CSS 变量实现主题系统，可以轻松定制主题。

## 主题切换

### 使用 ThemeSwitch 组件

```vue
<template>
  <LThemeSwitch />
</template>

<script setup>
import { LThemeSwitch } from 'vue3-lite-ui'
</script>
```

### 使用 useTheme Hook

```vue
<template>
  <button @click="toggle">切换主题</button>
  <p>当前模式: {{ isDark ? '暗色' : '亮色' }}</p>
</template>

<script setup>
import { useTheme } from 'vue3-lite-ui'

const { isDark, toggle } = useTheme()
</script>
```

## CSS 变量

### 颜色变量

```css
:root {
  /* 主题色 */
  --l-color-primary: #6366f1;
  --l-color-success: #10b981;
  --l-color-warning: #f59e0b;
  --l-color-danger: #ef4444;
  --l-color-info: #3b82f6;

  /* 背景色 */
  --l-bg-base: #ffffff;
  --l-bg-elevated: #f8fafc;

  /* 文字色 */
  --l-text-base: #1e293b;
  --l-text-muted: #64748b;

  /* 边框色 */
  --l-border-color: #e2e8f0;
}
```

### 暗色主题

```css
[data-theme="dark"] {
  --l-bg-base: #0f172a;
  --l-bg-elevated: #1e293b;
  --l-text-base: #f1f5f9;
  --l-text-muted: #94a3b8;
  --l-border-color: #334155;
}
```

## 自定义主题

### 覆盖 CSS 变量

```css
:root {
  --l-color-primary: #8b5cf6;
  --l-radius-md: 6px;
}
```

### 创建自定义主题

```css
/* custom-theme.css */
:root {
  --l-color-primary: #ec4899;
  --l-color-primary-light: rgba(236, 72, 153, 0.1);
  --l-color-primary-dark: #db2777;
}

[data-theme="dark"] {
  --l-color-primary: #f472b6;
  --l-color-primary-light: rgba(244, 114, 182, 0.2);
}
```

## 间距和圆角

```css
:root {
  /* 圆角 */
  --l-radius-sm: 4px;
  --l-radius-md: 8px;
  --l-radius-lg: 12px;
  --l-radius-xl: 16px;

  /* 间距 */
  --l-spacing-xs: 4px;
  --l-spacing-sm: 8px;
  --l-spacing-md: 16px;
  --l-spacing-lg: 24px;
  --l-spacing-xl: 32px;
}
```

## 过渡动画

```css
:root {
  --l-transition-fast: 150ms ease;
  --l-transition-normal: 250ms ease;
  --l-transition-slow: 350ms ease;
}
```
