---
title: "DeepBridge：微信桥接"
title_en: "DeepBridge: Bridging DeepSeek into WeChat"
date: "2026-09-11"
tags: ["DeepSeek", "微信", "Android", "自动化", "提示词工程"]
excerpt: "一个几百 KB 的 APK，经 ClawBot 与 iLink 协议把 DeepSeek 官网接进微信：能发图片和文件、有长期记忆、会拆多条消息、能防撤回，还做了深色全屏与后台常驻。"
excerpt_en: "A few-hundred-KB Android app that wires the DeepSeek website into WeChat via ClawBot and the iLink protocol: send images and files, keep long-term memory, split replies into multiple messages, anti-recall, with dark fullscreen UI and background resilience."
github: https://github.com/Hiweny/deepbridge
live: https://github.com/Hiweny/deepbridge/releases/latest
---

## 目录

## 当 DeepSeek 住进微信

我又围绕 **DeepSeek** 折腾出了一个小项目，名字叫 **DeepBridge（微信桥接）**。

> 它做的事情一句话就能说清：让 DeepSeek 直接「住进」你的微信——你在聊天框里发文字、发图片、甩文件，回你的都是 DeepSeek。

以前想用 DeepSeek，总得在网页和 App 之间来回切；现在不用了，**微信本身就是对话框**。我借助微信里的 ClawBot，再写了一段注入脚本把它和 DeepSeek 官网搭上线，消息一来一回之间，两个原本不相干的东西就这样被我「桥」了起来。从最早只能收发文字，到现在能传图片文件、能记住上下文、还能像真人一样一句句连发，它已经被我打磨得相当顺手。

## 它到底做了什么

实际体验非常直接：

1. 我在微信里像平常一样发一句话、一张图，甚至一个 PDF；
2. 文字被悄悄填进 DeepSeek 官网的输入框，图片或文件则被放进官网的上传控件，**由官网自己完成上传和解析**，然后一起自动发送；
3. DeepSeek 开始逐字生成，生成完之后，回复被完整截取下来；
4. 回复被清洗成适合微信阅读的纯文本，必要时拆成好几条，再原路返回到我的聊天里。

整个过程我不需要碰 DeepSeek 的界面，手机上只留一个微信就够了。而且这个桥接 APK **只有几百 KB**，装上试试几乎没有成本。

## 原理：一座「往返」的桥

整套方案并不复杂，核心就是一条消息的往返链路：

```text
微信  ⇄  ClawBot  ⇄ (iLink 协议) ⇄  本机 App + 注入脚本  ⇄  DeepSeek 官网
```

拆开来看：

- **微信 → DeepSeek（去程）**：消息从微信发出，经 ClawBot、通过 **iLink 协议**长轮询到我手机上。文本用原生方式填进官网输入框；图片和文件则先从微信 CDN 下载、解密，再构造成浏览器里的文件对象，塞进官网的上传控件，最后等发送键亮起自动点下去。
- **DeepSeek → 微信（回程）**：脚本钩住页面的网络请求，解析 DeepSeek 的流式返回，只取正式回答、过滤掉思考过程，等它生成结束，再沿同一条链路送回微信。

所谓「桥接」，本质上就是我站在中间，**替你自动完成「整理内容、送到 DeepSeek、等回复、再搬回微信」这一整套手动操作**。有个设计我很坚持：DeepSeek 这一侧的所有动作都发生在我自己登录的网页里，不内置密钥、不绕过登录，连文件上传的人机校验都交给官网自己处理——这样官网怎么更新，这座桥都不容易坏。

## 几个我最喜欢的设计

### 人格提示词，加上不会断片的长期记忆

我在本地留了一份可自定义的**人格提示词**（也就是 system prompt），想让 DeepSeek 用什么角色、什么语气说话，改这一段就行。

这里有个现实问题：对话一长，上下文会越来越臃肿，模型很容易「聊着聊着就忘了自己是谁」。所以我让它**自动把更早的对话压缩成记忆摘要**，连同人格提示词一起带下去；攒到一定轮数就自动开一个新对话、但把摘要保留下来。摘要篇幅我没有写死——信息少就从简，信息多才展开，在几百到三千字之间自适应。这样一来，**人格和关键记忆能一直延续下去**，而不是开个头就散架。

### 用 `\` 拆成多条消息，更像活人

真人在微信里很少一上来甩一大段，而是一句句、断断续续地连发。为了让回复更有「活人感」，我让 DeepSeek 的一次回复可以用半角反斜杠 `\` 分隔，系统按 `\` 切成多条、按真人节奏逐条发出。

这件事说起来简单，难点在于模型常常「忘了」输出分隔符，或者错用换行、斜杠来代替。于是我把内置规则打磨了很多版：明确告诉它分隔符只能是键盘上那个半角 `\`，配上正例和反例，说清哪些写法是错的；同时也约束它普通回复就保持一条、别为了拆而拆。现在它该碎的时候碎、该整的时候整，分寸感刚好。

### 图片和文件，也能直接甩给它

DeepSeek 官网后来把几个模式统一了，输入区本身就能收图片和文档，我就把这条链路补齐了：微信里发来的图片或文件（PDF、Word、Excel、文本、代码、截图都行），App 会自动从微信侧下载解密，大图先压缩、文档原样透传，再交给官网上传解析，最后连同我配的一句话一起发出。于是「帮我总结一下这个 PDF」「看看这张截图哪里报错了」，在微信里一步就能到位。

### 防撤回：消失前那一瞬间，我已经收下了

还有个很实用的小功能——**防撤回**。它复用了回程那套监听：当 DeepSeek 侧出现「回复被撤回 / 内容被过滤」的变动时，桥接层会在内容真正消失之前把它截下来，照样发到微信，并标注这是撤回后恢复的内容。模型就算临时「反悔」，你也依然看得到。

## 界面与后台：全屏、深色，还「杀不死」

这一版我在体验上也补了不少课：

- **全屏沉浸**：界面一直延伸到状态栏（摄像头区域）和底部手势条下面，像浏览器全屏一样，对话页整页铺满；
- **深色跟随系统**：控制台和 DeepSeek 网页都会跟着系统在浅色、深色之间自动切换，切一下系统主题就整体换肤；
- **后台常驻**：这是最实际的痛点——短暂切后台没问题，放久了却常常要重新打开 App 才收得到消息。我叠了前台服务、唤醒锁、电池白名单引导，再加定时心跳、轮询看门狗自愈、划掉任务后自动重启和开机自启。配合在系统里关掉对它的省电限制，长时间挂在后台也能稳稳收消息。

## 三步就能用起来

1. **下载 APK**：到 [Release 页面](https://github.com/Hiweny/deepbridge/releases/latest) 下载最新版，也就几百 KB；
2. **登录 + 扫码**：在应用里登录 DeepSeek 官网账号，再用微信扫码绑定 ClawBot，只需这一次；
3. **挂后台即可**：允许它后台运行、顺手关掉电池优化，然后回到微信直接对话，文字、图片、文件都能发。

项目已经完整开源，并用 GitHub Actions 自动构建签名 APK——打个标签就出包，连我自己都省了本地打包的麻烦。新版本和旧版用的是同一套签名，**直接覆盖安装就行，微信连接和本地记忆都会保留，不用重新扫码**。

## 一个差点让我以为失败的小插曲

其实最早测试时，我一度以为方案挂了——我**反复扫那个 ClawBot 的码**，微信却怎么都收不到消息。把它放一阵子再打开，又一切正常，原来只是短时间内频繁扫码触发的临时限制，方案本身一直是通的。也正因为吃过这个亏，我特意让后续版本都能覆盖升级、不丢登录，省得反复扫码、再踩一次同样的坑。所以如果你也遇到扫码后暂时没反应，别慌，静置一会儿再试就好。

<!-- EN -->

## When DeepSeek Moves Into WeChat

I've been tinkering around **DeepSeek** again, and this little project is called **DeepBridge**.

> In one sentence: it lets DeepSeek move right into your WeChat — you send text, images, even files in the chat, and DeepSeek is the one replying.

It used to be that using DeepSeek meant jumping between a browser and other apps. Not anymore: **WeChat itself becomes the chat window.** I leaned on a ClawBot inside WeChat and wrote an injection script that wires it to the DeepSeek website, bridging two otherwise unrelated things through a back-and-forth of messages. It started with plain text, and over time I added file transfer, long-term memory and human-like multi-message replies until it felt genuinely smooth.

## What It Actually Does

The experience is wonderfully direct:

1. I send a line, an image, or even a PDF in WeChat as usual;
2. Text is typed into the DeepSeek web input, while images and files are placed into the site's upload control — **the website itself does the upload and parsing** — and everything is submitted automatically;
3. DeepSeek streams its answer, which is captured in full when it finishes;
4. The reply is cleaned into WeChat-friendly plain text, split into several short messages when needed, and sent back along the same path.

I never touch the DeepSeek UI — WeChat alone is enough, and the APK is **only a few hundred kilobytes**, so trying it costs almost nothing.

## How It Works: A Round-Trip Bridge

The idea isn't complicated. At its core is a message round-trip:

```text
WeChat  ⇄  ClawBot  ⇄ (iLink protocol) ⇄  on-device app + injection script  ⇄  DeepSeek web
```

- **Outbound (WeChat → DeepSeek):** a message leaves WeChat, passes through ClawBot, and reaches my phone by long-polling over the **iLink protocol**. Text is set into the web input the native way; images and files are first downloaded and decrypted from the WeChat CDN, turned into browser file objects, dropped into the site's upload control, and sent automatically once the send button lights up.
- **Inbound (DeepSeek → WeChat):** the script hooks the page's network requests, parses DeepSeek's streaming response, keeps only the final answer and filters out the thinking, then routes it back over the same channel.

In essence, the bridge automatically does the whole manual dance of "gather the content, hand it to DeepSeek, wait, carry the answer back into WeChat." One principle I held to: everything on the DeepSeek side happens inside my own logged-in web page — no bundled keys, no login bypass, even the upload challenge is left to the website itself — which keeps the bridge resilient as the site evolves.

## A Few Parts I'm Especially Fond Of

**A persona prompt, plus memory that never loses the thread.** I keep a customizable **persona prompt** (a system prompt) on-device; whatever role or tone you want DeepSeek to use, you edit just that one block. The catch with long chats is that context balloons and the model slowly forgets who it is, so the app **compresses earlier turns into a memory summary** that rides along with the persona, and opens a fresh chat after a set number of rounds while keeping that summary. The summary isn't a fixed length — it stays terse when there's little to say and expands when there's a lot, scaling between a few hundred and three thousand characters — so the persona and key facts keep carrying forward instead of falling apart.

**Splitting one reply into many with `\`.** Real people rarely dump a wall of text in WeChat; they fire off short lines one after another. To match that, a single DeepSeek reply can be split on the half-width backslash `\` and sent piece by piece with a human rhythm. The hard part is that models often forget the separator, or substitute line breaks and slashes. So I refined the built-in rules many times over: stating that the only valid separator is the half-width `\`, pairing it with positive and negative examples, calling out the wrong ways to write it — while also insisting that ordinary replies stay as one message and never split just for the sake of it.

**Images and files, straight into the chat.** Once DeepSeek unified its modes and the composer could accept images and documents, I completed that loop: an inbound image or file (PDF, Word, Excel, text, code, screenshots) is downloaded and decrypted from the WeChat side, large images are compressed while documents pass through untouched, then handed to the website for upload and parsing and sent together with a line of my own. "Summarize this PDF" or "what's wrong in this screenshot?" now happens in a single WeChat step.

**Anti-recall.** A handy extra that reuses the inbound listener: when a reply is recalled or content-filtered on the DeepSeek side, the bridge grabs it in the instant before it disappears and forwards it to WeChat anyway, clearly marked as recovered — recall or not, you still see it.

## UI and Background: Fullscreen, Dark, and Hard to Kill

This version also caught up on polish:

- **Edge-to-edge fullscreen:** the UI extends under the status bar (camera area) and the bottom gesture bar, browser-style, with the chat page filling the whole screen;
- **System dark mode:** both the console and the DeepSeek page follow the system between light and dark automatically;
- **Background resilience:** the real pain point was messages only arriving after reopening the app following a long idle. I layered a foreground service, a wake lock and battery-whitelist guidance with a periodic heartbeat, a self-healing poll watchdog, auto-restart after the task is swiped away, and boot-time autostart. With battery optimization disabled for the app, it keeps receiving messages even after long stretches in the background.

## Up and Running in Three Steps

1. **Download the APK** of the latest build from the [Release page](https://github.com/Hiweny/deepbridge/releases/latest) — a few hundred KB;
2. **Sign in & scan:** log into your DeepSeek web account in the app, then bind the ClawBot by scanning its QR with WeChat — just once;
3. **Leave it in the background**, allow background activity and disable battery optimization, then chat in WeChat — text, images and files all work.

The project is fully open source, with GitHub Actions building the signed APK automatically — tagging a release produces the package, no local build needed. New releases share the same signing key as older ones, so you can **install right over the existing app: your WeChat binding and local memory are kept, no rescanning required**.

## A Small Scare That Almost Killed It

During the earliest tests I actually thought the whole approach had failed — I **scanned the ClawBot QR over and over**, and WeChat simply stopped receiving anything. Coming back a while later, it worked perfectly; it was only a temporary limit from scanning too frequently, and the design was sound all along. That's exactly why later versions upgrade in place and keep the login, so you never have to rescan and hit the same trap. If scanning seems to do nothing at first, don't panic — give it a moment and try again.
