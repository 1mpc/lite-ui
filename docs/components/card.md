# Card 卡片

通用卡片容器。

## 基础用法

::: demo
```vue
<template>
  <LCard title="卡片标题" style="max-width: 400px;">
    <p>这是卡片的内容区域，可以放置任何内容。</p>
  </LCard>
</template>
```
:::

## 玻璃态效果

通过 `glass` 属性启用玻璃态效果。

::: demo
```vue
<template>
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 12px;">
    <LCard glass style="max-width: 400px;">
      <p style="color: var(--l-text-base);">玻璃态卡片效果，背景模糊透明。</p>
    </LCard>
  </div>
</template>
```
:::

## 悬浮效果

通过 `hoverable` 属性启用悬浮效果。

::: demo
```vue
<template>
  <LCard hoverable style="max-width: 400px;">
    <p>鼠标悬浮时会有上浮效果。</p>
  </LCard>
</template>
```
:::

## 加载状态

::: demo
```vue
<template>
  <LCard loading style="max-width: 400px;">
    <p>加载中的内容</p>
  </LCard>
</template>
```
:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 卡片标题 | `string` | - |
| size | 卡片尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| bordered | 是否显示边框 | `boolean` | `true` |
| glass | 是否启用玻璃态效果 | `boolean` | `false` |
| hoverable | 是否启用悬浮效果 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| shadow | 阴影显示时机 | `'always' \| 'hover' \| 'never'` | `'always'` |

### Slots

| 插槽 | 说明 |
| --- | --- |
| default | 卡片内容 |
| title | 卡片标题 |
| extra | 卡片右上角额外内容 |
| cover | 卡片封面 |
| footer | 卡片底部 |
