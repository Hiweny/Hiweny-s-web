---
title: "AI Chat：简洁的纯前端智能对话"
title_en: "AI Chat: A Minimal Pure-frontend Chat App"
date: 2026-07-25
tags: ["JavaScript", "AI", "Streaming", "Markdown"]
excerpt: "不依赖任何框架的 AI 智能对话应用：多轮对话、流式响应、Markdown 渲染、代码高亮，还带快捷提问与主题切换。"
excerpt_en: "A framework-free AI chat app: multi-turn chat, streaming responses, Markdown rendering and code highlighting — with quick prompts and themes."
github: https://github.com/Hiweny/ai-chat
live: https://hiweny.github.io/ai-chat/
---

## 这是什么

**AI Chat** 是一个简洁的纯前端 AI 智能对话应用。相比各种重框架的聊天客户端，它刻意保持轻量：

- 原生 HTML / CSS / JavaScript，没有引入 React 等前端框架；
- 一个页面承载完整对话体验；
- 无需独立后端，可作为静态网页直接部署。

## 界面预览

![AI Chat 界面](https://s41.ax1x.com/2026/09/03/pnkQFcd.png)

## 核心能力

- **多轮对话**：上下文连贯的连续对话
- **流式响应**：SSE 流式输出，回复逐字呈现，支持中断与超时保护
- **OpenAI 兼容 API**：自填 Base URL、API Key、模型即可接入
- **Markdown 渲染**：回复中的标题、列表、引用、表格等正常显示
- **代码高亮**：代码块带语法着色，方便阅读与复制
- **快捷提问**：内置「诗 / 理 / 影 / 故」四个快捷提问，一键发起常见请求
- **时间问候**：根据当前时段显示「夜深了」等问候语，并展示消息时间戳
- **主题切换**：亮 / 暗主题随意切换，代码高亮主题跟随
- **全屏模式**：一键全屏沉浸对话
- **导出对话**：一键导出当前对话记录
- **本地保存**：配置与会话保存在浏览器本地
- **快捷键**：Enter 发送，Shift + Enter 换行

## 使用方式

下载或克隆仓库后，直接用浏览器打开 `index.html` 即可；如果浏览器对本地文件的模块或资源加载有限制，用任意静态 HTTP 服务启动目录即可。

在设置中配置 AI 服务的 Base URL、API Key 和模型，然后开始对话。

## 部署

这是一个静态前端项目，可直接部署到 GitHub Pages、Vercel、Netlify 等静态托管服务。

## 技术栈

原生 HTML / CSS / JavaScript，SSE 流式接入 OpenAI 兼容接口，Markdown 渲染与代码高亮均为前端实现。

<!-- EN -->

## What it is

**AI Chat** is a minimal pure-frontend AI chat application. Compared to heavy chat clients, it deliberately stays light:

- vanilla HTML / CSS / JavaScript — no React or other frameworks;
- the whole chat experience lives in one page;
- no backend required; deploy it as a static site.

## Screenshot

![AI Chat UI](https://s41.ax1x.com/2026/09/03/pnkQFcd.png)

## Highlights

- **Multi-turn chat**: coherent, context-aware conversations
- **Streaming responses**: SSE streaming, replies appear word by word; interruption and timeout protection
- **OpenAI-compatible API**: bring your own base URL, key and model
- **Markdown rendering**: headings, lists, quotes, tables and more render properly
- **Code highlighting**: syntax-colored code blocks for easy reading and copying
- **Quick prompts**: built-in "poem / science / film / story" one-tap prompts
- **Time-aware greeting**: shows late-night / time-based greetings with message timestamps
- **Themes**: light / dark switching, code-highlight theme follows
- **Fullscreen mode**: one-key immersive chat
- **Export chat**: export the current conversation with one click
- **Local storage**: config and sessions persist in the browser
- **Shortcuts**: Enter to send, Shift + Enter for a newline

## Usage

Clone or download the repo and open `index.html` directly. If the browser restricts local file modules, serve the folder with any static HTTP server.

Configure your AI service base URL, API key and model in the settings, then start chatting.

## Deploy

It is a static frontend project — deploy to GitHub Pages, Vercel, Netlify or any static host.

## Stack

Vanilla HTML / CSS / JavaScript, SSE to OpenAI-compatible endpoints, client-side Markdown rendering and code highlighting.
