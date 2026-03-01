# Button 按钮

按钮用于触发一个操作。

## 基础用法

使用 `type` 属性来定义按钮的样式。

```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <LButton>默认按钮</LButton>
    <LButton type="primary">主要按钮</LButton>
    <LButton type="success">成功按钮</LButton>
    <LButton type="warning">警告按钮</LButton>
    <LButton type="danger">危险按钮</LButton>
    <LButton type="info">信息按钮</LButton>
  </div>
</template>
```

## 尺寸

提供三种尺寸：`small`、`medium`、`large`。

```vue
<template>
  <div style="display: flex; gap: 8px; align-items: center;">
    <LButton size="small">小型按钮</LButton>
    <LButton size="medium">中等按钮</LButton>
    <LButton size="large">大型按钮</LButton>
  </div>
</template>
```

## 加载状态

通过 `loading` 属性设置按钮加载状态。

```vue
<template>
  <div style="display: flex; gap: 8px;">
    <LButton type="primary" loading>加载中</LButton>
    <LButton loading>加载中</LButton>
  </div>
</template>
```

## 禁用状态

通过 `disabled` 属性设置按钮禁用状态。

```vue
<template>
  <div style="display: flex; gap: 8px;">
    <LButton type="primary" disabled>主要按钮</LButton>
    <LButton disabled>默认按钮</LButton>
  </div>
</template>
```

## 块级按钮

通过 `block` 属性设置按钮为块级元素。

```vue
<template>
  <LButton type="primary" block>块级按钮</LButton>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| size | 按钮尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| loading | 是否加载中 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| block | 是否为块级按钮 | `boolean` | `false` |
| native-type | 原生 type 属性 | `'button' \| 'submit' \| 'reset'` | `'button'` |

### Events

| 事件 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮时触发 | `(event: MouseEvent) => void` |
