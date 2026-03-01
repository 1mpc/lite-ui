# Input 输入框

通过键盘输入内容。

## 基础用法

::: demo
```vue
<template>
  <LInput v-model="value" placeholder="请输入内容" />
  <p style="margin-top: 8px; color: var(--l-text-muted);">输入值: {{ value }}</p>
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```
:::

## 禁用状态

通过 `disabled` 属性设置禁用状态。

::: demo
```vue
<template>
  <LInput v-model="value" disabled placeholder="禁用状态" />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```
:::

## 可清空

通过 `clearable` 属性设置可清空。

::: demo
```vue
<template>
  <LInput v-model="value" clearable placeholder="可清空" />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```
:::

## 尺寸

提供三种尺寸：`small`、`medium`、`large`。

::: demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <LInput v-model="value1" size="small" placeholder="小型输入框" />
    <LInput v-model="value2" size="medium" placeholder="中等输入框" />
    <LInput v-model="value3" size="large" placeholder="大型输入框" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>
```
:::

## 前缀和后缀

使用 `prefix` 和 `suffix` 插槽添加前缀和后缀内容。

::: demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <LInput v-model="value" placeholder="搜索...">
      <template #prefix>🔍</template>
    </LInput>
    <LInput v-model="value2" placeholder="输入金额">
      <template #suffix>元</template>
    </LInput>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
const value2 = ref('')
</script>
```
:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `string` | `''` |
| type | 输入框类型 | `string` | `'text'` |
| placeholder | 占位文本 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| size | 输入框尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| maxlength | 最大输入长度 | `number` | - |

### Events

| 事件 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 值改变时触发 | `(value: string) => void` |
| focus | 获得焦点时触发 | `(event: FocusEvent) => void` |
| blur | 失去焦点时触发 | `(event: FocusEvent) => void` |
| change | 值改变且失去焦点时触发 | `(value: string) => void` |
| clear | 清空时触发 | - |

### Methods

| 方法 | 说明 |
| --- | --- |
| focus | 获得焦点 |
| blur | 失去焦点 |

### Slots

| 插槽 | 说明 |
| --- | --- |
| prefix | 前缀内容 |
| suffix | 后缀内容 |
