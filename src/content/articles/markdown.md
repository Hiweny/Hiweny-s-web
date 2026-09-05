---
title: "Markdown：我的博客写作语言"
title_en: "Markdown: My Blog Writing Language"
date: "2026-09-05"
tags: ["Markdown", "写作", "AI", "博客"]
excerpt: "我是怎么在 DeepSeek 里认识 Markdown、又为什么想拥有属于自己的一套样式；这篇文章同时也是一份 Markdown 范本，我以后让 AI 照着它替我写。"
excerpt_en: "How I came to know Markdown in DeepSeek and why I wanted a style of my own. It doubles as a Markdown template I hand to AI to write for me."
github: https://raw.githubusercontent.com/Hiweny/Hiweny-s-web/main/src/content/articles/markdown.md
live: https://hiweny.github.io/Hiweny-s-web
---
> 写在前面：这首先是**我的一篇文章**，记录我和 Markdown 的相遇；同时它也是一份**范本**——我懒得亲手排版，以后会把它交给 AI，让 AI 照着这里的格式、语气和语法，替我写出一篇篇属于我的 Markdown。所以你既能当文章读，也能把它当成一份「写作说明书」。

## 目录

## 什么是 Markdown

Markdown 是一种**轻量标记语言**：用最简单的纯文本符号，就能写出结构清晰、排版漂亮的文章。

我第一次听到这个名字时，完全不知道它是什么玩意儿。什么「标记向下」之类的奇怪说法——其实 **Markdown = Mark（标记）+ down（向下）**，名字源自 Markup（标记语言），它把复杂的排版「降级」成随手就能打的符号。等真正用起来，我才发现自己早就在和它打交道了。而我认真认识它，是在一次和 **DeepSeek** 的对话里。

## 我和 Markdown 的初遇

那时候我惊讶地发现，DeepSeek 的回复里居然有**很丰富的样式**：有加粗、有列表、有代码框，整整齐齐。我一边看，一边冒出一个个「这是什么」的疑问，就这样一步步在对话里认识了 Markdown。

### 一眼爱上的引用块

我最先喜欢上的，是**引用块**——一条竖线后面跟着文字，看着特别舒服，也很有意思：

> 一条竖线，一段文字，就自成一方天地。

它还能**反复嵌套**，像俄罗斯套娃：

> 外面的引用。
>
> > 里面的引用，层层递进。
> >
> > > 再往里一层。

当时我就觉得：这排版怎么这么好看？

### 代码块：一键复制

接着是**代码块**。这对我太实用了——代码、命令、配置往框里一装，还能**一键复制**：

```bash
# 比如一条部署命令
git push origin main
```

想要什么，点一下就拿走，省心。

### 分割线：恰到好处的留白

还有**分割线**，一条线把内容隔开，文章的节奏一下就出来了：

---

上面一段，下面一段，中间一条线，阅读就有了呼吸感。

## 走出 DeepSeek：更多样的 Markdown

后来我发现 Markdown 其实无处不在。在 **GitHub 的 README** 里我见到了更多写法，也看了不少别人的 Markdown 博客，风格五花八门，各有各的好看。

我慢慢明白：同一种语言，可以被渲染成完全不同的样子——**内容用 Markdown 写，样式由展示它的那个网站决定**。

## 我也想要自己的 Markdown

于是我心里冒出一个念头：

> 我也想拥有**属于自己的 Markdown**——一套贴合我审美的样式，用来记录我做的项目（比如这篇 [图片收藏夹 Collection](https://hiweny.github.io/Hiweny-s-web/articles/collection)）、我的想法和碎碎念。

所以就有了**这个网站**，以及**这篇文章**。

不过说实话，我并不太会写 Markdown——基础符号认得一些，真要自己排，还是不行，主要是**懒得学**，哈哈。

## 我不会写，但 AI 会

没关系，**我不会，AI 会**。它写起 Markdown 来一溜一溜的，张口就来。

只是很多 AI 客户端自带的 Markdown 渲染并不好看。那我就换个思路：**让 AI 负责写，我的网站负责把它渲染成我喜欢的样子**。为了让每次找来的 AI 都能一次写对，我把「我的语气、网站支持的语法、输出格式」都写进了这篇文章——它就是我留给代笔 AI 的「样板间」。我自己也在耳濡目染里，慢慢记住了一些语法。

## 我给代笔 AI 定的规矩

如果你来帮我写文章，请认真读这一节。我的目标很简单：**你读完后，直接交付一个完整、能保存成 `.md` 的 Markdown 文件**，而不是给我一堆零碎说明。这篇文章本身就是你要对标的范本。

### 一、你只需要交付一个 .md 文件

你不用操心网站怎么构建、文件要放进哪个目录、怎么部署——那些是工程层面的事，我都写在项目的 [README（点这里看渲染版）](https://github.com/Hiweny/Hiweny-s-web/blob/main/README.md) 里了；如果你是 AI 需要读取纯文本，用这份 [README 原始链接](https://raw.githubusercontent.com/Hiweny/Hiweny-s-web/main/README.md)。你只要把下面要求的 Markdown 写好交给我，我来发布；网站会自动构建，并按日期把它排进主页。

### 二、元数据（Frontmatter）

每个 `.md` 开头都要有一段用 `---` 包起来的元数据，它决定文章在主页列表上怎么显示：

| 字段 | 必填 | 作用 |
| :--- | :---: | :--- |
| `title` | ✅ | 中文标题，要简短、有核心 |
| `title_en` | 推荐 | 英文标题，缺省时回退到 `title` |
| `date` | ✅ | 格式 `YYYY-MM-DD`，**主页按它倒序排列** |
| `tags` | 推荐 | 标签数组，如 `["Markdown", "写作"]` |
| `excerpt` | 推荐 | 中文一句话摘要，同样要精简 |
| `excerpt_en` | 推荐 | 英文摘要，回退到 `excerpt` |
| `github` | 可选 | 详情页「查看源码」按钮的地址 |
| `live` | 可选 | 详情页「在线 Demo」按钮的地址 |

> 改一下元数据里的 `date`，主页顺序就会跟着变——**顺序完全由日期驱动**，不用手动维护列表。项目文章的日期我一般取对应仓库的创建时间。

### 三、双语写作

- 中文正文写在前面，英文正文写在独占一行的 `<!-- EN -->` 之后；
- 两段都要完整、通顺，英文版是**独立重新表达**，不是逐句机翻；
- 如果某篇只写一种语言，不加 `<!-- EN -->` 即可；正文里若只是想提到这个标记，用行内代码 `` `<!-- EN -->` `` 写，不会被当成分隔符。

### 四、我对成稿的要求

1. **以我的原话为骨架**：我给的想法、经历、观点是主干，别弄丢，也别改我的立场；
2. **结合项目本身**：写项目就去读它的源码，把真实存在的功能、细节、用法写准，不要编造；
3. **合理发散**：在我原意上补充背景、原理、例子和我提到的技术点，让外行也能读懂；
4. **以我的口吻、第一人称**：文章作者是我，用「我」来叙述，你是幕后代笔，不要跳出来用旁观者语气；
5. **按需使用语法**：标题、列表、表格、引用、代码块自然服务于内容，不为炫技堆砌；
6. **结构完整**：有开头、有收尾，读起来是一篇顺畅的文章，最后附上独立成文的英文版。

## 语法全量展示

下面把这个网站支持的语法完整过一遍（目录在开头已经演示过）。这部分既是说明，也是你排版时的参照。

### 标题层级

`#` 的数量代表层级，从一级到六级：

```text
# 一级标题 H1（文章大标题，由元数据 title 渲染）
## 二级标题 H2（正文从这里开始，渐变下划线）
### 三级标题 H3（左侧竖条）
#### 四级标题 H4
##### 五级标题 H5
###### 六级标题 H6
```

本页大标题就是 H1、周围章节就是 H2/H3，下面再真实渲染一下 H4–H6：

#### 四级标题 H4

##### 五级标题 H5（小号大写）

###### 六级标题 H6

### 文本样式

- **粗体 bold**
- *斜体 italic*
- ***粗斜体 bold italic***
- ~~删除线 strikethrough~~
- `行内代码 inline code`
- <mark>高亮标记 mark</mark>
- 按 <kbd>Ctrl</kbd> + <kbd>C</kbd> 复制
- 下标 H<sub>2</sub>O 与上标 x<sup>2</sup>
- <u>下划线 underline</u> 与 <small>小号文字 small</small>
- 自动链接：https://github.com/Hiweny

> 硬换行演示：第一行末尾留两个空格  
> 就能手动换到下一行。

### 链接

- 行内式：[Hiweny 的 GitHub](https://github.com/Hiweny)
- 带标题：[打开我的主页](https://hiweny.github.io/Hiweny-s-web/ "鼠标悬停的提示文字")
- 参考式：链接到我站内的另一篇文章 [我的 Collection 文章][col]，引用在文末定义——这就是**文章之间互相串联**的方式。

### 图片

直接贴图片 URL 即可，会懒加载，带圆角、阴影和悬停上浮；站点默认以无 referrer 方式加载，多数图床都能正常显示：

![示例图片](https://ps.ssl.qhmsg.com/t0227fad5259da8ae35.jpg "可以加标题")

### 无序列表（可嵌套）

- 一级项目一
  - 二级项目 A
  - 二级项目 B
    - 三级项目 ①
    - 三级项目 ②
- 一级项目二
- 一级项目三

### 有序列表

1. 第一步：准备环境
2. 第二步：安装依赖
3. 第三步：运行项目
   1. 子步骤 3.1
   2. 子步骤 3.2

### 任务列表（GFM）

- [x] 已完成的任务
- [x] 支持 Markdown 驱动
- [ ] 待办：再写一篇新文章
- [ ] 待办：慢慢把项目文章补齐

### 引用块

> 单行引用。
> 多行引用第一行，用来观察背景的玻璃质感与左侧渐变竖条。
>
> 第二行，中间空一行形成新段落。
>
> > 还能继续嵌套引用。

### 代码块（语法高亮 + 复制按钮）

围栏开头标注语言，就有语法高亮，右上角自带一键复制：

```ts
interface User {
  name: string;
  age: number;
}
const greet = (user: User): string => {
  // 模板字符串与注释高亮
  return `Hello, ${user.name}! You are ${user.age}.`;
};
console.log(greet({ name: 'Hiweny', age: 18 }));
```

```python
def fibonacci(n: int) -> list[int]:
    """生成斐波那契数列"""
    seq = [0, 1]
    for _ in range(n - 2):
        seq.append(seq[-1] + seq[-2])
    return seq[:n]
print(fibonacci(10))  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

```bash
# 克隆这个网站本身
git clone https://github.com/Hiweny/Hiweny-s-web.git
cd Hiweny-s-web
npm install
npm run dev
```

```json
{
  "name": "hiweny-site",
  "private": true,
  "scripts": { "dev": "vite", "build": "vite build" }
}
```

```css
.card {
  display: grid;
  gap: 1rem;
  background: linear-gradient(135deg, #22d3ee, #e879f9);
  border-radius: 16px;
}
```

```html
<article class="post">
  <h2>标题</h2>
  <p>一段 <a href="#">链接</a> 文字。</p>
  <img src="cover.png" alt="封面" loading="lazy" />
</article>
```

### 表格（GFM，含对齐）

用冒号控制三列的对齐方式：

| 左对齐 | 居中对齐 | 右对齐 |
| :--- | :---: | ---: |
| 苹果 | Apple | 2026-01-01 |
| 香蕉 | Banana | 2026-02-14 |
| 樱桃 | Cherry | 2026-09-05 |

### 原生 HTML（rehype-raw）

除了 Markdown 语法，也能直接写 HTML，会被正常渲染：

<details>
<summary>点击展开 / 折叠</summary>
折叠面板里照样能放**任意 Markdown**：

- 列表项
- `代码`
- [链接](https://github.com/Hiweny)
</details>

<blockquote>
HTML 与 Markdown 混排：<strong>粗体</strong>、<em>斜体</em>、<code>code</code>。
</blockquote>

### 脚注（GFM）

这里有一个带编号的脚注引用[^1]，再来一个长一点的[^longnote]。

[^1]: 这是第一条脚注的解释文字。
[^longnote]: 较长的脚注也能写成多段，渲染时会自动汇总到文章末尾。

### 分割线

---

### 目录（TOC）

在任意位置写一个 `## 目录`，网站会自动提取它后面的标题，生成一份可点击、平滑滚动的目录（本页开头就是例子）；英文版写 `## Table of Contents` 同理。

### 转义与特殊符号

想原样显示符号时用反斜杠转义：\*不是斜体\*、\# 不是标题、\` 不是代码、反斜杠 \\ 本身。

另外这些符号可以直接用：箭头 →、省略号 …、破折号 ——、乘号 ×、版权 ©、温度 ℃。

### 超长行 / 横向滚动

```text
这是一行非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常长的代码，用来验证代码块在手机窄屏下可以横向滚动而不会撑破布局 layout overflow test 0123456789 0123456789 0123456789
```

## 结束语

从 DeepSeek 回复里的一条竖线开始，到现在拥有一个会把 Markdown 渲染成我喜欢模样的网站，这条路走得很随性，也很有意思。

以后我只要把零散的想法丢给 AI，它对照这篇范本，就能帮我产出一篇篇「我的文章」；而我继续负责出主意，以及最后**看一眼、挑一挑**。

谢谢你读到这里。如果你正是来帮我写文章的那位 AI——现在，你知道该交付什么样的 Markdown 了吧？😄

[col]: https://hiweny.github.io/Hiweny-s-web/articles/collection "我的图片收藏夹项目文章"

<!-- EN -->

> First off, this is **an article of mine** about how I met Markdown. But it is also a **template**: I'm too lazy to typeset by hand, so I hand this to an AI and have it write Markdown in my style. Read it as an essay, or use it as the spec for ghost-writing for me.

## Table of Contents

## What is Markdown?

Markdown is a **lightweight markup language**: with the simplest plain-text symbols you can write articles that are clearly structured and nicely laid out.

When I first heard the name I had no idea what it meant. "Marking down"? In fact **Markdown = Mark + down**, a play on *markup* languages — it turns fancy typesetting into symbols you can type without thinking. It only clicked once I started using it, and that happened in a chat with **DeepSeek**.

## How I met Markdown

I was surprised to find such **rich styling** in DeepSeek's replies: bold, lists, code boxes, all neat. One question at a time, I picked up Markdown through those conversations.

### The blockquote I fell for

First I fell for the **blockquote** — a vertical bar followed by text, so clean:

> One bar, one line — its own little world.

And it nests, like Russian dolls:

> Outer quote.
>
> > Inner quote, layer by layer.
> >
> > > One level deeper.

### Code blocks: copy with one click

Then came **code blocks** — commands and configs in a box with a **one-click copy** button:

```bash
git push origin main
```

Tap once and it's mine. So handy.

### The horizontal rule

And the **horizontal rule**, a single line that gives an article room to breathe:

---

One block above, one below, a line in between — reading gets a rhythm.

### More Markdown beyond DeepSeek

Markdown is everywhere. In **GitHub READMEs** I saw more of it; I read plenty of Markdown blogs too, each styled in its own way. I realised: **content is written in Markdown, but the look is decided by whatever renders it.**

## I wanted my own Markdown

A thought took root:

> I want **my own Markdown** — a style that fits my taste, for recording my projects (like this one about my [image archive Collection](https://hiweny.github.io/Hiweny-s-web/articles/collection)), my ideas and my ramblings.

And so this **website**, and **this article**, came to be.

To be honest, I'm not good at writing Markdown. I recognise the basic symbols, but setting it all out myself? Not really — mostly because I'm **too lazy to learn**, haha.

## I can't write it, but AI can

No problem — **AI can**. It writes Markdown fluently, off the top of its head.

Many AI clients just don't render Markdown beautifully, so I flipped it around: **the AI writes, my site renders it the way I like.** To make sure any AI gets it right in one shot, I put my tone, the supported syntax and the output format all in this article — it's the show flat I hand to my ghost-writer. Along the way I've quietly picked up some syntax myself.

## The rules I give my ghost-writing AI

If you're writing for me, read this carefully. My ask is simple: **hand me back one complete `.md` file**, not scattered notes. This very article is the template to match.

### 1. Just deliver one .md file

You don't need to worry about how the site builds, where the file goes, or deployment — that's engineering, and I've documented it in the project [README (rendered)](https://github.com/Hiweny/Hiweny-s-web/blob/main/README.md); if you're an AI that wants plain text, use the [raw README](https://raw.githubusercontent.com/Hiweny/Hiweny-s-web/main/README.md). Just write the Markdown below and give it to me; I publish it, the site rebuilds and slots it into the home list by date.

### 2. Frontmatter metadata

Every `.md` opens with a `---`-wrapped block that controls how it appears on the home list:

| Field | Required | Purpose |
| :--- | :---: | :--- |
| `title` | ✅ | Chinese title — short and to the point |
| `title_en` | recommended | English title, falls back to `title` |
| `date` | ✅ | `YYYY-MM-DD`, **drives reverse-chronological order** |
| `tags` | recommended | Tag array, e.g. `["Markdown", "Writing"]` |
| `excerpt` | recommended | One-line Chinese summary, keep it tight |
| `excerpt_en` | recommended | English summary, falls back to `excerpt` |
| `github` | optional | URL for the "view source" button |
| `live` | optional | URL for the "live demo" button |

> Tweak `date` and the home order moves with it — **ordering is entirely date-driven**, no manual list. For project posts I usually take the source repo's creation date.

### 3. Bilingual writing

- Chinese body first, English body after a marker `<!-- EN -->` that sits on its own line;
- Both complete and fluent; the English is **re-expressed on its own**, not translated word by word;
- For a single-language post, simply omit `<!-- EN -->`. To merely mention the marker in prose, write it as inline code `` `<!-- EN -->` `` so it isn't treated as the separator.

### 4. What I expect from the draft

1. **My words are the skeleton** — my ideas, experiences and opinions are the backbone; keep them and my stance;
2. **Know the project** — for a project post, read the source and describe features that truly exist; never invent;
3. **Extend sensibly** — add background, principles, examples and the technical points I raise, so a lay reader follows;
4. **My voice, first person** — I am the author, narrate as "I"; you're the behind-the-scenes writer, don't step out as a bystander;
5. **Syntax on demand** — let headings, lists, tables, quotes and code serve the content, not show off;
6. **A complete piece** — a beginning and an end, smooth to read, with a standalone English version at the end.

## Full syntax showcase

Here's every syntax the site supports (the TOC was shown up top). It's both explanation and your typesetting reference.

### Headings

The number of `#` sets the level, one through six:

```text
# H1 (the article title, rendered from the title metadata)
## H2 (body starts here, gradient underline)
### H3 (left accent bar)
#### H4
##### H5
###### H6
```

The page title is H1 and the sections around you are H2/H3; here are real H4–H6:

#### H4

##### H5

###### H6

### Text styles

- **bold**
- *italic*
- ***bold italic***
- ~~strikethrough~~
- `inline code`
- <mark>highlight</mark>
- Press <kbd>Ctrl</kbd> + <kbd>C</kbd>
- Subscript H<sub>2</sub>O and superscript x<sup>2</sup>
- <u>underline</u> and <small>small</small>
- Autolink: https://github.com/Hiweny

> Hard line break: two trailing spaces  
> force a new line.

### Links

- Inline: [Hiweny's GitHub](https://github.com/Hiweny)
- With title: [My homepage](https://hiweny.github.io/Hiweny-s-web/ "hover text")
- Reference: link to another post on this site, [my Collection article][colref] — defined at the end. **This is how posts cross-link.**

### Images

Just paste an image URL: lazy-loaded, rounded, shadowed, lifts on hover. The site loads without a referrer by default, so most image hosts work:

![Example image](https://ps.ssl.qhmsg.com/t0227fad5259da8ae35.jpg "with a title")

### Unordered lists

- Level one
  - Level two A
  - Level two B
    - Level three ①
- Level two

### Ordered lists

1. First
2. Second
3. Third
   1. Sub 3.1
   2. Sub 3.2

### Task lists (GFM)

- [x] Done
- [x] Markdown-driven
- [ ] Todo: write another post
- [ ] Todo: fill in project posts over time

### Blockquotes

> A single-line quote.
> A multi-line quote showing the glassy background and the gradient bar on the left.
>
> A blank line starts a new paragraph.
>
> > And it nests.

### Code blocks (highlighted + copy button)

Tag the language after the fences for highlighting; the copy button is built in:

```ts
const greet = (name: string): string => `Hello, ${name}!`;
```

```python
print(fibonacci(10))  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

```bash
# Clone this very site
git clone https://github.com/Hiweny/Hiweny-s-web.git
cd Hiweny-s-web
npm install
npm run dev
```

```json
{ "name": "hiweny-site", "scripts": { "build": "vite build" } }
```

### Tables (GFM, with alignment)

Colons control each column's alignment:

| Left | Center | Right |
| :--- | :---: | ---: |
| Apple | red | 2026-01-01 |
| Banana | yellow | 2026-02-14 |
| Cherry | dark red | 2026-09-05 |

### Raw HTML (rehype-raw)

Beyond Markdown, plain HTML renders too:

<details>
<summary>Expand / collapse</summary>
Any **Markdown** works inside:

- a list item
- `code`
- [a link](https://github.com/Hiweny)
</details>

### Footnotes (GFM)

Here is a footnote[^1] and a longer one[^longnote].

[^1]: The text of the first footnote.
[^longnote]: A longer footnote can span sentences and gets collected at the end of the post.

### Horizontal rule

---

### Table of Contents (TOC)

Write `## Table of Contents` anywhere and the site builds a clickable, smooth-scrolling TOC from the headings after it (see the top of this page).

### Escapes & special characters

Escape a symbol with a backslash to show it literally: \*not italic\*, \# not a heading, \` not code, the backslash \\ itself.

These symbols work as-is: arrows →, ellipsis …, dashes ——, multiplication ×, copyright ©, degree ℃.

### Very long lines / horizontal scroll

```text
A very very very very very very very very very very very very very very very long line to verify that code blocks scroll horizontally on narrow phones without breaking the layout 0123456789 0123456789 0123456789
```

## Closing

It started with a single vertical bar in a DeepSeek reply, and now I have a site that renders Markdown exactly the way I like. The road was casual and fun.

From now on I toss my scattered thoughts to an AI; it matches this template and turns them into articles of mine. I keep doing what I'm good for: having the ideas, then **reading and picking**.

Thanks for reading this far. And if you're the AI writing for me — now you know exactly what Markdown to hand back. 😄

[colref]: https://hiweny.github.io/Hiweny-s-web/articles/collection "My image-archive project post"
