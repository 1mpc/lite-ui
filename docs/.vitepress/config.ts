import { defineConfig } from 'vitepress'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  title: 'Vue3-LiteUI',
  description: '轻量、现代、智能的 Vue 3 组件库',
  lang: 'zh-CN',
  base: '/lite-ui/',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/button' },
      { text: '演示', link: '/playground/' },
      { text: 'GitHub', link: 'https://github.com/1mpc/lite-ui.git' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '快速上手', link: '/guide/quick-start' },
            { text: '主题定制', link: '/guide/theme' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'Card 卡片', link: '/components/card' }
          ]
        },
        {
          text: '特色组件',
          items: [
            { text: 'AIInput 智能输入', link: '/components/ai-input' },
            { text: 'CommandPalette 命令面板', link: '/components/command-palette' },
            { text: 'ThemeSwitch 主题切换', link: '/components/theme-switch' }
          ]
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Modal 弹窗', link: '/components/modal' },
            { text: 'Toast 消息提示', link: '/components/toast' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/1mpc/lite-ui.git' }
    ],
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2025 Vue3-LiteUI'
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../packages')
      }
    }
  }
})
