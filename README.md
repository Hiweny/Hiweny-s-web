# hiweny-s-web

Hiweny 的个人网站 —— 基于 Vite + React + TypeScript + Tailwind 构建，使用 [react-bits](https://github.com/DavidHDev/react-bits) 的高端视觉动效（Aurora / Silk / Prism 背景、Lanyard 3D 吊牌、Staggered Menu 等）。

在线访问：<https://hiweny.github.io/Hiweny-s-web/>

> 本项目 fork 自 cohenjikan.com，已将其中原作者的个人内容全部替换为 Hiweny 自己的项目与文章。

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

**正文语言（中英双语）：** 用**独占一行**的 `<!-- EN -->` 分隔——它之前是中文、之后是英文，站点按浏览器语言自动切换；只写一种语言时不加该标记即可。英文版应独立成文、自然表达，而不是逐句机翻。若正文只是想提到 `<!-- EN -->` 这个字符串，用行内代码 `` `<!-- EN -->` `` 写就不会被当成分隔符。

**注意：** `title` 和 `date` 必填，缺了文章不会正常显示。标题和 `excerpt` 尽量精简、突出核心（主页列表是扁平卡片，太长不好看）；文件名（即 slug）建议用英文、小写、单词间用连字符。

**支持的语法：**
- **GFM 全套**：表格（含 `:--` / `:--:` / `--:` 对齐）、任务列表、删除线、脚注、自动链接；
- **围栏代码块**：语法高亮 + 右上角一键复制，开头标注语言即可（如 ` ```ts `、` ```bash `、` ```json `）；
- **自动目录 TOC**：正文里写一个 `## 目录`（英文版写 `## Table of Contents`），会自动在该处生成可点击、平滑滚动的目录，默认收录 H2 / H3；
- **原生 HTML**（经 rehype-raw）：如 `<details>` 折叠、`<mark>`、`<kbd>`；
- **图片**：直接写 Markdown 图片语法，支持任意公开 URL，并自动以 `referrerpolicy="no-referrer"` 加载，可兼容多数带防盗链的图床。

完整范例见 [`src/content/articles/markdown.md`](src/content/articles/markdown.md)——它既是一篇真实文章，也是「全部语法 + 本站写作规则 + 给 AI 的代笔说明」的说明书，写新文章时可以直接把它丢给 AI 作参考。

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

仓库通过 `.github/workflows/deploy-pages.yml` 部署到 GitHub Pages：push 到 `main` 会自动构建并把 `dist/` 发布到 `github-pages` 环境（无需任何手动操作，Actions 页也可手动 Run workflow）。

一次性设置：

1. **Settings → Pages → Build and deployment**，把 **Source** 设为 `GitHub Actions`。
2. 站点托管在 `https://hiweny.github.io/Hiweny-s-web/`（仓库名决定子路径）。

SPA 深链（如 `/articles/qqbot`）通过 `public/404.html` 的 404 重定向 + `index.html` 内的 shim 处理。
