export type Locale = 'zh' | 'en';
export interface Localized {
  zh: string;
  en: string;
}
export interface ProjectFeature {
  title: Localized;
  description: Localized;
  /** Path under /public, e.g. /projects/qqbot/feature-1.svg. Falls back to placeholder when missing. */
  image: string;
}
/** A single source repo. */
export interface RepoLink {
  label: Localized;
  url: string;
}
export interface ProjectDetail {
  slug: string;
  name: string;
  tagline: Localized;
  description: Localized;
  tags: string[];
  githubUrl?: string;
  repos?: RepoLink[];
  liveUrl?: string;
  heroImage: string;
  features: ProjectFeature[];
  techStack: string[];
  /** Markdown article body, rendered on the project detail page. */
  article: Localized;
}

/**
 * Resolve a project asset under the deployment base path so it works both in
 * local dev (base "/") and on GitHub Pages (base "/Hiweny-s-web/").
 */
export const projectAsset = (path: string): string =>
  /^https?:\/\//.test(path) ? path : import.meta.env.BASE_URL + path.replace(/^\//, '');

export const projects: ProjectDetail[] = [
  {
    slug: 'qqbot',
    name: 'QQBot AI',
    tagline: {
      zh: '纯前端、零服务器的 QQ AI 机器人。在浏览器里直接运行，连接 QQ 开放平台 WebSocket，支持群聊、私聊与频道消息。',
      en: 'A pure-frontend, zero-server QQ AI bot. Runs right in the browser, talks to QQ Open Platform over WebSocket, and handles groups, private chats and channels.'
    },
    description: {
      zh: 'QQBot AI 是一个完全跑在浏览器里的 QQ 机器人：没有后端、没有服务器，一个 `index.html` 就能开机即用。它通过 QQ 开放平台的 WebSocket 收消息，再调用任意 OpenAI 兼容的 AI 接口生成回复。',
      en: 'QQBot AI is a QQ bot that runs entirely in the browser — no backend, no server, a single `index.html` and it is live. It receives messages through QQ Open Platform’s WebSocket and replies via any OpenAI-compatible AI endpoint.'
    },
    tags: ['HTML', 'WebSocket', 'AI', 'OpenAI'],
    githubUrl: 'https://github.com/Hiweny/QQbot',
    liveUrl: 'https://hiweny.github.io/QQbot/',
    heroImage: 'https://s41.ax1x.com/2026/09/03/pnkQP9e.png',
    features: [
      {
        title: { zh: '浏览器直跑 · 零服务器', en: 'Runs in the browser' },
        description: {
          zh: '核心页面是单文件 `index.html`，配置与会话数据保存在浏览器本地，不需要为机器人单独部署任何后端。',
          en: 'The core is a single `index.html`; config and conversations stay in the browser, so there is no backend to deploy.'
        },
        image: '/projects/qqbot/feature-1.svg'
      },
      {
        title: { zh: '多渠道 · 多模型', en: 'Multi-channel, multi-model' },
        description: {
          zh: '支持 QQ 群 @、C2C 私聊和频道消息；接入任意 OpenAI 兼容 API，可自由配置 Base URL、Key 与模型。',
          en: 'Supports group mentions, C2C private chats and channel messages; plugs into any OpenAI-compatible API with configurable base URL, key and model.'
        },
        image: '/projects/qqbot/feature-2.svg'
      },
      {
        title: { zh: '记忆 · 搜索 · APK', en: 'Memory, search & APK' },
        description: {
          zh: '带长期记忆、摘要归档与 Tavily 联网搜索；另有 Android WebView 版和后台保活能力的 APK 发行包。',
          en: 'Comes with long-term memory, summary archives and Tavily web search; an Android WebView APK with background keep-alive is also released.'
        },
        image: '/projects/qqbot/feature-3.svg'
      }
    ],
    techStack: ['HTML / CSS / JS', 'WebSocket', 'OpenAI 兼容 API', 'LocalStorage', 'Android WebView'],
    article: {
      zh: `## 这是什么
**QQBot AI** 是一个纯前端、零服务器的 QQ AI 机器人。它把「QQ 机器人」这件事整个搬进了浏览器：
- 不需要自己搭服务器，也不需要买 VPS；
- 打开页面、填好配置就能用；
- 配置、会话和记忆都保存在浏览器本地。

## 界面预览
![QQBot AI 界面](https://s41.ax1x.com/2026/09/03/pnkQP9e.png)

## 为什么做它
想让 QQ 机器人变得「开箱即用」。传统的 QQ 机器人往往要部署进程、维护长连接，门槛不低。这个项目把一切收敛到一个静态页面里，让任何人打开就能把一个 AI 助手接入自己的 QQ。

## 核心能力
- **浏览器直跑**：核心页面为单文件 \`index.html\`，配置与数据本地保存
- **多渠道接入**：QQ 群 @、C2C 私聊、频道消息
- **模型自由**：支持任意 OpenAI 兼容接口，可自填 Base URL / API Key / 模型名
- **消息体验**：消息分条、连续消息合并
- **记忆系统**：长期记忆、摘要归档与记忆管理；支持置顶记忆，以及用户明确要求「记住」时的即时入库
- **联网搜索**：集成 Tavily，并支持 OpenAI 原生 Function Calling 工具循环，让机器人能主动查最新信息
- **移动端**：提供 Android WebView 版本与后台保活（Wake Lock）能力

## Android APK
项目通过 GitHub Releases 发布 Android 安装包，带后台保活能力，可直接下载装到手机：
- APK 下载：<https://github.com/Hiweny/QQbot/releases>

## 快速开始
1. 打开[在线页面](https://hiweny.github.io/QQbot/)；
2. 在 QQ 开放平台创建机器人，准备好 AppID / AppSecret；
3. 在设置里填好 QQ 与 AI 服务配置；
4. 启动机器人，在测试群或私聊里使用。

## 技术栈
纯原生 HTML / CSS / JavaScript，WebSocket 直连 QQ 开放平台，AI 侧走 OpenAI 兼容协议。无框架、无构建步骤，单文件即可部署到任意静态托管。

## 说明
本项目仅供学习交流，请遵守 QQ 开放平台及相关服务的使用规范。

## 项目地址
- GitHub 仓库：<https://github.com/Hiweny/QQbot>
- 在线体验：<https://hiweny.github.io/QQbot/>
- Android APK：<https://github.com/Hiweny/QQbot/releases>`,
      en: `## What it is
**QQBot AI** is a pure-frontend, zero-server QQ AI bot. It moves the whole "QQ bot" experience into the browser:
- no server to run, no VPS to buy;
- open the page, fill in the config, and it just works;
- config, conversations and memory all live in the browser.

## Screenshot
![QQBot AI UI](https://s41.ax1x.com/2026/09/03/pnkQP9e.png)

## Why I built it
I wanted a QQ bot that is truly "open and use". Traditional bots need a process, a long-lived connection and a fair amount of setup. This project folds all of that into a single static page, so anyone can plug an AI assistant into their QQ in minutes.

## Highlights
- **Browser-first**: core page is a single \`index.html\`; everything is stored locally
- **Multi-channel**: group mentions, C2C private chats, channel messages
- **Model-agnostic**: any OpenAI-compatible endpoint — set your own base URL, key and model
- **Better messages**: split / merge long messages for cleaner replies
- **Memory**: long-term memory, summary archives and memory management; pinned memories, plus instant capture when you tell it to "remember"
- **Web search**: Tavily integration plus a native OpenAI Function Calling loop, so the bot actively looks up fresh information
- **Mobile**: an Android WebView build with background keep-alive (Wake Lock)

## Android APK
The project ships Android packages via GitHub Releases, with background keep-alive — download and install directly:
- APK download: <https://github.com/Hiweny/QQbot/releases>

## Quick start
1. Open the [live page](https://hiweny.github.io/QQbot/);
2. Create a bot on QQ Open Platform and prepare AppID / AppSecret;
3. Fill in QQ and AI service configs in the settings;
4. Start the bot and try it in a test group or private chat.

## Stack
Vanilla HTML / CSS / JavaScript, WebSocket to QQ Open Platform, OpenAI-compatible protocol on the AI side. No framework, no build step — one file, deployable to any static host.

> For learning and communication only — please follow QQ Open Platform and service usage policies.

## Links
- GitHub repository: <https://github.com/Hiweny/QQbot>
- Live demo: <https://hiweny.github.io/QQbot/>
- Android APK: <https://github.com/Hiweny/QQbot/releases>`
    }
  },
  {
    slug: 'collection',
    name: 'Collection · 雪线之上',
    tagline: {
      zh: '一个纯静态的个人媒体收藏夹：把公开分享的图片 / 视频链接整理、预览、检索，全部数据保存在本地。',
      en: 'A pure-static personal media collection: organize, preview and search publicly shared image / video links — all data stays local.'
    },
    description: {
      zh: '雪线之上（Collection）是一个纯静态的个人媒体收藏工具，用来整理公开分享的图片 / 视频链接。粘贴链接、本地保存、图片视频预览、搜索与类型筛选，一套流程都在浏览器里完成。',
      en: 'Collection (雪线之上) is a pure-static tool for organizing publicly shared image / video links. Paste a link, save locally, preview, search and filter — all within the browser.'
    },
    tags: ['HTML', '收藏', '本地存储'],
    githubUrl: 'https://github.com/Hiweny/collection',
    liveUrl: 'https://hiweny.github.io/collection/',
    heroImage: 'https://s41.ax1x.com/2026/09/03/pnkQi1H.png',
    features: [
      {
        title: { zh: '粘贴即收藏', en: 'Paste to save' },
        description: {
          zh: '粘贴抖音、小红书等公开分享链接尝试解析，也可以直接收藏图片 URL。',
          en: 'Paste a Douyin / Xiaohongshu share link to try parsing it, or just save a direct image URL.'
        },
        image: '/projects/collection/feature-1.svg'
      },
      {
        title: { zh: '预览与检索', en: 'Preview & search' },
        description: {
          zh: '图片与视频内联预览，支持搜索与类型筛选；收藏数据保存在浏览器本地，可 JSON 导入导出。',
          en: 'Inline image / video previews with search and type filters; data is saved in the browser and can be imported / exported as JSON.'
        },
        image: '/projects/collection/feature-2.svg'
      }
    ],
    techStack: ['HTML / CSS / JS', 'LocalStorage', 'JSON 导入导出'],
    article: {
      zh: `## 这是什么
**Collection（雪线之上）** 是一个纯静态的个人媒体收藏夹，用来整理公开分享的图片 / 视频链接。
灵感来自一个朴素的需求：平时刷到的公开分享链接、喜欢的图片 URL，散落在各处很难找回。这个工具把它们统一收进一个本地小仓库，随时可以翻看。

## 界面预览
![Collection 界面](https://s41.ax1x.com/2026/09/03/pnkQi1H.png)

## 核心能力
- **粘贴即收藏**：粘贴抖音、小红书等公开分享链接并尝试解析；也支持直接收藏图片 URL 与手动收藏
- **内联预览**：图片与视频直接在页面里预览
- **搜索与筛选**：按关键词搜索、按类型过滤，支持全选 / 取消全选与批量操作
- **本地保存**：收藏数据保存在浏览器本地，不依赖任何云端数据库
- **导入导出**：JSON 一键备份 / 迁移

## 随机音乐
不只是收藏夹，它还内置了随机音乐小工具：
- **网易云随机音乐 / 热歌榜**：一键随机播放网易云音乐
- **随机酷狗**：随机播放酷狗音乐
- **今日一言**：主页的 "TODAY'S GLIMPSE" 每日一句，随机一言 API + 本地兜底，点击即可切换

## 图床工具
内置「图床工具 · 外链转存」：可以把外链图片一键转存到图床，方便长期保存与引用。

## 隐私与边界
- 数据默认只存在你自己的浏览器里，本项目不提供云端数据库；
- 链接解析依赖第三方公开接口，其稳定性取决于第三方服务当前状态；
- 仅用于收藏公开、本人拥有或已获授权的内容，不绕过登录、付费、DRM 或私密权限。

## 技术栈
单文件前端页面，核心逻辑集中在 \`index.html\`，无构建步骤、无后端，可直接部署到 GitHub Pages 等静态托管。

## 项目地址
- GitHub 仓库：<https://github.com/Hiweny/collection>
- 在线体验：<https://hiweny.github.io/collection/>`,
      en: `## What it is
**Collection (雪线之上)** is a pure-static personal media collection tool for organizing publicly shared image / video links.
It started from a simple need: public share links and image URLs I came across were scattered everywhere and hard to find later. This tool gathers them into a small local archive you can always flip through.

## Screenshot
![Collection UI](https://s41.ax1x.com/2026/09/03/pnkQi1H.png)

## Highlights
- **Paste to save**: paste a Douyin / Xiaohongshu share link to try parsing it, or save a direct image URL; manual saving supported too
- **Inline previews**: images and videos preview right in the page
- **Search & filter**: keyword search, type filtering, select-all / batch operations
- **Local storage**: everything is saved in the browser — no cloud database
- **Import / export**: one-click JSON backup / migration

## Random music
It is more than a collection box — it also packs random-music widgets:
- **Netease random music / hot hits**: play random Netease Cloud Music tracks
- **Random Kugou**: random Kugou music playback
- **Today's Glimpse**: a daily quote on the home page — random one-liner API with a local fallback, tap to switch

## Image-hosting tool
A built-in "external-link re-host" tool: move external images to an image host in one click for long-term storage and reuse.

## Privacy & boundaries
- Data stays in your browser by default; this project has no cloud database
- Link parsing relies on third-party public APIs whose stability is up to those services
- For public, owned or authorized content only — never bypasses logins, paywalls, DRM or private permissions

## Stack
A single-file frontend, logic concentrated in \`index.html\`. No build step, no backend — deploy to any static host.

## Links
- GitHub repository: <https://github.com/Hiweny/collection>
- Live demo: <https://hiweny.github.io/collection/>`
    }
  },
  {
    slug: 'ai-chat',
    name: 'AI Chat',
    tagline: {
      zh: '简洁优雅的纯前端 AI 智能对话应用：多轮对话、流式响应、Markdown 渲染、代码高亮，一个页面搞定。',
      en: 'A clean, elegant pure-frontend AI chat app: multi-turn conversations, streaming responses, Markdown rendering and code highlighting in one page.'
    },
    description: {
      zh: 'AI Chat 是一个纯前端的 AI 智能对话应用。不依赖任何前端框架，原生 HTML / CSS / JavaScript 实现，支持多轮对话、流式响应、主题切换，以及 Markdown 渲染与代码高亮。',
      en: 'AI Chat is a pure-frontend AI chat application. Built with vanilla HTML / CSS / JavaScript — no framework — it supports multi-turn chat, streaming, theme switching, Markdown rendering and code highlighting.'
    },
    tags: ['JavaScript', 'AI', 'Streaming', 'Markdown'],
    githubUrl: 'https://github.com/Hiweny/ai-chat',
    liveUrl: 'https://hiweny.github.io/ai-chat/',
    heroImage: 'https://s41.ax1x.com/2026/09/03/pnkQFcd.png',
    features: [
      {
        title: { zh: '流式对话', en: 'Streaming chat' },
        description: {
          zh: '多轮对话 + 流式响应，回复逐字呈现；OpenAI 兼容 API 可自由配置。',
          en: 'Multi-turn conversations with streaming responses that appear word by word; any OpenAI-compatible API is configurable.'
        },
        image: '/projects/ai-chat/feature-1.svg'
      },
      {
        title: { zh: 'Markdown 与代码', en: 'Markdown & code' },
        description: {
          zh: '回复内容支持 Markdown 渲染与代码高亮，适合写代码、做笔记、看文档。',
          en: 'Replies render Markdown and highlight code — great for coding, note-taking and reading docs.'
        },
        image: '/projects/ai-chat/feature-2.svg'
      },
      {
        title: { zh: '主题切换 · 本地保存', en: 'Themes & local storage' },
        description: {
          zh: '支持主题切换；配置与会话保存在浏览器本地，无需独立后端即可静态部署。',
          en: 'Theme switching included; config and sessions persist in the browser, deployable as a static site with no backend.'
        },
        image: '/projects/ai-chat/feature-3.svg'
      }
    ],
    techStack: ['HTML / CSS / JS', 'OpenAI 兼容 API', 'SSE 流式', 'Markdown 渲染', '代码高亮'],
    article: {
      zh: `## 这是什么
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
下载或克隆仓库后，直接用浏览器打开 \`index.html\` 即可；如果浏览器对本地文件的模块或资源加载有限制，用任意静态 HTTP 服务启动目录即可。
在设置中配置 AI 服务的 Base URL、API Key 和模型，然后开始对话。

## 部署
这是一个静态前端项目，可直接部署到 GitHub Pages、Vercel、Netlify 等静态托管服务。

## 技术栈
原生 HTML / CSS / JavaScript，SSE 流式接入 OpenAI 兼容接口，Markdown 渲染与代码高亮均为前端实现。

## 项目地址
- GitHub 仓库：<https://github.com/Hiweny/ai-chat>
- 在线体验：<https://hiweny.github.io/ai-chat/>`,
      en: `## What it is
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
Clone or download the repo and open \`index.html\` directly. If the browser restricts local file modules, serve the folder with any static HTTP server.
Configure your AI service base URL, API key and model in the settings, then start chatting.

## Deploy
It is a static frontend project — deploy to GitHub Pages, Vercel, Netlify or any static host.

## Stack
Vanilla HTML / CSS / JavaScript, SSE to OpenAI-compatible endpoints, client-side Markdown rendering and code highlighting.

## Links
- GitHub repository: <https://github.com/Hiweny/ai-chat>
- Live demo: <https://hiweny.github.io/ai-chat/>`
    }
  },
  {
    slug: 'moe-gallery',
    name: 'MoeGallery',
    tagline: {
      zh: '随机图 API 全屏浏览器：毛玻璃 UI、响应式设计，并整理了大量随机图接口的实测记录。',
      en: 'A fullscreen random-image API gallery with a glassmorphism UI and responsive design — plus a hands-on report of many random-image APIs.'
    },
    description: {
      zh: 'MoeGallery 是一个用于整理、测试和调用随机图片 API 的前端项目。它把几十个随机图接口收进一个全屏浏览器里，带毛玻璃 UI、移动端手势优化、收藏与本地持久化，并附一份独立的 API 文档与实测报告。',
      en: 'MoeGallery is a frontend project for organizing, testing and calling random-image APIs. It bundles dozens of such APIs into a fullscreen browser with a glassmorphism UI, mobile gestures, favorites with local persistence, plus a standalone API docs page and benchmark report.'
    },
    tags: ['HTML', 'Random API', 'IndexedDB', 'PWA'],
    githubUrl: 'https://github.com/Hiweny/moe-gallery',
    liveUrl: 'https://hiweny.github.io/moe-gallery/',
    heroImage: 'https://s41.ax1x.com/2026/09/03/pnkQkjA.png',
    features: [
      {
        title: { zh: '全屏浏览 · 毛玻璃 UI', en: 'Fullscreen glass UI' },
        description: {
          zh: '全屏浏览随机图，毛玻璃风格界面，横竖屏自适应与移动端滑动手势优化。',
          en: 'Fullscreen random-image browsing with a glassmorphism UI, portrait / landscape adaption and mobile swipe gestures.'
        },
        image: '/projects/moe-gallery/feature-1.svg'
      },
      {
        title: { zh: '接口实测与文档', en: 'API benchmarks & docs' },
        description: {
          zh: '独立 API 文档页面与实测报告，记录返回方式、速度、分辨率与稳定性；Service Worker 代理与接口回退提升可用性。',
          en: 'A standalone API docs page and benchmark report covering response shape, speed, resolution and stability; Service Worker proxy with fallback improves reliability.'
        },
        image: '/projects/moe-gallery/feature-2.svg'
      },
      {
        title: { zh: '收藏与持久化', en: 'Favorites & persistence' },
        description: {
          zh: '真实图片 URL 收藏，IndexedDB 本地持久化，敏感词自动脱敏。',
          en: 'Save real image URLs, persist with IndexedDB, and auto-redact sensitive words.'
        },
        image: '/projects/moe-gallery/feature-3.svg'
      }
    ],
    techStack: ['HTML / CSS / JS', 'Service Worker', 'IndexedDB', '随机图 API'],
    article: {
      zh: `## 这是什么
**MoeGallery** 是一个随机图 API 的「整理 + 测试 + 调用」前端项目。它把数十个实测可用的精品二次元随机图接口统一收进一个全屏浏览器里，同时作为一份持续更新的接口实测资料库。

## 界面预览
![MoeGallery 界面](https://s41.ax1x.com/2026/09/03/pnkQkjA.png)

## 核心能力
- **全屏浏览**：随机图一键全屏切换，毛玻璃 UI
- **接口整理**：内置「次元 · 二次元」「次元 · 横屏」「Jitsu · 二次元」「LoliAPI 横 / 竖屏」等实测可用的精品二次元图源
- **翻页与手势**：上一张 / 下一张（← → 快捷键），移动端滑动切换
- **下载**：一键下载当前图片
- **复制**：复制图片 URL，或复制完整的 API 调用代码（cURL / HTML / JS 示例）
- **API 信息**：每个图源的接口弹窗，标注 endpoint、返回格式、实测分辨率与稳定性
- **实测记录**：API 返回方式、速度、分辨率与稳定性实测档案，附独立实测报告文档
- **可靠性**：Service Worker 代理与接口回退，某个图源挂了也能自动切换
- **收藏**：真实图片 URL 收藏，IndexedDB 本地持久化
- **内容安全**：敏感词脱敏

## 技术栈
原生 HTML / CSS / JavaScript，Service Worker 做代理与回退，IndexedDB 本地持久化。无需后端数据库，可直接部署到 GitHub Pages 等静态托管。

## 说明
项目中的随机图片接口来自第三方服务，其稳定性、速度、防盗链策略和内容可能随时变化；README 中的测试结果仅代表测试时的情况，不保证长期有效。

## 项目地址
- GitHub 仓库：<https://github.com/Hiweny/moe-gallery>
- 在线体验：<https://hiweny.github.io/moe-gallery/>`,
      en: `## What it is
**MoeGallery** is a frontend project for organizing, testing and calling random-image APIs. It bundles dozens of field-tested anime random-image endpoints into a single fullscreen browser, and doubles as a continuously-updated benchmark database for those APIs.

## Screenshot
![MoeGallery UI](https://s41.ax1x.com/2026/09/03/pnkQkjA.png)

## Highlights
- **Fullscreen browsing**: one-key fullscreen switching, glassmorphism UI
- **Curated sources**: "次元 · 二次元", "次元 · 横屏", "Jitsu · 二次元", "LoliAPI portrait/landscape" and more tested anime sources
- **Paging & gestures**: previous / next (arrow-key shortcuts), swipe to switch on mobile
- **Download**: one-click download of the current image
- **Copy**: copy the image URL, or the full API call snippets (cURL / HTML / JS)
- **API info modal**: per-source endpoint, response format, measured resolution and stability
- **Benchmarks**: measured response shape, speed, resolution and stability, with a standalone report document
- **Reliability**: Service Worker proxy with fallback — when one API dies, it switches
- **Favorites**: save real image URLs, persisted with IndexedDB
- **Safety**: sensitive-word redaction

## Stack
Vanilla HTML / CSS / JavaScript, Service Worker for proxy & fallback, IndexedDB for persistence. No backend database — deploy to any static host.

> The random-image APIs come from third parties; their stability, speed, anti-hotlink policies and content can change at any time. Benchmark results reflect only the time of testing.

## Links
- GitHub repository: <https://github.com/Hiweny/moe-gallery>
- Live demo: <https://hiweny.github.io/moe-gallery/>`
    }
  },
];


export const getProjectBySlug = (slug: string): ProjectDetail | undefined =>
  projects.find((p) => p.slug === slug);
