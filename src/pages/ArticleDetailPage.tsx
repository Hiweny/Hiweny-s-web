import { Children, useEffect, useRef, useState, type ReactElement, type ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import Magnet from '../components/reactbits/Animations/Magnet/Magnet';
import StarBorder from '../components/reactbits/Animations/StarBorder/StarBorder';
import { getArticleBySlug, resolveTitle, splitBody, type Locale } from '../content/articles';

const GithubIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

/** Fenced-code wrapper: macOS-style bar, language tag and a copy button. */
const CodeBlock = ({ children }: { children?: ReactNode }) => {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const child = Children.only(children) as ReactElement<{ className?: string }> | null;
  const cls = child?.props?.className ?? '';
  const lang = /language-([\w-]+)/.exec(cls)?.[1];

  const handleCopy = async () => {
    const text = (preRef.current?.innerText ?? '').replace(/\n$/, '');
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch {
        /* clipboard unavailable */
      }
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="md-codeblock">
      <div className="md-codeblock__bar">
        <span className="md-codeblock__dots">
          <i />
          <i />
          <i />
        </span>
        {lang && <span className="md-codeblock__lang">{lang}</span>}
        <button type="button" className={`md-codeblock__copy${copied ? ' is-copied' : ''}`} onClick={handleCopy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre ref={preRef}>{children}</pre>
    </div>
  );
};

const repoBtnClass =
  'inline-flex items-center gap-2 rounded-lg border border-white/10 bg-surface/40 px-5 py-3 text-sm text-text transition-colors hover:border-accent/40 hover:text-accent';

export const ArticleDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const locale = (i18n.language.startsWith('zh') ? 'zh' : 'en') as Locale;
  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!article) return <Navigate to="/" replace />;

  const { meta } = article;
  const body = splitBody(article.body)[locale];

  return (
    <article className="relative mx-auto max-w-3xl px-6 pb-32 pt-32 md:px-8">
      {/* Back button */}
      <div className="mb-12">
        <Magnet padding={80} magnetStrength={3} wrapperClassName="inline-block">
          <Link
            to="/#articles"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-surface/40 px-4 py-2 text-sm text-muted backdrop-blur transition-colors hover:border-accent/40 hover:text-accent"
          >
            {t('article.backToArticles')}
          </Link>
        </Magnet>
      </div>

      {/* Header */}
      <header className="mb-12">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-muted">{meta.date}</span>
          {meta.tags?.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted">
              #{tag}
            </span>
          ))}
        </div>
        <h1 className="bg-accent-gradient bg-clip-text text-[clamp(2.2rem,6vw,3.4rem)] font-bold leading-[1.1] tracking-tight text-transparent">
          {resolveTitle(article, locale)}
        </h1>

        {(meta.github || meta.live) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {meta.github && (
              <a href={meta.github} target="_blank" rel="noreferrer" className={repoBtnClass}>
                <GithubIcon />
                {t('article.github')}
              </a>
            )}
            {meta.live && (
              <StarBorder
                as="a"
                href={meta.live}
                target="_blank"
                rel="noreferrer"
                color="rgb(34 211 238)"
                speed="5s"
                thickness={2}
                className="inline-flex items-center gap-2 bg-bg/80 px-5 py-3 text-sm font-bold text-text backdrop-blur"
              >
                {t('article.liveDemo')} →
              </StarBorder>
            )}
          </div>
        )}
      </header>

      {/* Markdown body */}
      <section className="mb-12">
        <div className="markdown-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={{
              a: ({ href, children, ...props }) => (
                <a
                  href={href}
                  target={href && /^https?:/.test(href) ? '_blank' : undefined}
                  rel={href && /^https?:/.test(href) ? 'noopener noreferrer' : undefined}
                  {...props}
                >
                  {children}
                </a>
              ),
              img: ({ src, alt }) => (
                <img src={typeof src === 'string' ? src : ''} alt={alt ?? ''} loading="lazy" decoding="async" />
              ),
              pre: ({ children }) => <CodeBlock>{children}</CodeBlock>
            }}
          >
            {body}
          </ReactMarkdown>
        </div>
      </section>
    </article>
  );
};
