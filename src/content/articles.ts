export type Locale = 'zh' | 'en';

/** Frontmatter of an article Markdown file. Controls what shows on the home list. */
export interface ArticleMeta {
  /** List title (Chinese). */
  title: string;
  /** List title (English). Falls back to `title`. */
  title_en?: string;
  /** ISO date YYYY-MM-DD. The home list sorts by this, newest first. */
  date: string;
  tags?: string[];
  /** One-line summary for the list (Chinese). */
  excerpt?: string;
  /** One-line summary for the list (English). Falls back to `excerpt`. */
  excerpt_en?: string;
  /** Repo URL → shows a "view source" button on the detail page. */
  github?: string;
  /** Live URL → shows a "live demo" button on the detail page. */
  live?: string;
}

export interface Article {
  /** File name without .md, e.g. qqbot → /articles/qqbot */
  slug: string;
  meta: ArticleMeta;
  /** Raw Markdown body (both languages, split by the `<!-- EN -->` marker). */
  body: string;
}

/**
 * Minimal frontmatter parser (no Node deps, browser-safe).
 * Handles `key: value` lines, quoted strings and JSON arrays only —
 * exactly what this project's article files need.
 */
const parseFrontmatter = (
  raw: string
): { data: ArticleMeta; content: string } => {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!m) return { data: {} as ArticleMeta, content: raw };
  const data: Record<string, unknown> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (!val) continue;
    if (val.startsWith('[')) {
      try {
        data[key] = JSON.parse(val);
      } catch {
        data[key] = val;
      }
    } else {
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      data[key] = val;
    }
  }
  return { data: data as unknown as ArticleMeta, content: raw.slice(m[0].length) };
};

// Vite eagerly loads every *.md under content/articles at build time.
// Adding a new .md file here is all you need for it to appear on the site.
const modules = import.meta.glob('./articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

export const articles: Article[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    const { data, content } = parseFrontmatter(raw);
    return { slug, meta: data, body: content };
  })
  // Newest first.
  .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));

export const getArticleBySlug = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug);

/** Body is `中文 …` then an optional `<!-- EN -->` marker then `English …`.
 *  Only a marker that occupies its OWN line separates the languages;
 *  an inline mention (e.g. inside inline code) must not split the body. */
export const splitBody = (body: string): { zh: string; en: string } => {
  const parts = body.split(/^[ \t]*<!-- EN -->[ \t]*$/m);
  const zh = parts[0].trim();
  const en = parts.length > 1 ? parts.slice(1).join('\n<!-- EN -->\n').trim() : zh;
  return { zh, en };
};

export const resolveTitle = (a: Article, locale: Locale): string =>
  locale === 'zh' ? a.meta.title : a.meta.title_en || a.meta.title;

export const resolveExcerpt = (a: Article, locale: Locale): string =>
  locale === 'zh'
    ? a.meta.excerpt || ''
    : a.meta.excerpt_en || a.meta.excerpt || '';
