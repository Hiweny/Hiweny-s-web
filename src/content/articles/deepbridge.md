---
title: "DeepBridge：微信桥接"
title_en: "DeepBridge: Bridging DeepSeek into WeChat"
date: "2026-09-08"
tags: ["DeepSeek", "微信", "Android", "自动化", "提示词工程"]
excerpt: "用一个几百 KB 的 APK，经 ClawBot 与 iLink 协议把 DeepSeek 官网接进微信：本地人格提示词持久化、多消息分段连发、还能防撤回。"
excerpt_en: "A few-hundred-KB Android app that wires the DeepSeek web app into WeChat via ClawBot and the iLink protocol, with persistent persona prompts, multi-message splitting and anti-recall."
github: https://github.com/Hiweny/deepbridge
live: https://github.com/Hiweny/deepbridge/releases/latest
---

## 目录

## 当当当当，DeepSeek 住进微信了

我又围绕 **DeepSeek** 折腾出了一个小项目，名字叫 **DeepBridge（微信桥接）**。

> 它做的事情一句话就能说清：让 DeepSeek 直接「住进」你的微信，你在聊天框里发消息，回你的就是 DeepSeek。

以前想用 DeepSeek，总得切到网页或者 App；现在不用了——**微信本身就是对话框**。我利用微信里的 ClawBot，再写了一段注入脚本把它和 DeepSeek 官网搭上线，消息一来一回之间，两个原本不相干的东西就这样被我「桥接」了起来。

## 它到底做了什么

实际体验非常直接：

1. 我在微信里像平常一样给机器人发一句话；
2. 这句话被悄悄送进 DeepSeek 官网的输入框，并自动发送；
3. DeepSeek 开始逐字生成，生成完之后，回复被完整截取下来；
4. 回复又原路返回到我的微信聊天里。

整个过程我不需要碰 DeepSeek 的界面，手机上只留一个微信就够了。而且这个桥接 APK **小得离谱，只有几百 KB**，装上试试几乎没有任何成本。

## 原理：一座「往返」的桥

整套方案其实不复杂，核心就是一条消息的往返链路：

```text
微信  ⇄  ClawBot  ⇄ (iLink 协议) ⇄  注入脚本  ⇄  DeepSeek 官网对话框
```

拆开来看是这样：

- **微信 → DeepSeek（去程）**：消息从微信发出，经过 ClawBot，再通过 **iLink 协议**传到我这边；注入脚本拿到文本后，把它填进 DeepSeek 官网的对话框并触发自动发送。
- **DeepSeek → 微信（回程）**：脚本持续盯着 DeepSeek 的回复区域，等它生成结束，就把回答截取出来，再沿同一条链路送回微信。

所谓「桥接」，本质上就是我站在中间，**替你完成了「复制到 DeepSeek、等回复、再复制回来」这一整套手动操作**，只不过它是自动的、实时的。

## 我最喜欢的几个设计

### 本地人格提示词：让人设一直在线

我在 APK 里做了一套**本地的提示词工程**。你可以自定义一份「人格提示词」（也就是常说的 system prompt），让 DeepSeek 扮演任何你想要的角色、语气和说话习惯。

这里有个现实问题：对话一长，上下文会越来越臃肿，模型很容易「聊着聊着就忘了自己是谁」。所以我让它**自动对对话进行总结**——把前面聊过的内容压缩成精炼的记忆，再连同人格提示词一起带下去。这样一来，**这份人格会跟随你的不同对话一直持续下去**，而不是开个头就散架。

### 用 `\` 拆成多条消息，更像活人

真人在微信聊天，很少一上来甩一大段，而是一句一句、断断续续地连发。为了让回复更有「活人感」，我加了**多条消息**功能：DeepSeek 的一次回复，可以用反斜杠 `\` 分割，系统会把它切成好几条逐条发出。

我自带的默认提示词可能还不够「碎」，如果你想要更明显的多条回复效果，直接在人格提示词里**强制要求**它用 `\` 分段就行。下面这段是我优化过的模板，可以直接抄：

```text
强制必须使用"\"来分割你的消息，而不是用双换行，并确保你的消息中至少包含一个"\"。你最多只能把一条回复分割成十条消息，系统会按"\"切分后逐条发送。请充分利用这一能力，根据不同情景和语境选择发送长消息还是简短消息，让自己的行为与语气更像一个真人：日常对话时每句尽量简短、不使用标点，自然随意，就像我们真的在微信里聊天一样流畅。
```

### 防撤回：撤回前那一瞬间，我已经收下了

还有一个很实用的小功能——**防撤回**。它复用了回程那套监听：当 DeepSeek 侧出现「消息被撤回」的变动时，桥接层会在内容真正消失之前把它截下来，照样发到你的微信。于是对方（或者模型自己）就算撤回，你也依然看得到。

## 三步就能用起来

真的非常简单：

1. **下载 APK**：到 [Release 页面](https://github.com/Hiweny/deepbridge/releases/latest) 下载，或者直接点这个直链——[deepbridge.apk](https://github.com/Hiweny/deepbridge/releases/download/v1.0.0/deepbridge.apk)，也就几百 KB，试试不亏 😉
2. **扫码 + 登录**：在应用里用微信扫码绑定 ClawBot，再登录你的 DeepSeek 官网账号；
3. **挂后台即可**：让应用保持后台运行（顺手关掉对它的电池优化），然后回到微信直接对话。

## 一个差点让我以为失败的小插曲

这个 APK 其实早就构建好了，但中间有段时间我一度以为开发失败了——因为测试时我**反复扫那个 ClawBot 的码**，结果微信端怎么都收不到消息。

后来我把它放了一段时间，再打开时发现消息又能正常接收了。原来只是短时间内频繁扫码触发的临时限制，**方案本身一直是通的、靠谱的**。所以如果你也遇到扫码后暂时没反应，别慌，静置一会儿再试就好。

## 最后

我还挺佩服自己这个想法的 🤓💡——没有去做什么庞大的工程，只是把两个现成的东西巧妙地接在一起，就得到了一个体验相当顺滑的结果。这大概也是我做这些小项目的乐趣所在：和 [Collection 图片收藏夹](https://hiweny.github.io/Hiweny-s-web/articles/collection) 一样，都是用一点点「桥接」和「自动化」的巧思，把麻烦事变得顺手。

至于这些文章本身是怎么用 Markdown 写出来的，可以看我这篇 [《Markdown：我的博客写作语言》](https://hiweny.github.io/Hiweny-s-web/articles/markdown)。现在，就去微信里试试让 DeepSeek 陪你聊天吧。

<!-- EN -->

## Ta-da: DeepSeek Now Lives Inside WeChat

I've been tinkering around **DeepSeek** again, and this little project is called **DeepBridge**.

> In one sentence: it lets DeepSeek move right into your WeChat — you type in the chat, and DeepSeek is the one replying.

It used to be that chatting with DeepSeek meant switching to a browser tab or another app. Not anymore: **WeChat itself becomes the chat window.** I leaned on a ClawBot inside WeChat and wrote an injection script that wires it up to the DeepSeek website, bridging two otherwise unrelated things through a simple back-and-forth of messages.

## What It Actually Does

The experience is wonderfully direct:

1. I send a line to the bot in WeChat, just like any other chat;
2. That line is quietly typed into the DeepSeek web input box and submitted automatically;
3. DeepSeek streams its answer, and once it finishes, the reply is captured in full;
4. The answer travels back along the same path and lands in my WeChat chat.

I never have to touch the DeepSeek UI — WeChat alone is enough. And the bridge APK is **ridiculously small, just a few hundred kilobytes**, so trying it costs almost nothing.

## How It Works: A Round-Trip Bridge

The idea isn't complicated. At its core is a message round-trip:

```text
WeChat  ⇄  ClawBot  ⇄ (iLink protocol) ⇄  injection script  ⇄  DeepSeek web chat
```

Step by step:

- **WeChat → DeepSeek (outbound):** a message leaves WeChat, passes through ClawBot, reaches me over the **iLink protocol**, and the injection script types it into the DeepSeek web input box and hits send.
- **DeepSeek → WeChat (inbound):** the script keeps an eye on the DeepSeek reply area; once generation finishes, it captures the answer and sends it back to WeChat over the same channel.

In essence, the bridge simply does for you — automatically and in real time — the whole manual dance of "copy into DeepSeek, wait, copy the answer back out."

### A Few Parts I'm Especially Fond Of

**Local persona prompts that stay in character.** I built a small on-device **prompt-engineering** layer. You define a persona prompt (a system prompt) — any role, tone or speaking style you want. The catch with long chats is that context balloons and the model slowly forgets who it is, so the app **summarizes the conversation automatically**, compressing earlier turns into compact memory that rides along with the persona. The result: a persona that **persists across conversations** instead of falling apart after a few messages.

**Splitting one reply into many with `\`.** Real people rarely dump a wall of text in WeChat; they fire off short lines one after another. To make replies feel more human, the app can split a single DeepSeek reply on the backslash `\` and send the pieces as separate messages. My built-in default prompt may not be chatty enough, so if you want an even stronger effect, just **force the behavior inside your persona prompt**. Here's a refined template you can copy:

```text
You MUST split your messages with "\" instead of blank lines, and every message must contain at least one "\". Split one reply into at most ten messages; the system will cut on "\" and send each piece separately. Make good use of this: choose long or short messages depending on context, and behave like a real person — in casual chat keep each line short, drop punctuation, and sound as natural and relaxed as if we were really texting on WeChat.
```

**Anti-recall.** A handy extra that reuses the inbound listener: when a message gets "recalled" on the DeepSeek side, the bridge grabs the content in the instant before it disappears and forwards it to WeChat anyway. Recall or not, you still see it.

## Up and Running in Three Steps

1. **Download the APK** from the [Release page](https://github.com/Hiweny/deepbridge/releases/latest), or use the direct link — [deepbridge.apk](https://github.com/Hiweny/deepbridge/releases/download/v1.0.0/deepbridge.apk). It's only a few hundred KB.
2. **Scan & sign in:** bind the ClawBot by scanning its QR code with WeChat inside the app, then sign in to your DeepSeek web account.
3. **Keep it in the background** (disable battery optimization for it), then just chat in WeChat.

## A Small Scare That Almost Killed It

The APK was actually built a while ago, and for a moment I thought I'd failed — during testing I **scanned the ClawBot QR code over and over**, and WeChat simply stopped receiving messages.

I set it aside, and when I came back later everything worked again. It was only a temporary limit triggered by scanning too frequently; the approach itself was sound the whole time. So if scanning seems to do nothing at first, don't panic — give it a moment and try again.

## Wrapping Up

I'm rather proud of this idea 🤓💡 — no giant engineering effort, just cleverly joining two ready-made pieces to get something that feels remarkably smooth. That's the fun of these little projects, much like my [Collection image archive](https://hiweny.github.io/Hiweny-s-web/articles/collection): a touch of bridging and automation turns something fiddly into something effortless. And if you're curious how these posts themselves are written in Markdown, have a look at [Markdown: My Blog Writing Language](https://hiweny.github.io/Hiweny-s-web/articles/markdown). Now go give DeepSeek a spin inside WeChat.
