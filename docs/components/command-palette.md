# CommandPalette 命令面板

类似 VS Code 的命令面板组件。

## 基础用法

::: demo
```vue
<template>
  <div>
    <LButton type="primary" @click="openPalette">打开命令面板</LButton>
    <p style="margin-top: 8px; color: var(--l-text-muted);">或按 Ctrl+K 快捷键打开</p>
    
    <LCommandPalette
      ref="paletteRef"
      :commands="commands"
      @select="handleSelect"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { toast } from 'vue3-lite-ui'

const paletteRef = ref()

const commands = [
  { id: 'home', label: '返回首页', icon: '🏠', shortcut: 'Ctrl+H', action: () => toast.info('返回首页') },
  { id: 'search', label: '搜索', icon: '🔍', shortcut: 'Ctrl+F', action: () => toast.info('打开搜索') },
  { id: 'settings', label: '设置', icon: '⚙️', shortcut: 'Ctrl+,', action: () => toast.info('打开设置') },
  { id: 'theme', label: '切换主题', icon: '🎨', shortcut: 'Ctrl+T', action: () => toast.info('切换主题') },
  { id: 'docs', label: '查看文档', icon: '📚', action: () => toast.info('打开文档') }
]

const openPalette = () => {
  paletteRef.value?.open()
}

const handleSelect = (command) => {
  toast.success(`执行命令: ${command.label}`)
}
</script>
```
:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| commands | 命令列表 | `Command[]` | `[]` |
| shortcut | 快捷键 | `string` | `'ctrl+k'` |

### Command 类型

```ts
interface Command {
  id: string
  label: string
  icon?: string
  shortcut?: string
  action: () => void
}
```

### Events

| 事件 | 说明 | 回调参数 |
| --- | --- | --- |
| open | 打开时触发 | - |
| close | 关闭时触发 | - |
| select | 选择命令时触发 | `(command: Command) => void` |

### Methods

| 方法 | 说明 |
| --- | --- |
| open | 打开命令面板 |
| close | 关闭命令面板 |
