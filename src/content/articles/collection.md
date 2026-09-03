---
title: "Collection：雪线之上的本地媒体收藏夹"
title_en: "Collection: A Local Media Archive above the Snowline"
date: 2026-04-24
tags: ["收藏", "本地存储", "随机音乐"]
excerpt: "纯静态的个人媒体收藏夹：把公开分享的图片 / 视频链接整理、预览、检索，还内置网易云随机音乐、今日一言与图床工具。"
excerpt_en: "A pure-static personal media archive for organizing public image / video links — with random Netease music, a daily quote and an image-host tool."
github: https://github.com/Hiweny/collection
live: https://hiweny.github.io/collection/
---

## 这是什么

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

单文件前端页面，核心逻辑集中在 `index.html`，无构建步骤、无后端，可直接部署到 GitHub Pages 等静态托管。

<!-- EN -->

## What it is

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

A single-file frontend, logic concentrated in `index.html`. No build step, no backend — deploy to any static host.
