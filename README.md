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

## 如何修改内容

### 新增 / 修改一个项目

1. 把截图放进 `public/projects/<slug>/`：
   - `hero.svg` / `hero.png` — 项目卡片与详情页顶部的主视觉
   - `feature-1.svg` ... `feature-N.svg` — 特性区图片（缺失时自动显示"截图待补充"占位）
2. 打开 [`src/content/projects.ts`](src/content/projects.ts)，在 `projects` 数组新增一个条目。每个条目包含 `zh` / `en` 的 tagline、description，以及一段 **Markdown 文章**（`article` 字段），详情页会用 react-markdown 渲染这段文章。

### 编辑个人简介

直接改 [`src/content/about.ts`](src/content/about.ts) 里的 `zh` / `en` 字符串。

### 编辑任意 UI 文案

所有文案在 [`src/i18n/index.ts`](src/i18n/index.ts) 的 `zh` / `en` 资源对象里。

### 切换主题

两个深色主题定义在 [`src/styles/globals.css`](src/styles/globals.css) 的 CSS 变量中（默认 Violet → Cyan；另有 Magenta → Lime）。

---

## 部署（GitHub Pages）

仓库通过 `.github/workflows/deploy.yml` 自动部署到 GitHub Pages：任何 push 到 `main` 都会构建并把 `dist/` 发布到 `github-pages` 环境。

一次性设置：

1. **Settings → Pages → Build and deployment**，把 **Source** 设为 `GitHub Actions`。
2. 站点将托管在 `https://hiweny.github.io/Hiweny-s-web/`（仓库名决定子路径）。

SPA 深链（如 `/projects/qqbot`）通过 `public/404.html` 的 404 重定向 + `index.html` 内的 shim 处理。
