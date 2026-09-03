# hiweny-s-web

雨檐（Hiweny）的个人网站 —— 基于 Vite + React + TypeScript + Tailwind 构建，使用 [react-bits](https://github.com/DavidHDev/react-bits) 的高端视觉动效（Aurora / Silk / Prism 背景、Lanyard 3D 吊牌、Staggered Menu 等）。

在线访问：<https://hiweny.github.io/Hiweny-s-web/>

> 本项目 fork 自 cohenjikan.com，已将其中的个人内容全部替换为雨檐（Hiweny）自己的项目与文章。

---

## 开发

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
npm run preview  # serve dist/ locally
```

> Node 20+ 推荐。构建会引入 three.js / OGL / GSAP / framer-motion，首次安装需要一两分钟。

---

## 如何更新文章（重点）

**整个网站的内容由 Markdown 驱动**：主页的「文章」列表、每篇文章的详情页，都来自 [`src/content/articles/`](src/content/articles/) 目录下的 `.md` 文件。

### 新增一篇文章

在 `src/content/articles/` 里新建一个 `.md` 文件（文件名即文章 slug，如 `my-note.md` → 网址 `/articles/my-note`），然后在文件开头写 frontmatter 元数据：

````markdown
---
title: "我的新文章标题"
title_en: "English title"
date: 2026-09-04
tags: ["标签A", "标签B"]
excerpt: "主页列表里显示的一句话简介（中文）。"
excerpt_en: "One-line summary shown on the home list (English)."
github: https://github.com/Hiweny/xxx     # 可选：详情页显示「查看源码」按钮
live: https://xxx.github.io/xxx/          # 可选：详情页显示「在线 Demo」按钮
---

这里是正文，用 Markdown 写，可以贴图：

![图片说明](https://图片地址.png)

<!-- EN -->

This is the English version of the article body.
````

**frontmatter 字段说明：**

| 字段 | 必填 | 作用 |
|---|---|---|
| `title` | ✅ | 主页列表标题（中文） |
| `title_en` | 可选 | 英文标题，缺省时复用 `title` |
| `date` | ✅ | 日期 `YYYY-MM-DD`，**主页列表按此自动倒序排列（最新在最上）**，改它列表顺序就会变 |
| `tags` | 可选 | 标签数组，显示在文章详情页标题下方 |
| `excerpt` | 可选 | 主页列表里的一句话摘要（中文） |
| `excerpt_en` | 可选 | 英文摘要，缺省时复用 `excerpt` |
| `github` | 可选 | 详情页「查看源码」按钮 |
| `live` | 可选 | 详情页「在线 Demo」按钮 |

**正文语言：** `<!-- EN -->` 之前是中文，之后是英文。站点按浏览器语言自动切换，没写英文就直接显示中文。如果某篇只打算写一种语言，不写 `<!-- EN -->` 即可。

**注意：** `title` 和 `date` 是必填的；没有它们文章不会正常显示。正文里的图片直接写 Markdown 图片语法，支持任意公开 URL。

### 修改 / 删除一篇文章

- **改**：直接编辑对应的 `.md` 文件（改标题、改日期、改正文都行），保存后提交，主页列表和详情页会自动更新。
- **删**：删掉对应 `.md` 文件即可，文章会从主页消失。
- **在 GitHub 网页端**：进入 `src/content/articles/`，点开文件 → 右上角 ✏️ 编辑 → 保存（Commit changes），不用本地环境也能更新。

### 提交后自动部署

代码推到 `main` 分支后，GitHub Actions 会自动构建并部署，几分钟内线上生效（也支持在 **Actions** 页手动 Run workflow）。

---

## 其他内容怎么改

| 想改什么 | 在哪改 |
|---|---|
| 个人简介（About） | [`src/content/about.ts`](src/content/about.ts) 的 `zh` / `en` 字符串 |
| 联系方式 / Contact | [`src/i18n/index.ts`](src/i18n/index.ts) 与 [`src/components/sections/ContactSection.tsx`](src/components/sections/ContactSection.tsx) |
| 任意 UI 文案 | [`src/i18n/index.ts`](src/i18n/index.ts) 的 `zh` / `en` 资源对象 |
| 导航 / 板块名称 | 同上，`section.*` 与 `nav.*` |
| 主题颜色 | [`src/styles/globals.css`](src/styles/globals.css) 的 CSS 变量 |
| 站点图标 favicon | [`public/favicon.svg`](public/favicon.svg) |

---

## 部署（GitHub Pages）

仓库通过 `.github/workflows/deploy.yml` 部署到 GitHub Pages：push 到 `main` 会构建并把 `dist/` 发布到 `github-pages` 环境。

一次性设置：

1. **Settings → Pages → Build and deployment**，把 **Source** 设为 `GitHub Actions`。
2. 站点托管在 `https://hiweny.github.io/Hiweny-s-web/`（仓库名决定子路径）。

SPA 深链（如 `/articles/qqbot`）通过 `public/404.html` 的 404 重定向 + `index.html` 内的 shim 处理。
