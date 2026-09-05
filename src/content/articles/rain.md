---
title: "Rain：听雨"
title_en: "Rain: Listening to the Rain"
date: "2026-09-06"
tags: ["前端", "个人项目", "雨天", "WebGL", "氛围"]
excerpt: "我很喜欢下雨天，于是照着 Rainy Mood 的感觉，给自己做了一个极简的雨天氛围网站：雨珠玻璃、衬线时钟、一句古诗词，还有雨声和网易云歌单。"
excerpt_en: "I love rainy days, so I built myself a minimal rainy-day ambience site in the spirit of Rainy Mood: raindrops on glass, a serif clock, a line of classical poetry, plus rain sounds and my NetEase playlist."
github: https://github.com/Hiweny/rain
live: https://hiweny.github.io/rain/
---

> 雨夜，卧在靠窗的床上，听窗外雨声淅淅沥沥，偶尔一声闷雷轰隆隆地滚过天边。
>
> 舒适，又惬意。
>
> 我说这叫「听雨眠」——虽然往往这样的雨夜，反而是舍不得睡的。

## 目录

## 我为什么喜欢下雨天

我一直很喜欢下雨天。喜欢那种**宁静又疯狂**的氛围：世界被一层水帘隔开，嘈杂都被挡在外面，只剩雨打在窗上、落在叶尖的声音。

人在这样的声音里会莫名地安定下来。可以什么都不做，就只是发呆；也可以摊开书、打开平板，安心地学上一会儿。

所以很早以前，我就开始扒各种「雨声白噪音」网站，想把这种氛围随时搬到屏幕里。

## 我扒过的那些雨天网站

前前后后收藏了不少，各有各的味道，你们也可以去听听：

- [Rainbow Hunt](https://rainbowhunt.com/)：把各种自然声景收集在一起，选择很丰富；
- [RainyScope](https://rainyscope.com/)：按季节和天气切换，画面很有氛围感；
- [Rainy Mood](https://rainymood.com/)：最经典的一个，也是我**最主要的灵感来源**。

其中最戳我的就是 Rainy Mood。打开就是一扇糊着雨水的窗，大颗大颗的水珠挂在玻璃上，配上循环的雨声，非常有氛围。

但它对我来说还是**多了些东西**——我只想要那一扇雨窗、那一场雨，越干净越好。于是心里一直埋着个念头：**做一个完全属于我自己的、极简的雨天氛围网站。**

## 一间在线自习室给的启发

前段时间学习时，我扒到一个在线自习室 [StudyWithMiku（在线自习室）](https://study.mikumod.com/)。用平板学习的时候，分屏一边放资料、一边开着这个自习室网站，那种「有人陪你一起安静」的感觉特别舒服。

这一下把我的想法点亮了：

> 我要的不是一个复杂的播放器，而是一方**简单、优雅、有氛围**的小天地——学习时分屏打开，能瞬间代入雨天；也可以单纯地听雨声、听歌，或者只是看着雨发呆。

于是就有了 **Rain：听雨**。

## 于是我做了 Rain：听雨

在线地址在这里，手机和电脑都做了适配，打开即是雨窗：**[https://hiweny.github.io/rain/](https://hiweny.github.io/rain/)**

它没有开屏页、没有多余按钮，进入就是一整屏的雨：**顶部是锁屏风的衬线时钟和一句古诗词，底部是一条通透的磨砂播放条，中间最大的视觉区域，全部留给雨。**

### 雨滴和雨窗，是最花心思的部分

这是整个项目的精髓，我几乎是对着 Rainy Mood 一帧帧调的。

雨珠效果用的是 WebGL 库 [`raindrop-fx`](https://github.com/SardineFish/raindrop-fx)，它在一张被雨水晕开的模糊背景上，用着色器模拟每颗水珠的**折射和高光**，小水滴会慢慢长大、彼此融合、到一定大小就顺着玻璃滑落，留下一道水痕。

扒 Rainy Mood 源码时我发现一个秘密：**它几乎全部使用这个库的默认参数**。想要「官网那种又大又透亮的水珠」，自作主张乱调反而会走样，老老实实用默认值最对味。我还顺手修了两个体验问题：一是进入页面先出背景、绝不一上来黑屏；二是切换背景时做了交叉淡入，轮播起来是平滑的溶解，而不是生硬地闪一下。

雨窗的绿色背景我准备了 12 张，每次刷新都会悄悄轮换一张，像在不同的雨夜之间切换。

### 时钟、一句诗，和一条会呼吸的播放条

- **时钟**：放在靠上的位置，像手机锁屏那样。数字用的是 Rainy Mood 官网同款的衬线字体 Marcellus SC，安静、耐看；
- **诗词一言**：时钟下面是一句古诗词，每过二十多秒轻轻换一句。雨夜里读到「小楼一夜听春雨」这样的句子，真的很搭；
- **播放条**：借鉴了 [Mineradio](https://github.com/XxHuberrr/Mineradio) 那种**背景能透过来的强磨砂质感**，所有控制都收在里面。它默认常驻，也可以一键收起，整个页面只留时钟和雨，想看了点一下屏幕底部就回来。

### 听雨声，还是听歌

你可以二选一：

- **雨声**：一段 34 分钟的雨声循环，和真实雨天几乎无异；
- **歌单**：参考 [StudyWithMiku](https://github.com/shshouse/StudyWithMiku) 的做法，接入网易云歌单，支持顺序 / 随机 / 单曲循环。

我还做了两个很实用的小细节：**刷新网页后，雨声和歌曲都会从上次停下的地方继续**，不会每次都从头来；音质提供**标准 / 高音质 / 无损**三档，会根据你的网络和设备先自适应一档，也能自己手动切。

## 怎么换成你自己的网易云歌单

我在里面**默认填了我自己的网易云歌单**，欢迎你来品鉴一下。当然，你完全可以换成自己喜欢的，方法很简单。

**第一步**：打开你自己的某个网易云歌单，点「分享 → 复制链接」，会得到一串这样的分享链接：

```text
分享江蕙兰创建的歌单「我喜欢的音乐」: https://y.music.163.com/m/playlist?id=18284047077&userid=17849276213&creatorId=17849276213 (来自@音乐)
```

**第二步**：找到链接里 `id=` 后面、到下一个 `&` 之前的那串数字，它就是**歌单 ID**：

```text
18284047077
```

**第三步**：打开网站底部播放条的控制面板，把这串数字填进「网易云歌单 ID」，点「载入」就好了。

> 这是我自己的歌单 ID，你可以随时回到这篇文章来查看：
>
> ```text
> 18284047077
> ```

只要歌单 ID 不变，你以后在网易云里增删歌曲，网站下次打开会**自动同步**最新的歌单，不用改任何设置。

## 一个小彩蛋

咳，除了绿色的雨窗，我还接了一个**动漫随机图的接口**当背景。闲暇之余，也能让喜欢的角色陪你一起听雨（控制面板里可以切到「动漫」，还能关掉雨滴、调亮度、让它自动轮播，当成一个安静的看图模式）。这件事我一般不主动说。

## 现在，开始听雨吧

写到这里，窗外如果正好也下着雨，那就太应景了。

希望这个小小的网站，能在某个需要安静下来的时刻，递给你一份**平静、舒适**——就像它递给我的那样。

说真的，我挺为这个作品得意的：它足够简洁，也足够优雅。来，击个掌 👏

源码都放在这里，感兴趣可以看看：[github.com/Hiweny/rain](https://github.com/Hiweny/rain)。

---

<!-- EN -->

> On a rainy night I lie in bed by the window, listening to the rain patter outside, with the occasional low roll of distant thunder.
>
> Cosy. Content.
>
> I call it "listening myself to sleep" — though on nights like these, I usually don't want to sleep at all.

## Table of Contents

## Why I love rainy days

I've always loved rainy days — that mood of being **quiet and wild at the same time**. A curtain of water shuts the noisy world away, leaving only the sound of rain on glass and on leaves.

Something about that sound settles me. I can zone out and do nothing, or open a book and study in peace. So long ago I started digging through "rain white-noise" sites, trying to carry that feeling onto a screen whenever I wanted.

## The rainy sites I collected along the way

I bookmarked quite a few, each with its own charm — go have a listen:

- [Rainbow Hunt](https://rainbowhunt.com/): a wide collection of natural soundscapes;
- [RainyScope](https://rainyscope.com/): switch by season and weather, lovely atmosphere;
- [Rainy Mood](https://rainymood.com/): the classic, and my **main inspiration**.

Rainy Mood struck me most. You open it to a window streaked with rain, fat beads clinging to the glass and a looping rain track — incredibly atmospheric. But it still carried **more than I needed**. I only wanted the window and the rain, as clean as possible. A thought quietly took root: *build my own, minimal rainy-day world.*

## The nudge from an online study room

A while ago I came across the online study room [StudyWithMiku](https://study.mikumod.com/). Studying on a tablet with notes on one half and that site on the other felt like quietly studying with company — wonderfully calming.

That clicked everything into place:

> I don't want a complicated player. I want a small, elegant, atmospheric space — split-screen it while studying and instantly step into the rain; or just listen, or simply watch the rain fall.

And so **Rain: Listening to the Rain** was born.

## What I built

It's live here, tuned for both phone and desktop, and it opens straight onto the rain: **[https://hiweny.github.io/rain/](https://hiweny.github.io/rain/)**

No splash screen, no clutter. A lock-screen-style serif clock and a line of classical poetry up top, a translucent frosted player bar at the bottom, and the whole middle — the largest area — given over to the rain.

### The raindrops and the window took the most care

This is the heart of the project, tuned almost frame by frame against Rainy Mood.

The droplets run on the WebGL library [`raindrop-fx`](https://github.com/SardineFish/raindrop-fx): over a rain-blurred background, a shader fakes each bead's **refraction and specular highlight**, while tiny droplets grow, merge, and eventually slide down the glass.

Digging through Rainy Mood's source taught me a secret: **it uses almost exactly the library's defaults.** To get those big, glassy beads, the trick is *not* to over-tune — the defaults are the look. I also fixed two rough edges: the background now paints first so there's never a black flash on load, and background changes cross-fade in a smooth dissolve instead of flickering. Twelve green window photos rotate quietly on every refresh.

### A clock, a poem, and a breathing player bar

- **The clock** sits high, like a phone lock screen, its numerals in Marcellus SC — the same elegant serif Rainy Mood uses;
- **A line of poetry** rests beneath it, gently rotating every twenty-odd seconds. Reading "a spring rain all night on the little tower" on a rainy evening just fits;
- **The player bar** borrows the strong frosted-glass look of [Mineradio](https://github.com/XxHuberrr/Mineradio), where the colours behind bleed through. Every control lives inside it. It stays by default, or collapses to a single button so only the clock and rain remain — tap the bottom of the screen to bring it back.

### Rain, or music

Pick one:

- **Rain**: a 34-minute looping rain track, almost indistinguishable from the real thing;
- **Playlist**: following [StudyWithMiku](https://github.com/shshouse/StudyWithMiku), it plays a NetEase playlist with order / shuffle / single-loop.

Two details I care about: **after a refresh both the rain and the song resume where you left off**, never restarting from zero; and three quality tiers — standard / high / lossless — adapt to your network and device first, and can be switched manually.

## Use your own NetEase playlist

I **preloaded my own playlist** as the default — come give it a listen. Swapping in yours is easy.

**Step 1:** Open one of your NetEase playlists, tap Share → Copy Link. You'll get something like:

```text
https://y.music.163.com/m/playlist?id=18284047077&userid=...
```

**Step 2:** The digits right after `id=` and before the next `&` are your **playlist ID**:

```text
18284047077
```

**Step 3:** In the player's control panel, paste it into "NetEase playlist ID" and tap load. As long as the ID stays the same, the site **auto-syncs** whenever you add or remove songs.

## A tiny easter egg

Ahem — besides the green windows, I wired in a **random anime-image API** as an alternate background. Let a favourite character keep you company in the rain (switch to "anime" in the panel; you can hide the droplets, dim the brightness, or let it auto-rotate like a quiet gallery). I don't usually mention this part.

## Now, go listen to the rain

If it happens to be raining outside your window as you read this, all the better.

May this little site hand you a moment of **calm and comfort**, the way it hands one to me.

Honestly, I'm rather proud of it — simple, and elegant. High five 👏

The source is here if you're curious: [github.com/Hiweny/rain](https://github.com/Hiweny/rain).
