# Modal 弹窗

模态对话框。

## 基础用法

::: demo
```vue
<template>
  <LButton type="primary" @click="visible = true">打开弹窗</LButton>
  
  <LModal v-model="visible" title="弹窗标题">
    <p>这是弹窗的内容区域。</p>
    <template #footer>
      <LButton @click="visible = false">取消</LButton>
      <LButton type="primary" @click="visible = false">确定</LButton>
    </template>
  </LModal>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>
```
:::

## 尺寸

提供四种尺寸：`small`、`medium`、`large`、`full`。

::: demo
```vue
<template>
  <div style="display: flex; gap: 8px;">
    <LButton @click="visible1 = true">小型弹窗</LButton>
    <LButton @click="visible2 = true">中型弹窗</LButton>
    <LButton @click="visible3 = true">大型弹窗</LButton>
  </div>
  
  <LModal v-model="visible1" size="small" title="小型弹窗">
    <p>内容</p>
  </LModal>
  
  <LModal v-model="visible2" size="medium" title="中型弹窗">
    <p>内容</p>
  </LModal>
  
  <LModal v-model="visible3" size="large" title="大型弹窗">
    <p>内容</p>
  </LModal>
</template>

<script setup>
import { ref } from 'vue'
const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
</script>
```
:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 是否显示弹窗 | `boolean` | `false` |
| title | 弹窗标题 | `string` | - |
| size | 弹窗尺寸 | `'small' \| 'medium' \| 'large' \| 'full'` | `'medium'` |
| mask | 是否显示遮罩 | `boolean` | `true` |
| maskClosable | 点击遮罩是否关闭 | `boolean` | `true` |
| showClose | 是否显示关闭按钮 | `boolean` | `true` |
| closeOnEsc | 按 ESC 是否关闭 | `boolean` | `true` |
| width | 自定义宽度 | `string \| number` | - |

### Events

| 事件 | 说明 |
| --- | --- |
| update:modelValue | 显示状态改变时触发 |
| open | 打开时触发 |
| close | 关闭时触发 |

### Slots

| 插槽 | 说明 |
| --- | --- |
| default | 弹窗内容 |
| header | 自定义头部 |
| footer | 自定义底部 |
