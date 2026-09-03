---
title: "MoeGallery：随机图 API 的整理与实测"
title_en: "MoeGallery: Curated Random-image APIs, Tested"
date: 2026-07-27
tags: ["随机图", "IndexedDB", "Service Worker"]
excerpt: "把数十个实测可用的精品二次元随机图接口收进一个全屏浏览器：分类浏览、下载、复制调用代码，还附独立实测报告。"
excerpt_en: "A fullscreen browser over dozens of field-tested anime random-image APIs — categorized browsing, download, copy code snippets, plus a benchmark report."
github: https://github.com/Hiweny/moe-gallery
live: https://hiweny.github.io/moe-gallery/
---

## 这是什么

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

<!-- EN -->

## What it is

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
