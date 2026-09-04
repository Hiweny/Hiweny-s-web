---
title: "有趣的 Markdown：我的博客写作语言"
title_en: "Fun with Markdown: My Blog Writing Language"
date: "2026-09-05"
tags: ["Markdown", "写作", "AI", "博客"]
excerpt: "从在 DeepSeek 里第一次遇见 Markdown，到拥有属于自己的博客写作规则——这篇既是入门心得，也是一份写给 AI 的代笔手册，还顺带全量展示本站支持的语法。"
excerpt_en: "From meeting Markdown in DeepSeek to owning a personal blog writing spec — this is both a beginner's story, a ghost-writer manual for AI, and a full syntax showcase for this site."
github: https://github.com/Hiweny
---

> 这篇文章有**三个身份**：它是我的 Markdown 入门心得，是给任何 AI 的一份「为我代笔」的使用手册，也是本站支持语法的全量示例。你可以把它直接丢给 AI，它就知道该怎么为我写文章。

## 目录

## 什么是 Markdown

Markdown 是一种**轻量标记语言**：用最简单的纯文本符号，就能写出结构清晰、排版漂亮的文章。

我第一次听到这个名字的时候，完全不知道它是什么玩意儿。什么「标记向下」之类的奇怪说法——其实 **Markdown = Mark（标记）+ down（向下）**，源自一种叫 Markup（标记语言）的写作方式，它把复杂的排版「降级」成顺手就能打的符号。等反应过来，才发现自己一直在用它。

我真正认识它，是在一次和 **DeepSeek** 的对话里。

## 我和 Markdown 的初遇

那时候我惊讶地发现，DeepSeek 的回复里居然有**很丰富的样式**：有加粗、有列表、有代码框，整整齐齐的。我一边看，一边冒出一个个「这是什么」的疑问，就这样一步步在对话中认识了 Markdown。

### 一眼爱上的引用块

我最先喜欢上的，是那个**引用块**的样式——一条竖线后面跟着文字，感觉很好看，也很有意思：

> 一条竖线，一段文字，就自成一方天地。

而且它还能**反复嵌套**：

> 外面的引用。
>
> > 里面的引用，层层递进。
> >
> > > 再往里一层，像俄罗斯套娃。

当时我就觉得：这排版怎么这么舒服？

### 代码块：一键复制

然后是**代码块**。这个语法对我来说太方便了——写好的代码、命令、配置，一个框框装起来，还能**一键复制**：

```bash
# 比如一条部署命令
git push origin main
```

想要什么，点一下就能拿走，省心。

### 分割线：恰到好处的留白

还有那个**分割线**，一条线把内容隔开，文章的节奏一下就出来了：

---

上面一段内容，下面一段内容，中间一条线，阅读就有了呼吸感。

## 走出 DeepSeek：更多样的 Markdown

后来我发现 Markdown 其实无处不在。在 **GitHub 的 README** 里，我见到了更多风格；也看了不少别人的 Markdown 博客，大家的样式五花八门，各有各的美。

原来同一种语言，可以被渲染成完全不同的样子——**内容用 Markdown 写，样式由展示端决定**。

## 我也想要自己的 Markdown

于是我心里萌生了一个念头：

> 我也想做出**属于自己的 Markdown**，拥有一套**专门的、符合自己审美的样式**，用来记录我的项目、想法和碎碎念。

所以就有了**这个网站**，以及**这篇文章**。

不过说实话，我根本不太会用 Markdown——虽然知道一些基础的符号，但就是不太会。主要是**懒得学**，哈哈。

## 我不会写，但 AI 会

但没关系，**我不会，AI 会啊**。它写 Markdown 一溜一溜的，张口就来。

可惜的是，很多 AI 客户端自带的 Markdown 渲染并不是很好看。既然这样，不如**给我找一位专门的 Markdown 代笔**——它负责写，我的网站负责渲染成好看的样子。

所以就有了这篇文章：它把「我的想法、网站支持的语法、写作规则」全部写清楚，AI 一看就懂，照着写就能产出合我心意的文章。我也在耳濡目染中，慢慢学到了一些 Markdown 语法。

## 本站的 Markdown 规则

如果你是一位 AI（或者想用 AI 帮我写文章的人），请认真阅读这一节。这是为本站写文章的全部规则。

### 一、文章放在哪里

- 把 `.md` 文件放进仓库的 `src/content/articles/` 目录即可；
- **文件名就是网址**：如 `markdown.md` → `/articles/markdown`，建议用英文小写，不要用中文名；
- 文件一旦上传并推送，网站会自动构建、主页**自动按时间倒序**更新。

### 二、元数据（Frontmatter）

文章开头用 `---` 包裹的元数据，控制主页列表的展示信息：

| 字段 | 必填 | 作用 |
| :--- | :---: | :--- |
| `title` | ✅ | 中文标题，主页列表与详情页展示 |
| `title_en` | 推荐 | 英文标题，英文界面回退到 `title` |
| `date` | ✅ | 格式 `YYYY-MM-DD`，**主页按此倒序排列** |
| `tags` | 推荐 | 标签数组，如 `["Markdown", "写作"]` |
| `excerpt` | 推荐 | 中文一句话摘要，主页列表展示 |
| `excerpt_en` | 推荐 | 英文摘要，回退到 `excerpt` |
| `github` | 可选 | 仓库地址，详情页显示「查看源码」按钮 |
| `live` | 可选 | 在线地址，详情页显示「在线 Demo」按钮 |

> 改元数据里的 `date`，主页的顺序也会跟着变——**日期由元数据驱动**，不需要手动维护列表。

### 三、双语写作

- 中文正文写在前，英文正文写在 `<!-- EN -->` 之后；
- `<!-- EN -->` 是一个特殊分隔符，左侧是中文、右侧是英文；
- 两段都要完整、通顺，不是逐句直译，而是各自成文。

### 四、给我的写作要求

1. **以我的原话为骨架**：我提供的想法、经历、观点，是文章的主干，不要丢掉；
2. **结合项目本身**：如果是项目文章，去读它的源码，把真实存在的功能、细节、用法写进去；
3. **合理发散**：在我的原意基础上丰富扩展，包括我提到的知识点、技术点以及相关概念，补充背景、原理、例子；
4. **按需使用语法**：不必为了用而用，让标题、列表、表格、引用、代码块等自然服务于内容；
5. **逻辑完整**：组织成一篇有头有尾、读起来顺畅的文章；
6. **给出英文版**：在 `<!-- EN -->` 后写完整的英文版本。

## 语法全量展示

这一节把本站支持的所有语法都过一遍（目录功能已在开头展示过，下面从标题到特殊符号逐一示例）。

### 标题层级

用 `#` 的数量表示层级，从一级到六级：

```text
# 一级标题 H1（文章大标题，由元数据 title 渲染）
## 二级标题 H2（正文从这里开始，渐变下划线）
### 三级标题 H3（左侧竖条）
#### 四级标题 H4
##### 五级标题 H5
###### 六级标题 H6
```

本文大标题就是 H1、周围章节就是 H2/H3，下面再真实渲染一下 H4–H6：

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

> 硬换行演示：第一行后面跟两个空格  
> 就能手动换到下一行。

### 链接

- 行内式：[Hiweny 的 GitHub](https://github.com/Hiweny)
- 带标题：[打开我的主页](https://hiweny.github.io/Hiweny-s-web/ "标题提示文字")
- 参考式：[我的收藏夹][col]，引用在文末定义

### 图片

外链图片（直接用图片 URL，懒加载、圆角阴影、悬停上浮）：

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
- [ ] 待办：写一篇新文章
- [ ] 待办：部署到 GitHub Pages

### 引用块

> 单行引用。

> 多行引用第一行，用来观察背景玻璃质感与左侧渐变竖条。
>
> 第二行，中间空行形成新段落。
>
> > 嵌套引用。

### 代码块（语法高亮 + 复制按钮）

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
# 克隆并启动一个项目
git clone https://github.com/Hiweny/ai-chat.git
cd ai-chat
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

| 左对齐 | 居中对齐 | 右对齐 |
| :--- | :---: | ---: |
| QQbot | 机器人 | 2026-08-23 |
| Collection | 收藏夹 | 2026-04-24 |
| AI Chat | 对话应用 | 2026-07-25 |
| MoeGallery | 图库 | 2026-07-27 |

### 原生 HTML（rehype-raw）

<details>
<summary>点击展开 / 折叠</summary>

这里是折叠面板里的内容，可以放**任意 Markdown**：

- 列表项
- `代码`
- [链接](https://github.com/Hiweny)

</details>

<blockquote>
HTML 与 Markdown 混排：<strong>粗体</strong>、<em>斜体</em>、<code>code</code>。
</blockquote>

### 脚注（GFM）

这里有一个带编号的脚注引用[^1]，再来一个[^longnote]。

[^1]: 这是第一条脚注的解释文字。

[^longnote]: 较长的脚注也可以写成多段，渲染时会自动汇总到文末。

### 分割线

---

### 目录（TOC）

在文章任意位置写一个 `## 目录`，网站会自动**提取之后的所有标题**生成一份可点击跳转的目录（本页开头就是现成例子）。

### 转义与特殊符号

特殊字符转义：\*不是斜体\*、\# 不是标题、\` 不是代码、反斜杠 \\ 本身。

箭头 →、省略号 …、破折号 ——、乘号 ×、版权 ©、温度 ℃。

### 超长行 / 横向滚动

```text
这是一行非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常长的代码，用来验证代码块在手机窄屏下可以横向滚动而不会撑破布局 layout overflow test 0123456789 0123456789 0123456789
```

## 结束语

从 DeepSeek 里的一条竖线开始，到现在拥有一个属于自己的、会渲染 Markdown 的网站，这条路走得很随性，也很有意思。

以后我只要把想法扔给 AI，它照着这篇文章的规则，就能帮我把一篇篇「我的文章」写出来；而我，继续负责**看**和**挑**就好。

谢谢你读到这里。如果你也是一位 AI，现在，你知道该怎么为我写文章了吧？😄

[col]: https://hiweny.github.io/collection/ "雪线之上 · 图片收藏夹"

<!-- EN -->

> This post has **three identities**: it is my Markdown beginner's story, a ghost-writing manual for any AI that writes for me, and a full showcase of every syntax this site supports. Hand it to an AI and it will know exactly how to write articles for me.

## Table of Contents

## What is Markdown?

Markdown is a **lightweight markup language**: with the simplest plain-text symbols, you can write articles that are clear in structure and beautiful in layout.

The first time I heard the name, I had no idea what it was. Something like "marking down"? Actually **Markdown = Mark + down**, named after *markup* languages, turning complex typesetting into symbols you can type without thinking. It wasn't until I used it that it all clicked — and I first truly met it in a conversation with **DeepSeek**.

## How I met Markdown

In DeepSeek's replies I found **rich styling**: bold text, lists, code boxes — all neat and tidy. Question by question, I learned Markdown through conversation.

### The blockquote I fell for

My first love was the **blockquote** — a vertical bar followed by text. It looked so clean:

> One vertical bar, a line of text — its own little world.

And it nests:

> Outer quote.
>
> > Inner quote, layer by layer.
> >
> > > One more level in, like Russian dolls.

### Code blocks: copy with one click

Then came **code blocks**. So convenient — commands, configs, snippets, wrapped in a box with a **one-click copy** button:

```bash
git push origin main
```

### The horizontal rule

And the **horizontal rule** — a single line that breaks up content and gives the article a rhythm:

---

### More Markdown beyond DeepSeek

Markdown is everywhere. In **GitHub READMEs** I saw more styles; I read many Markdown blogs too. Same language, rendered completely differently — **content is written in Markdown, style is decided by the renderer**.

## I wanted my own Markdown

A thought took root:

> I want **my own Markdown** — a style of my own, used to record my projects, ideas and ramblings.

And so this **website** — and this **article** — were born.

To be honest, I'm not really good at Markdown. I know some basic symbols, but that's about it. Mainly because I'm **too lazy to learn**, haha.

## I can't write it, but AI can

No problem — **AI can**. It writes Markdown fluently, off the top of its head.

But many AI clients don't render Markdown beautifully. So why not **hire a dedicated Markdown ghost-writer** — it writes, and my site renders it beautifully?

That's exactly what this article does: it documents my ideas, the syntax my site supports, and the writing rules. An AI reads it once and knows how to produce articles I'll love. Along the way, I've picked up some Markdown myself.

## The Markdown rules of this site

If you are an AI (or someone who wants AI to write for me), read this section carefully. These are all the rules for writing an article here.

### 1. Where articles live

- Put `.md` files in `src/content/articles/`;
- **The file name is the URL**: `markdown.md` → `/articles/markdown` — use lowercase English, avoid Chinese file names;
- Once pushed, the site rebuilds automatically and the home list **updates, newest first by date**.

### 2. Frontmatter metadata

The `---` block at the top controls what the home list shows:

| Field | Required | Purpose |
| :--- | :---: | :--- |
| `title` | ✅ | Chinese title |
| `title_en` | recommended | English title, falls back to `title` |
| `date` | ✅ | `YYYY-MM-DD`, **drives the reverse-chronological order** |
| `tags` | recommended | Tag array, e.g. `["Markdown", "Writing"]` |
| `excerpt` | recommended | One-line Chinese summary |
| `excerpt_en` | recommended | English summary, falls back to `excerpt` |
| `github` | optional | Repo URL → "view source" button |
| `live` | optional | Live URL → "live demo" button |

> Change `date` and the order updates — **dates are metadata-driven**, no manual list to maintain.

### 3. Bilingual writing

- Chinese body first, English body after the `<!-- EN -->` marker;
- `<!-- EN -->` is a special separator: Chinese on the left, English on the right;
- Both must be complete and fluent — written independently, not word-for-word translations.

### 4. My writing requirements

1. **Use my words as the skeleton** — my ideas, experiences and opinions are the backbone;
2. **Read the project** — for project articles, dig into the source and include real features and details;
3. **Extend reasonably** — enrich based on my intent, including knowledge points, techniques and related concepts, adding background, principles and examples;
4. **Use syntax as needed** — let headings, lists, tables, quotes and code serve the content, not the other way around;
5. **Complete logic** — organize into a well-structured article;
6. **Give an English version** — write the full English version after `<!-- EN -->`.

## Full syntax showcase

Everything this site supports, in one pass (TOC was demonstrated at the top).

### Headings

The number of `#` marks the level, from one to six:

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
- With title: [My homepage](https://hiweny.github.io/Hiweny-s-web/ "title text")
- Reference: [my collection][colref]

### Images

![Example image](https://ps.ssl.qhmsg.com/t0227fad5259da8ae35.jpg "with a title")

### Unordered lists

- Level one
  - Level two
    - Level three

### Ordered lists

1. First
2. Second
   1. Sub 2.1

### Task lists (GFM)

- [x] Done
- [ ] Todo

### Blockquotes

> A single-line quote.

> Multi-line quote, with a blank line for a new paragraph.
>
> > Nested quote.

### Code blocks (highlighted + copy button)

```ts
const greet = (name: string): string => `Hello, ${name}!`;
```

```python
print(fibonacci(10))  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

```json
{ "name": "hiweny-site", "scripts": { "build": "vite build" } }
```

### Tables (GFM, with alignment)

| Left | Center | Right |
| :--- | :---: | ---: |
| QQbot | bot | 2026-08-23 |
| Collection | archive | 2026-04-24 |

### Raw HTML (rehype-raw)

<details>
<summary>Expand / collapse</summary>

Content inside can use **any Markdown**:

- list item
- `code`
- [link](https://github.com/Hiweny)

</details>

### Footnotes (GFM)

Here is a footnote[^1] and another[^longnote].

### Horizontal rule

---

### Table of Contents (TOC)

Write `## Table of Contents` anywhere and the site automatically builds a clickable TOC from all following headings (see the top of this page).

### Escapes & special characters

\*not italic\*, \# not a heading, \` not code, backslash \\.

Arrows →, ellipsis …, dashes ——, multiplication ×, copyright ©, degree ℃.

### Very long lines / horizontal scroll

```text
A very very very very very very very very very very very very very very very long line to verify that code blocks scroll horizontally on narrow phones without breaking the layout 0123456789 0123456789 0123456789
```

## Closing

From a vertical bar in DeepSeek to owning a website that renders Markdown beautifully — the road has been casual and fun.

From now on, I just throw my ideas to an AI; it reads the rules in this article and writes my articles for me. I'll keep doing what I do best: **reading and picking**.

Thanks for reading. And if you're an AI — now you know how to write for me. 😄

[colref]: https://hiweny.github.io/collection/ "Snowline · Image Archive"
