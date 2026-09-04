---
title: "Collection：雪线之上，一个只收藏「图片 URL」的收藏夹"
title_en: "Collection: Above the Snowline — an archive that collects image URLs, not files"
date: 2026-04-24
tags: ["收藏夹", "图片URL", "图床", "防盗链", "随机音乐"]
excerpt: "因为爱攒美图又不想占相册内存，我做了个纯静态收藏夹：解析抖音/小红书图集、用图床转存对抗防盗链、用代理加载外网图，还配了随机音乐。"
excerpt_en: "I love hoarding beautiful images but hate filling my gallery — so I built a pure-static archive that parses Douyin/Xiaohongshu albums, re-hosts links to beat anti-hotlinking, proxies foreign images, and plays random music."
github: https://github.com/Hiweny/collection
live: https://hiweny.github.io/collection/
---

## 这是什么

**Collection（雪线之上）** 是一个纯静态、零后端的个人媒体收藏夹。它最核心的设计理念有点反直觉——

> **我收藏的不是图片本身，而是一张张图片在互联网上的「地址」（URL）。**

打开页面，把刷到的图集链接、散落各处的图片 URL 丢进去，它们就被整齐地收进一个本地小仓库，随时翻看、搜索、预览，还能一边看图一边听随机音乐。整个项目只有一个 `index.html`，直接丢到 GitHub Pages 就能跑。

## 界面预览

![Collection 雪线之上 界面](https://s41.ax1x.com/2026/09/03/pnkQi1H.png)

## 为什么会有它

### 起点：一个攒图癖的烦恼

我一直有收集好看图片的癖好，但一直有几个现实问题让人难受：

- **没有一个集中的地方**：美图散落在收藏夹、聊天记录、各个 App 里，想找时根本想不起来在哪；
- **存相册太占内存**：一张张保存到手机相册，积少成多，存储空间告急；
- **存了也会「吃灰」**：图片一旦沉进相册深处，就再也不会被翻出来。

于是我一直想做一个**属于自己的、轻量的图片收藏夹**。

### 转机：从一个去水印网站开始

偶然间我发现了一类网站：粘贴抖音等平台的**分享链接**，就能解析出去水印的原图 / 视频并保存，比如 [sv.bugpk.com](https://sv.bugpk.com/)。

顺着它的思路，我扒出了一批类似的**解析 API**——输入一条分享短链，接口直接返回媒体的原始直链。一个想法就此成型：

> 做一个网站，专门收藏我在抖音刷到的精美图集，而且只存原图链接。

后来有了 AI Agent 当「编程搭子」，我终于把这个想法落地：页面拿到解析出的图片原链，直接收藏起来。

### 踩坑：原链会「过期」

高兴没几天，我发现**最早收藏的图陆续裂开了**。原因是抖音、小红书这类平台的图片都有**防盗链**和时效签名，直链看起来能用，过一段时间签名失效、或来源站点校验 Referer，就再也加载不出来了[^1]。

直接收藏原链 = 把房子盖在别人随时会收走的地上，并不稳定。

### 再转机：图床「外链转存」

后来我又发现一类图床 API：**你给它一个外链，它在服务器端把图下载下来、重新托管，再返还给你一条属于图床的新直链**。这恰好完美解决了防盗链问题——

```text
平台原链（会过期）  →  图床 API 转存  →  稳定的新直链（长期可用）
```

于是工作流闭环了：**解析图集 → 提取原链 → 图床转存 → 收藏稳定链接**。这套流程也是这个收藏夹的骨架。

## 核心概念：为什么收藏的是 URL

要理解这个项目，先得理解「图片 URL」到底是什么。

互联网上的每一张图，都存放在某台服务器上，并有一个唯一地址，也就是 URL（统一资源定位符）。浏览器要显示一张图，本质上就是拿着这个地址去对应服务器把数据取回来。

所以收藏 URL，更像是**记下一幅画挂在哪面墙上，而不是把画搬回家**：

| 对比项 | 保存图片文件 | 收藏图片 URL |
| :--- | :--- | :--- |
| 占用空间 | 每张几 MB，越攒越满 | 只是一行文本，近乎为零 |
| 收藏数量 | 受存储限制 | 想收多少收多少 |
| 清晰度 | 取决于下载的版本 | 永远指向原始资源 |
| 迁移 / 备份 | 文件一大堆 | 一个 JSON 全部带走 |
| 主要风险 | 占内存、难整理 | **依赖链接存活**（所以要转存 / 代理） |

正是因为「依赖链接存活」是唯一的软肋，后面才需要图床转存和图片代理来补齐。

## 三种收藏方式

### 1. 平台图集解析（去水印）

粘贴抖音、小红书、快手、B 站、头条等平台的分享短链，页面会自动识别并解析出整套图集。目前内置识别的短链域名包括：

```text
v.douyin.com · b23.tv · v.kuaishou.com · xhslink.com · t.toutiao.com
```

解析出的图片可以**勾选后批量转存到图床**，再一次性收藏，避免逐张手动处理。

### 2. 手动拼一个 URL 图集

我并不满足于只收藏平台图集——网上任何一张图，只要有直链，都应该能收进来。于是做了一个极简的「手动图集」语法：**首行写标题，之后每行一个图片 URL，用换行分隔**即可。

```text
赛博朋克城市夜景
https://example.com/cyber-1.jpg
https://example.com/cyber-2.jpg
https://example.com/cyber-3.jpg
```

粘贴后会被自动解析成一个名为「赛博朋克城市夜景」、含 3 张图的图集，翻页浏览。

### 3. 单张图片直链

如果只是一张普通图片链接（以 `.png / .jpg / .webp / .gif / .avif` 结尾），粘贴后直接收藏为单图，最简单直接。

## 图床转存：和防盗链过招

### 什么是防盗链

图床服务商通常会校验请求头里的 `Referer`（来路），只允许自家页面引用图片，第三方站点直接引用就返回 403 或一张占位图[^1]。平台分享出来的临时直链更是带有时效签名，过期即失效。

### 外链转存的原理

「外链转存」相当于让图床服务器替你把图「搬一次家」：

1. 你把原链提交给图床接口；
2. 图床**在服务器端**请求这张图（不受浏览器防盗链限制）；
3. 图床把图片存到自己的对象存储，并生成一条新的公开直链返回；
4. 你收藏这条新直链，从此与原平台解耦，长期稳定。

项目内置了 **360 图床**与**网易图床**双通道，一个失败自动尝试另一个，还会走 CORS 代理兜底。批量转存时会弹出选择面板，可全选 / 点选要转存的图片，并实时显示进度。

> 除了项目内置的图床，也有不少不错的公开图床可选，例如 [imgchr.com](https://imgchr.com/)，适合手动上传或做第二备份。

## 外网图片与图片代理

收藏外网图片时还会遇到另一类问题：有些图在自己浏览器里就是加载不出来——可能是**跨域限制、防盗链，或是网络可达性**问题。解决办法是加一层**图片代理**。

### 代理是怎么工作的

原理同样是「找个中间人」：浏览器不直接去目标图床取图，而是请求一个代理地址，由**代理服务器**去把图取回来再转发给你。对浏览器而言，它只跟「可信、可达」的代理通信，绕开了跨域和防盗链。

用法极其简单，**在原始图片 URL 前面拼上代理前缀**即可：

```text
# 代理地址模板
https://ana.imgcloud.uk/?url=<你的图片地址>

# Netlify 部署的代理
https://acid.daoxi365.dpdns.org/api/proxy?url=<你的图片地址>
```

举个例子，假设原图地址是 `https://example.com/a.jpg`，拼接后就是：

```text
https://ana.imgcloud.uk/?url=https://example.com/a.jpg
```

| 代理 | 地址模板 | 特点 |
| :--- | :--- | :--- |
| ana | `https://ana.imgcloud.uk/?url=` | 通用图片代理，前缀拼接即用 |
| acid | `https://acid.daoxi365.dpdns.org/api/proxy?url=` | 基于 Netlify 部署的代理 |

<mark>关键就在于「前缀 + 原图 URL」</mark>：代理拿到完整目标地址后代为请求，浏览器这边就能顺利把图加载出来。

## 一边看图，一边听点音乐

收藏美图是视觉享受，要是再配上背景音乐就更惬意了，所以我顺手接了随机音乐 API：

- **网易云随机热歌**：随机播放网易云音乐热歌；
- **随机酷狗**：另一条随机音乐通道，互为备份；
- **今日一言 / 诗句**：主页的 `TODAY'S GLIMPSE` 会按时段给出应景文案，并随机拉取一言、古诗词，断网时有本地兜底；
- **每日一图卡片**：从你的收藏里随机挑一张大图展示，**点一下就换一张**，像翻盲盒一样重新发现自己存过的图。

于是整个使用场景变成：泡杯茶，打开收藏夹，随机音乐缓缓放着，一张张翻自己攒下的美图，配上一句应景的话，<del>摸鱼</del> 放松两相宜。

## 数据、隐私与部署

- **纯本地存储**：所有收藏都存在浏览器 `localStorage` 里（键名 `snowline_media_collection_v1`），不经过任何云端数据库；
- **导入 / 导出**：一键导出为 JSON 备份，换浏览器、换设备时再导入即可完整迁移；
- **零后端 / 单文件**：核心逻辑全部内联在一个 `index.html`，没有构建步骤，托管到 GitHub Pages 这类静态平台即可运行；
- **边界**：只收藏公开、本人拥有或已获授权的内容，不绕过登录、付费或私密权限。

## 技术栈一览

- **前端**：React + Tailwind 风格的玻璃拟态 UI，最终打包为单个 HTML；
- **数据**：`localStorage` 本地持久化 + JSON 导入导出；
- **外部能力**：平台链接解析 API、图床外链转存 API、图片代理、随机音乐与一言 API；
- **部署**：GitHub Pages 静态托管。

## 写在最后

这个项目本质上是一次「**用最轻的方式占有美**」的尝试：不把图片下载下来占满硬盘，而是用一行行 URL，在互联网上给自己圈一座私人画廊；再用图床和代理，把这些脆弱的链接一条条养稳。

工具不大，却把「解析 → 转存 → 收藏 → 欣赏」这条链路一点点补齐了。以后刷到好图，终于有个妥帖的归处。

[^1]: `Referer` 是浏览器请求资源时自动带上的「来路页面」字段，服务器据此判断请求是否来自被允许的站点；带签名的临时直链则会把过期时间编进 URL，一旦超时便失效。

<!-- EN -->

## What it is

**Collection (Above the Snowline / 雪线之上)** is a pure-static, zero-backend personal media archive. Its core idea is slightly counter-intuitive:

> **I don't collect the image files — I collect their addresses (URLs) on the internet.**

Drop in an album link or any scattered image URL, and it gets neatly filed into a local archive you can browse, search and preview — with random music playing in the background. The whole project is a single `index.html` that runs straight from GitHub Pages.

## Screenshot

![Collection UI](https://s41.ax1x.com/2026/09/03/pnkQi1H.png)

## Why I built it

### A hoarder's headache

I love collecting beautiful images, but the old ways hurt: there was **no single place** to keep them, saving every file **filled up my phone storage**, and once images sank into the gallery they just **collected dust**. I wanted a lightweight gallery of my own.

### A watermark-removal site gave me the idea

I stumbled on sites that take a platform **share link** and return the clean original media, such as [sv.bugpk.com](https://sv.bugpk.com/). Following that trail, I found a family of **parser APIs** that turn a short share link into direct media URLs — and the idea was born: a site to archive the gorgeous albums I scroll past, storing only the original links. With an AI Agent as my coding partner, I built it.

### The pitfall: links expire

Early on, my oldest saved images started **breaking**. Platforms like Douyin and Xiaohongshu use **anti-hotlinking** and time-limited signatures; after a while the signature expires or the `Referer` check fails and the image is gone[^1]. Saving raw links meant building on borrowed land.

### The fix: re-hosting through an image host

Then I found image-host APIs that take an external link, **download the image server-side, re-host it, and return a brand-new stable URL**. The loop finally closed:

```text
platform link (expires) -> re-host via image API -> stable new URL
```

## Core idea: why collect URLs

Every image online lives on some server and has a unique address (URL). Collecting a URL is like **noting which wall a painting hangs on instead of carrying the painting home**:

| | Saving files | Collecting URLs |
| :--- | :--- | :--- |
| Space | MBs each, adds up fast | a line of text, ~zero |
| Amount | limited by storage | unlimited |
| Quality | depends on download | always points to the original |
| Migration | piles of files | one JSON exports all |
| Risk | storage & clutter | **link survival** (hence re-hosting / proxy) |

That single weakness — link survival — is exactly why re-hosting and proxies exist.

## Three ways to collect

1. **Platform album parsing** — paste a short link from Douyin, Xiaohongshu, Kuaishou, Bilibili or Toutiao; it resolves the whole album, which you can **batch re-host and save** after picking the images you want.
2. **Hand-built URL albums** — first line is the title, every following line is an image URL:

```text
Cyberpunk city night
https://example.com/cyber-1.jpg
https://example.com/cyber-2.jpg
```

3. **Single direct image link** — any URL ending in `.png/.jpg/.webp/.gif/.avif` is saved as a one-image item.

## Re-hosting vs. anti-hotlinking

Anti-hotlinking works by checking the `Referer` header (and often a time signature), so third-party links get blocked or expire[^1]. A re-host API fetches the image **on the server side** (where browser rules don't apply), stores it, and hands back a fresh public URL — decoupling your archive from the original platform. The project ships **two hosts (360 + NetEase) with automatic fallback**, a CORS-proxy safety net, and a batch panel with select-all and progress. For manual uploads or a second backup, [imgchr.com](https://imgchr.com/) is also a solid choice.

## Foreign images & the proxy

Some foreign images simply won't load in your browser due to **CORS, anti-hotlinking or reachability**. An image proxy fixes this: instead of fetching the image directly, the browser asks a proxy server, which retrieves and relays it. You only **prepend the proxy prefix** to the original URL:

```text
https://ana.imgcloud.uk/?url=<IMAGE_URL>
https://acid.daoxi365.dpdns.org/api/proxy?url=<IMAGE_URL>
```

| Proxy | Template | Notes |
| :--- | :--- | :--- |
| ana | `https://ana.imgcloud.uk/?url=` | general-purpose, prefix-and-go |
| acid | `https://acid.daoxi365.dpdns.org/api/proxy?url=` | a Netlify-deployed proxy |

## Music while you browse

To make browsing a treat, I added random-music APIs (**Netease hot songs** and **random Kugou**, each backing the other up), a time-aware **daily quote / classical poem** with a local fallback, and a **daily-image card** that draws a random picture from your own archive — click it to roll another one and rediscover what you saved.

## Data, privacy & deployment

- **Local-first**: everything lives in the browser's `localStorage` (`snowline_media_collection_v1`), no cloud database;
- **Import / export**: one-click JSON backup and migration;
- **Single file, no backend**: logic is inlined into one `index.html`, deployed on GitHub Pages;
- **Boundaries**: public, owned or authorized content only — never bypassing logins, paywalls or private permissions.

## Stack

React + a Tailwind-style glassmorphism UI bundled into one HTML file; `localStorage` + JSON for persistence; platform parsers, re-host hosts, image proxies, and random music/quote APIs for capabilities; GitHub Pages for hosting.

## Closing thoughts

This project is an attempt to **own beauty in the lightest way**: rather than filling a drive with files, I draw a private gallery on the internet with lines of URLs — then nurse those fragile links into permanence with image hosts and proxies. Small as it is, it completes the chain **parse → re-host → archive → enjoy**, so every beautiful image finally has a proper home.

[^1]: `Referer` is the "referring page" header a browser sends automatically; servers use it to allow only whitelisted sites. Signed temporary URLs also encode an expiry time and stop working once it passes.
