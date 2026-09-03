---
title: "QQBot AI：纯前端 QQ 机器人"
title_en: "QQBot AI: Pure-frontend QQ Bot"
date: 2026-08-23
tags: ["AI", "QQ", "WebSocket", "OpenAI"]
excerpt: "纯前端、零服务器的 QQ AI 机器人。在浏览器里直接运行，连接 QQ 开放平台 WebSocket，支持群聊、私聊与频道消息，还提供 Android APK。"
excerpt_en: "A pure-frontend, zero-server QQ AI bot that runs right in the browser and talks to QQ over WebSocket — with an Android APK."
github: https://github.com/Hiweny/QQbot
live: https://hiweny.github.io/QQbot/
---

## 这是什么

**QQBot AI** 是一个纯前端、零服务器的 QQ AI 机器人。它把「QQ 机器人」这件事整个搬进了浏览器：

- 不需要自己搭服务器，也不需要买 VPS；
- 打开页面、填好配置就能用；
- 配置、会话和记忆都保存在浏览器本地。

## 界面预览

![QQBot AI 界面](https://s41.ax1x.com/2026/09/03/pnkQP9e.png)

## 为什么做它

想让 QQ 机器人变得「开箱即用」。传统的 QQ 机器人往往要部署进程、维护长连接，门槛不低。这个项目把一切收敛到一个静态页面里，让任何人打开就能把一个 AI 助手接入自己的 QQ。

## 核心能力

- **浏览器直跑**：核心页面为单文件 `index.html`，配置与数据本地保存
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

<!-- EN -->

## What it is

**QQBot AI** is a pure-frontend, zero-server QQ AI bot. It moves the whole "QQ bot" experience into the browser:

- no server to run, no VPS to buy;
- open the page, fill in the config, and it just works;
- config, conversations and memory all live in the browser.

## Screenshot

![QQBot AI UI](https://s41.ax1x.com/2026/09/03/pnkQP9e.png)

## Why I built it

I wanted a QQ bot that is truly "open and use". Traditional bots need a process, a long-lived connection and a fair amount of setup. This project folds all of that into a single static page, so anyone can plug an AI assistant into their QQ in minutes.

## Highlights

- **Browser-first**: core page is a single `index.html`; everything is stored locally
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
