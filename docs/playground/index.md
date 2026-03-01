---
layout: page
title: 组件演示
---

# 组件交互演示

在这里可以直接体验所有组件的效果。

<script setup>
import { ref } from 'vue'
import { LButton, LInput, LAIInput, LCard, LModal, LToast, LCommandPalette, LThemeSwitch, toast } from '../../packages'

const inputValue = ref('')
const aiInputValue = ref('')
const modalVisible = ref(false)
const commandPaletteRef = ref()

const suggestions = ['苹果', '香蕉', '橙子', '葡萄', '西瓜', '草莓']

const showToast = (type) => {
  const messages = {
    info: '这是一条信息提示',
    success: '操作成功！',
    warning: '请注意！',
    error: '操作失败！'
  }
  toast[type](messages[type])
}

const commands = [
  { id: 'home', label: '返回首页', icon: '🏠', shortcut: 'Ctrl+H', action: () => toast.info('返回首页') },
  { id: 'search', label: '搜索文档', icon: '🔍', shortcut: 'Ctrl+F', action: () => toast.info('打开搜索') },
  { id: 'settings', label: '系统设置', icon: '⚙️', shortcut: 'Ctrl+,', action: () => toast.info('打开设置') },
  { id: 'theme', label: '切换主题', icon: '🎨', shortcut: 'Ctrl+T', action: () => toast.info('切换主题') },
  { id: 'docs', label: '查看文档', icon: '📚', action: () => toast.info('打开文档') },
  { id: 'github', label: 'GitHub 仓库', icon: '🔗', action: () => toast.info('打开 GitHub') },
  { id: 'about', label: '关于', icon: 'ℹ️', action: () => toast.info('关于 Vue3-LiteUI') }
]

const openCommandPalette = () => {
  commandPaletteRef.value?.open()
}
</script>

## 主题切换

<div style="margin: 16px 0;">
  <LThemeSwitch />
  <span style="margin-left: 12px; color: var(--vp-c-text-2);">点击切换主题</span>
</div>

## Button 按钮

<div style="margin: 16px 0; display: flex; gap: 8px; flex-wrap: wrap;">
  <LButton>默认按钮</LButton>
  <LButton type="primary">主要按钮</LButton>
  <LButton type="success">成功按钮</LButton>
  <LButton type="warning">警告按钮</LButton>
  <LButton type="danger">危险按钮</LButton>
  <LButton type="info">信息按钮</LButton>
</div>

<div style="margin: 16px 0; display: flex; gap: 8px; align-items: center;">
  <LButton size="small">小型</LButton>
  <LButton size="medium">中等</LButton>
  <LButton size="large">大型</LButton>
  <LButton type="primary" loading>加载中</LButton>
  <LButton type="primary" disabled>禁用</LButton>
</div>

## Input 输入框

<div style="margin: 16px 0; display: flex; gap: 12px; flex-wrap: wrap;">
  <LInput v-model="inputValue" placeholder="请输入内容" style="width: 200px;" />
  <LInput v-model="inputValue" clearable placeholder="可清空" style="width: 200px;" />
</div>

## AIInput 智能输入

<div style="margin: 16px 0;">
  <LAIInput
    v-model="aiInputValue"
    :suggestions="suggestions"
    placeholder="输入水果名称，按 Tab 接受建议..."
    style="width: 300px;"
  />
</div>

## Card 卡片

<div style="margin: 16px 0; display: flex; gap: 16px; flex-wrap: wrap;">
  <LCard title="基础卡片" style="width: 280px;">
    <p>这是卡片的内容区域。</p>
  </LCard>
  <LCard hoverable style="width: 280px;">
    <p>悬浮卡片效果</p>
  </LCard>
</div>

### 玻璃态卡片

<div style="margin: 16px 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 12px;">
  <LCard glass style="width: 280px;">
    <p style="margin: 0;">玻璃态卡片效果，背景模糊透明。</p>
  </LCard>
</div>

## Modal 弹窗

<div style="margin: 16px 0;">
  <LButton type="primary" @click="modalVisible = true">打开弹窗</LButton>
  <LModal v-model="modalVisible" title="弹窗标题">
    <p>这是弹窗的内容区域。</p>
    <template #footer>
      <LButton @click="modalVisible = false">取消</LButton>
      <LButton type="primary" @click="modalVisible = false">确定</LButton>
    </template>
  </LModal>
</div>

## Toast 消息提示

<div style="margin: 16px 0; display: flex; gap: 8px;">
  <LButton @click="showToast('info')">信息</LButton>
  <LButton type="success" @click="showToast('success')">成功</LButton>
  <LButton type="warning" @click="showToast('warning')">警告</LButton>
  <LButton type="danger" @click="showToast('error')">错误</LButton>
</div>

## CommandPalette 命令面板

<div style="margin: 16px 0;">
  <LButton type="primary" @click="openCommandPalette">打开命令面板 (Ctrl+K)</LButton>
  <p style="margin-top: 8px; color: var(--vp-c-text-2); font-size: 14px;">包含 7 个命令选项，支持快捷键和模糊搜索</p>
  <LCommandPalette
    ref="commandPaletteRef"
    :commands="commands"
  />
</div>
