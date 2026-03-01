<template>
  <div class="app">
    <header class="header">
      <h1>Vue3-LiteUI</h1>
      <LThemeSwitch />
    </header>
    
    <main class="main">
      <section class="section">
        <h2>Button 按钮</h2>
        <div class="demo-row">
          <LButton>默认按钮</LButton>
          <LButton type="primary">主要按钮</LButton>
          <LButton type="success">成功按钮</LButton>
          <LButton type="warning">警告按钮</LButton>
          <LButton type="danger">危险按钮</LButton>
        </div>
        <div class="demo-row">
          <LButton size="small">小型</LButton>
          <LButton size="medium">中等</LButton>
          <LButton size="large">大型</LButton>
          <LButton type="primary" loading>加载中</LButton>
          <LButton type="primary" disabled>禁用</LButton>
        </div>
      </section>
      
      <section class="section">
        <h2>Input 输入框</h2>
        <div class="demo-row">
          <LInput v-model="inputValue" placeholder="请输入内容" style="width: 200px;" />
          <LInput v-model="inputValue2" clearable placeholder="可清空" style="width: 200px;" />
          <LInput v-model="inputValue3" disabled placeholder="禁用状态" style="width: 200px;" />
        </div>
      </section>
      
      <section class="section">
        <h2>AIInput 智能输入</h2>
        <LAIInput
          v-model="aiValue"
          :suggestions="suggestions"
          placeholder="输入水果名称..."
          style="width: 300px;"
          @select="handleAISelect"
        />
      </section>
      
      <section class="section">
        <h2>Card 卡片</h2>
        <div class="demo-row">
          <LCard title="基础卡片" style="width: 300px;">
            <p>这是卡片的内容区域。</p>
          </LCard>
          <LCard glass style="width: 300px;">
            <p>玻璃态卡片效果</p>
          </LCard>
          <LCard hoverable style="width: 300px;">
            <p>悬浮卡片效果</p>
          </LCard>
        </div>
      </section>
      
      <section class="section">
        <h2>Modal 弹窗</h2>
        <LButton type="primary" @click="modalVisible = true">打开弹窗</LButton>
        <LModal v-model="modalVisible" title="弹窗标题">
          <p>这是弹窗的内容区域。</p>
          <template #footer>
            <LButton @click="modalVisible = false">取消</LButton>
            <LButton type="primary" @click="modalVisible = false">确定</LButton>
          </template>
        </LModal>
      </section>
      
      <section class="section">
        <h2>Toast 消息提示</h2>
        <div class="demo-row">
          <LButton @click="showToast('info')">信息</LButton>
          <LButton type="success" @click="showToast('success')">成功</LButton>
          <LButton type="warning" @click="showToast('warning')">警告</LButton>
          <LButton type="danger" @click="showToast('error')">错误</LButton>
        </div>
      </section>
      
      <section class="section">
        <h2>CommandPalette 命令面板</h2>
        <LButton type="primary" @click="openCommandPalette">打开命令面板 (Ctrl+K)</LButton>
        <LCommandPalette
          ref="commandPaletteRef"
          :commands="commands"
          @select="handleCommandSelect"
        />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LButton, LInput, LAIInput, LCard, LModal, LToast, toast, LCommandPalette, LThemeSwitch } from '../packages'

const inputValue = ref('')
const inputValue2 = ref('')
const inputValue3 = ref('')
const aiValue = ref('')
const modalVisible = ref(false)
const commandPaletteRef = ref()

const suggestions = ['苹果', '香蕉', '橙子', '葡萄', '西瓜', '草莓', '樱桃', '芒果']

const handleAISelect = (value: string) => {
  toast.success(`选择了: ${value}`)
}

const showToast = (type: 'info' | 'success' | 'warning' | 'error') => {
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
  { id: 'search', label: '搜索', icon: '🔍', shortcut: 'Ctrl+F', action: () => toast.info('打开搜索') },
  { id: 'settings', label: '设置', icon: '⚙️', shortcut: 'Ctrl+,', action: () => toast.info('打开设置') },
  { id: 'theme', label: '切换主题', icon: '🎨', shortcut: 'Ctrl+T', action: () => toast.info('切换主题') },
  { id: 'docs', label: '查看文档', icon: '📚', action: () => toast.info('打开文档') }
]

const openCommandPalette = () => {
  commandPaletteRef.value?.open()
}

const handleCommandSelect = (command: any) => {
  toast.success(`执行命令: ${command.label}`)
}
</script>

<style>
.app {
  min-height: 100vh;
  background: var(--l-bg-base);
  color: var(--l-text-base);
  padding: var(--l-spacing-lg);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--l-spacing-xl);
  padding-bottom: var(--l-spacing-md);
  border-bottom: 1px solid var(--l-border-color);
}

.header h1 {
  font-size: 24px;
  font-weight: 600;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
}

.section {
  margin-bottom: var(--l-spacing-xl);
}

.section h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: var(--l-spacing-md);
  color: var(--l-text-base);
}

.demo-row {
  display: flex;
  gap: var(--l-spacing-md);
  flex-wrap: wrap;
  margin-bottom: var(--l-spacing-md);
}
</style>
