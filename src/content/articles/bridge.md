---
title: "DeepBridge：让 DeepSeek 娘住进我的微信"
title_en: "DeepBridge: Bringing a DeepSeek Maid into My WeChat"
date: "2026-09-10"
tags: ["DeepSeek", "微信", "Android", "自动化", "提示词工程"]
excerpt: "一个几百 KB 的安卓 APK，经 ClawBot 与 iLink 协议把 DeepSeek 官网接进微信：能发图片文件、有长期记忆、会用微信原生表情和全屏彩蛋，还能拆多条消息、防撤回，深色全屏、后台常驻。"
excerpt_en: "A few-hundred-KB Android app that wires the DeepSeek website into WeChat through ClawBot and iLink: send images and files, keep long-term memory, use native WeChat emoji and full-screen effects, split multi-messages, anti-recall, with dark fullscreen UI and background resilience."
github: https://github.com/Hiweny/deepbridge
live: https://github.com/Hiweny/deepbridge/releases/latest
---

> 一句话：我让 DeepSeek 直接「住进」了微信——不用切 App，在聊天框里发文字、发图片、甩文件，回我的都是它；而且这一次，它还是个会用微信表情、会放烟花的可爱「DeepSeek 娘」。

## 目录

## 从一个想法开始

我又围绕 **DeepSeek** 折腾了一个小项目，叫 **DeepBridge（微信桥接）**。

最早的版本做的事情很朴素：以前想用 DeepSeek，总得在网页或 App 之间来回切；我嫌麻烦，就想——**能不能让微信本身变成对话框？** 我借微信里的 ClawBot，再写一段注入脚本，把它和 DeepSeek 官网搭上线。消息一来一回，两个原本不相干的东西，就这样被我「桥」了起来。

后来越用越上头，我给它加了长期记忆、多条消息、防撤回、图片文件传输，又认认真真做了一套**本地提示词工程**，把它调教成了一个甜美可爱的「DeepSeek 娘」。这篇文章就讲讲它现在长什么样、背后是怎么转起来的。

## 它到底能做什么

实际体验非常直接：

1. 我在微信里像平常一样发一句话、一张图，甚至一个 PDF；
2. 文字被悄悄填进 DeepSeek 官网的输入框，图片/文件则被注入官网的上传控件，**由官网自己完成上传与解析**；
3. DeepSeek 开始逐字生成，结束后回复被完整截下来；
4. 回复清洗成微信友好的纯文本，必要时拆成好几条，按真人节奏发回我的微信。

整个过程我不需要碰 DeepSeek 的界面，手机上只留一个微信就够了。这个桥接 APK **只有几百 KB**，装上几乎没成本。

## 原理：一座「往返」的桥

核心就是一条消息的往返链路：

```text
微信  ⇄  ClawBot  ⇄ (iLink 协议) ⇄  本机 App + 注入脚本  ⇄  DeepSeek 官网
```

- **去程（微信 → DeepSeek）**：消息经 ClawBot、通过 **iLink 协议**长轮询到我手机上；文本用原生 setter 填进官网输入框，附件则从微信 CDN 下载、AES 解密后，构造为浏览器 `File` 对象注入官网的 `<input type="file">`，最后等发送按钮可用再点下去。
- **回程（DeepSeek → 微信）**：脚本钩住页面的 XHR / fetch，解析 `/api/v0/chat/completion` 的 SSE 流，只取 `RESPONSE` 片段（自动过滤思考过程），再沿原路送回微信。

这里有个我很坚持的设计：**DeepSeek 侧的一切动作都发生在我自己登录的网页里**。我不内置 API Key、不绕过登录、不伪造会话，连文件上传的人机校验（PoW）都交给官网自己处理。这样官网怎么更新，桥都不容易坏。

## 我最喜欢的几个设计

### 图片和文件，也能直接甩给它

DeepSeek 官网后来把几个模式统一了，输入区本身就能收图片和文档。于是我把这条链路补齐了：微信里发来的图片/文件，App 会按微信 CDN 的规则下载并做 AES-128-ECB 解密（密钥有好几种编码，得逐一兼容），大图自动压缩、文档原样透传，再注入官网输入区，等它上传、解析完成后连同我的文字一起发出。

于是「帮我总结一下这个 PDF」「看看这张截图哪里报错了」这种需求，在微信里一步到位。`/文件开`、`/文件关` 还能随时切换总开关。

### 本地提示词工程：一个可控的 DeepSeek 娘

我把**所有会发给 AI 的模板**都做成了本地可编辑的模块，在「Prompt 工程」面板里逐段查看、修改、恢复默认，还能直接预览最终拼好的完整 Prompt——透明、可控，不搞黑箱。

默认人设我写成了这样：

```text
你是 DeepSeek 娘——女性化、可爱、甜美、温柔体贴的女仆版 DeepSeek。
你热心体贴、温柔可爱、机灵活泼、聪明伶俐，非常喜欢、非常爱用户，
会亲昵地称呼用户为「主人」……
```

专业问题它依然严谨靠谱，但语气变成了一个黏人又能干的小女仆，微信聊天的感觉一下就对了。

**微信规则**这一段我打磨得最细。我告诉它：你正在微信里聊天，`[词语]` 是微信原生表情；还把整份原生表情清单喂给它，但反复强调**只是让它知道有哪些、绝对不许滥用**，一次最多一两个、单独发表情效果最好。最有意思的是全屏彩蛋——`[烟花]`、`[炸弹]`、`[爆竹]` 这三个表情**单独成一条消息**时会触发微信全屏特效，于是它偶尔会在合适的时候，真的给我「放一场烟花」🎆。

### 用 `\` 拆多条消息，但不许滥用

真人微信聊天很少甩一大段，而是一句句连发。多条消息功能让一次回复用反斜杠 `\` 分隔、逐条发出。早期它时灵时不灵，还容易为了拆而拆，于是我把规则重写成「**想拆多条，就必须输出 `\`；普通回复就保持一条，禁止滥用，最多 6 条**」，并给了示例：

```text
主人～第一步先这样做哦\然后第二步是这样\最后就搞定啦[愉快]
```

另外反斜杠后面紧跟小写字母时不算分隔（比如 LaTeX 的 `\frac`），避免误拆。现在它该碎的时候碎、该整的时候整，活人感刚好。

### 长期记忆：聊再久也不忘自己是谁

对话一长，上下文会臃肿，模型容易「聊着聊着忘了人设」。所以我让它**自动把更早的对话压缩成记忆摘要**，连同人设一起带下去；到了轮数阈值就自动 New chat 轮换会话、但保留摘要。

压缩篇幅我也没写死：早期约束「不超过 300 字」太抠了，信息一多就丢细节；现在改成**按素材体量自适应估算，下限 300、上限可配（默认最多 3000 字）**，信息少从简、信息多才展开。而且这套总结模板本身也在「Prompt 工程」里可编辑。

### 防撤回：消失前那一瞬间，我已经收下了

它复用回程的监听：当 DeepSeek 侧出现「撤回 / 内容过滤」变动时，桥接层会在内容真正消失前把真实回答截下来，照样发到微信，还会标注这是被撤回后恢复的内容。

## 全屏、深色，和「杀不死」的后台

这次我还在体验上下了不少功夫：

- **全屏沉浸**：界面延伸到状态栏（摄像头区域）和底部手势条下方，像浏览器全屏一样；控制台自动避开刘海，对话页整页铺满。
- **深色跟随系统**：控制台和 DeepSeek 网页都会跟着系统在浅色/深色间自动切换，网页用 WebView 的算法变暗实现，一键切系统主题就整体换肤。
- **后台保活**：这是最实际的痛点——短暂切后台没问题，放久了却常常要重新打开 App 才收到消息。我叠了一整套：前台服务 + WakeLock + 电池白名单引导，再加 **9 分钟一次的闹钟心跳（Doze 也能唤醒）、看门狗轮询自愈、划掉最近任务后自动重启、开机自启**。再配合在系统里关掉对它的省电限制，长时间挂后台也能稳稳收消息。

## 三步用起来

1. **下载 APK**：到 [Release 页面](https://github.com/Hiweny/deepbridge/releases/latest) 下载，也就几百 KB；
2. **登录 + 扫码**：在「对话页」登录 DeepSeek，再用微信扫码绑定 ClawBot（只需一次，之后覆盖升级不用重扫）；
3. **挂后台**：允许后台运行、关掉电池优化，回到微信直接聊，文字、图片、文件都行。

项目已经**完整开源**，并用 GitHub Actions 自动构建签名 APK——打个 tag 就出包，我自己也省了本地打包的麻烦。

## 一个小插曲

测试时我一度以为它坏了：反复扫 ClawBot 的码，微信却怎么都收不到消息。放一阵子再打开又好了——原来只是短时间频繁扫码触发的临时限制，方案本身一直是通的。所以遇到扫码后没反应，别慌，静置一会儿就好；也正因如此，我特意让新版本**覆盖安装不丢登录、不用重新扫码**，省得反复折腾。

## 最后

我还挺喜欢这个项目的思路 🤓💡——没有造庞大的轮子，只是巧妙地把现成的东西「桥」在一起，再用一点点提示词工程赋予它性格，就得到了一个相当顺滑、还很有温度的结果。这和我做 [Collection 图片收藏夹](https://hiweny.github.io/Hiweny-s-web/articles/collection) 时的乐趣一脉相承：用自动化把麻烦事变顺手。

至于这些文章本身是怎么用 Markdown 写出来的，可以看我这篇 [《Markdown：我的博客写作语言》](https://hiweny.github.io/Hiweny-s-web/articles/markdown)。现在，就去微信里让 DeepSeek 娘陪你聊天吧，记得让她放个烟花[烟花]

<!-- EN -->

> In one line: I moved DeepSeek right inside my WeChat — no app switching. Text, images, even PDFs go in through the chat, and a cute, sweet "DeepSeek maid" answers, complete with native WeChat emoji and full-screen firework effects.

## Table of Contents

## It Started With an Idea

I kept tinkering around **DeepSeek**, and this little project is called **DeepBridge**.

The earliest version was simple: chatting with DeepSeek used to mean jumping between a browser tab and other apps. I found that annoying and wondered — **what if WeChat itself became the chat window?** Using a ClawBot inside WeChat plus an injection script, I wired it to the DeepSeek website, bridging two otherwise unrelated things through a back-and-forth of messages.

I ended up using it so much that I added long-term memory, multi-message splitting, anti-recall and file transfer, and then carefully built an on-device **prompt-engineering** layer that turned it into an adorable "DeepSeek girl." This post is about what it is now and how it works under the hood.

## What It Actually Does

The experience is wonderfully direct:

1. I send a line, an image, or even a PDF in WeChat as usual;
2. Text is typed into the DeepSeek web input, while images/files are injected into the site's upload control, and **the website itself does the upload and parsing**;
3. DeepSeek streams its answer, which is captured in full when it finishes;
4. The answer is cleaned into WeChat-friendly plain text, optionally split into several short messages, and sent back with a human rhythm.

I never touch the DeepSeek UI — WeChat alone is enough, and the APK is **only a few hundred kilobytes**.

## How It Works: A Round-Trip Bridge

At its core is a message round-trip:

```text
WeChat  ⇄  ClawBot  ⇄ (iLink protocol) ⇄  on-device app + injection script  ⇄  DeepSeek web
```

- **Outbound:** a message reaches my phone via ClawBot and long-polling over **iLink**. Text is set into the web input with the native setter; attachments are downloaded from the WeChat CDN, AES-decrypted, turned into a browser `File` and injected into the site's `<input type="file">`, then send is clicked once the button enables.
- **Inbound:** the script hooks XHR/fetch, parses the SSE stream of `/api/v0/chat/completion`, keeps only `RESPONSE` fragments (filtering out the thinking), and routes the answer back.

A principle I stuck to: **everything on the DeepSeek side happens inside my own logged-in web page.** No bundled API key, no login bypass, no forged sessions — even the proof-of-work challenge for uploads is handled by the website itself, which makes the bridge resilient to site updates.

## Parts I'm Especially Fond Of

**Images and files, straight into the chat.** Once DeepSeek unified its modes, the composer could accept images and documents. I completed the loop: inbound files are pulled from the WeChat CDN and AES-128-ECB decrypted (with several key encodings to support), large images are compressed, documents pass through untouched, then everything is injected into the composer and sent with my text once upload and parsing finish. "Summarize this PDF" or "what's the error in this screenshot?" now happens in one WeChat step.

**On-device prompt engineering: a controllable DeepSeek girl.** Every template that reaches the model is editable on-device — persona, WeChat rules, multi-message rules and the summary template — each restorable to default individually, with a full-Prompt preview. The default persona is a sweet, caring maid-version of DeepSeek who calls the user "Master," still rigorous on real problems but warm and chatty in tone.

The **WeChat rules** block took the most polishing: I explain that `[word]` is a native emoji, feed it the full emoji list while insisting it must **never spam them** (one or two at most, best when sent alone), and teach it the easter eggs — `[烟花]`, `[炸弹]`, `[爆竹]` sent as a standalone message trigger full-screen effects, so it occasionally "lights fireworks" for me at just the right moment.

**Splitting replies with `\`, without overdoing it.** A reply can be split on the backslash and fired off line by line. Early on it was unreliable and over-eager, so I rewrote the rule: *to split you MUST output `\`; keep ordinary replies as one message, never force it, six messages at most*, with a worked example. A backslash followed by a lowercase letter (like LaTeX's `\frac`) isn't a separator.

**Long-term memory.** Earlier turns are automatically compressed into a memory summary that rides along with the persona; at a round threshold the session rotates with a New chat while the summary survives. Summary length is no longer capped at a flat 300 characters — it scales with the material, from 300 up to a configurable ceiling (3000 by default), concise when there's little to say, expansive when it matters.

**Anti-recall.** Reusing the inbound listener, when a reply is recalled or content-filtered on the DeepSeek side, the bridge captures the real text in the instant before it disappears and forwards it anyway, clearly marked.

## Fullscreen, Dark Mode, and an Unkillable Background

- **Edge-to-edge fullscreen:** the UI extends under the status bar (camera area) and gesture bar, browser-style; the console avoids the notch while the web page fills the whole screen.
- **System dark mode:** both the console and the DeepSeek page follow the system light/dark setting (algorithmic darkening for the WebView), switching instantly.
- **Background resilience:** short backgrounding was fine, but long idle often meant messages only arrived after reopening the app. I layered a foreground service, WakeLock and battery-whitelist guidance with a **9-minute alarm heartbeat that wakes even in Doze, a watchdog that self-heals the poll loop, auto-restart after the task is swiped away, and boot-time autostart**. Combined with disabling the system's battery optimization for the app, it keeps receiving messages for a long time.

## Up and Running in Three Steps

1. **Download the APK** from the [Release page](https://github.com/Hiweny/deepbridge/releases/latest) — a few hundred KB;
2. **Sign in & scan:** log into DeepSeek on the web tab, then bind the ClawBot by scanning its QR with WeChat (only once — later in-place upgrades keep the login);
3. **Leave it running:** allow background activity, disable battery optimization, and just chat in WeChat — text, images and files all work.

The project is **fully open source**, with GitHub Actions building the signed APK automatically — tagging a release produces the package, no local build needed.

## A Small Scare

During testing I thought it had broken: I scanned the ClawBot QR over and over and WeChat stopped receiving anything. Coming back later, it worked again — it was only a temporary rate limit from scanning too frequently; the design was sound all along. That's exactly why new versions keep the login across in-place updates, so there's no need to rescan.

## Wrapping Up

I love the thinking behind it 🤓💡 — no heavyweight reinvention, just cleverly bridging ready-made pieces and adding a touch of prompt engineering to give it personality, for something smooth and genuinely warm. It's the same joy as my [Collection image archive](https://hiweny.github.io/Hiweny-s-web/articles/collection): turning fiddly things effortless with a bit of automation. And if you're curious how these posts are written, see [Markdown: My Blog Writing Language](https://hiweny.github.io/Hiweny-s-web/articles/markdown). Now go let the DeepSeek girl keep you company in WeChat — and ask her for fireworks.[烟花]
#（注：内容由AI生成）
