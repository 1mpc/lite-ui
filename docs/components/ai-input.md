# AIInput 智能输入框

带有智能提示功能的输入框组件。

## 基础用法

::: demo
```vue
<template>
  <LAIInput
    v-model="value"
    :suggestions="suggestions"
    placeholder="输入水果名称..."
    style="width: 300px;"
  />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
const suggestions = ['苹果', '香蕉', '橙子', '葡萄', '西瓜', '草莓']
</script>
```
:::

## 异步建议

支持异步获取建议列表。

::: demo
```vue
<template>
  <LAIInput
    v-model="value"
    :suggestions="fetchSuggestions"
    placeholder="搜索用户..."
    style="width: 300px;"
  />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')

const fetchSuggestions = async (query) => {
  // 模拟异步请求
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const users = ['张三', '李四', '王五', '赵六', '钱七']
  return users.filter(user => 
    user.includes(query)
  )
}
</script>
```
:::

## 使用说明

- 输入内容后会自动显示匹配的建议
- 按 `Tab` 键接受建议
- 支持异步数据源
- 内置防抖处理

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `string` | `''` |
| placeholder | 占位文本 | `string` | `'输入内容...'` |
| disabled | 是否禁用 | `boolean` | `false` |
| suggestions | 建议列表或异步函数 | `string[] \| (query: string) => Promise<string[]>` | - |
| debounce | 防抖延迟(ms) | `number` | `300` |

### Events

| 事件 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 值改变时触发 | `(value: string) => void` |
| select | 选择建议时触发 | `(value: string) => void` |
| search | 搜索时触发 | `(value: string) => void` |
