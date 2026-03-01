# Toast 消息提示

全局展示操作反馈信息。

## 基础用法

::: demo
```vue
<template>
  <div style="display: flex; gap: 8px;">
    <LButton @click="showInfo">信息</LButton>
    <LButton type="success" @click="showSuccess">成功</LButton>
    <LButton type="warning" @click="showWarning">警告</LButton>
    <LButton type="danger" @click="showError">错误</LButton>
  </div>
</template>

<script setup>
import { toast } from 'vue3-lite-ui'

const showInfo = () => toast.info('这是一条信息提示')
const showSuccess = () => toast.success('操作成功！')
const showWarning = () => toast.warning('请注意！')
const showError = () => toast.error('操作失败！')
</script>
```
:::

## 自定义时长

::: demo
```vue
<template>
  <LButton type="primary" @click="show">显示 5 秒</LButton>
</template>

<script setup>
import { toast } from 'vue3-lite-ui'

const show = () => {
  toast.success('这条消息将显示 5 秒', 5000)
}
</script>
```
:::

## API

### 方法

| 方法 | 说明 | 参数 |
| --- | --- | --- |
| toast | 显示消息提示 | `ToastOptions` |
| toast.info | 显示信息提示 | `message: string, duration?: number` |
| toast.success | 显示成功提示 | `message: string, duration?: number` |
| toast.warning | 显示警告提示 | `message: string, duration?: number` |
| toast.error | 显示错误提示 | `message: string, duration?: number` |
| toast.clear | 清除所有消息 | - |

### ToastOptions

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 消息内容 | `string` | - |
| type | 消息类型 | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| duration | 显示时长(ms)，设为 0 不自动关闭 | `number` | `3000` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
