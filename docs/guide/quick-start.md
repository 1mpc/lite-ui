# 快速上手

## 安装

::: code-group

```bash [npm]
npm install vue3-lite-ui
```

```bash [yarn]
yarn add vue3-lite-ui
```

```bash [pnpm]
pnpm add vue3-lite-ui
```

:::

## 引入样式

在入口文件中引入样式：

```ts
import 'vue3-lite-ui/style.css'
```

## 完整引入

```ts
import { createApp } from 'vue'
import App from './App.vue'
import LiteUI from 'vue3-lite-ui'
import 'vue3-lite-ui/style.css'

const app = createApp(App)
app.use(LiteUI)
app.mount('#app')
```

## 按需引入

Vue3-LiteUI 支持 Tree-shaking，可以直接引入需要的组件：

```vue
<template>
  <LButton type="primary">主要按钮</LButton>
</template>

<script setup>
import { LButton } from 'vue3-lite-ui'
</script>
```

## CDN 引入

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue3-LiteUI Demo</title>
  <link rel="stylesheet" href="https://unpkg.com/vue3-lite-ui/dist/style.css">
</head>
<body>
  <div id="app">
    <l-button type="primary">主要按钮</l-button>
  </div>
  
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="https://unpkg.com/vue3-lite-ui/dist/vue3-lite-ui.umd.cjs"></script>
  <script>
    const { createApp } = Vue
    const app = createApp({})
    app.use(Vue3LiteUI.default)
    app.mount('#app')
  </script>
</body>
</html>
```

## 下一步

- [主题定制](/guide/theme) - 了解如何定制主题
- [组件列表](/components/button) - 浏览所有组件
