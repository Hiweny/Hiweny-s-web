import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { articles, resolveTitle, resolveExcerpt, type Locale } from '../../content/articles';
import { SectionLabel } from './SectionLabel';

export const ArticlesSection = () => {
  const { t, i18n } = useTranslation();
  const locale = (i18n.language.startsWith('zh') ? 'zh' : 'en') as Locale;

  return (
    <section id="articles" className="mx-auto max-w-4xl px-6 py-16 md:px-12 md:py-20 scroll-mt-28">
      <SectionLabel number="">
        <span className="text-2xl font-bold text-text md:text-3xl">{t('section.articles')}</span>
      </SectionLabel>

      <div className="mt-10 space-y-3">
        {articles.map((a) => {
          const excerpt = resolveExcerpt(a, locale);
          return (
            <Link
              key={a.slug}
              to={`/articles/${a.slug}`}
              className="group block focus:outline-none"
              aria-label={resolveTitle(a, locale)}
            >
              <div className="rounded-2xl border border-white/10 bg-surface/50 p-5 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-accent/40 group-hover:bg-surface/70 md:p-6">
                <div className="flex items-center gap-x-4">
                  <span className="shrink-0 font-mono text-xs text-muted">{a.meta.date}</span>
                  <span className="min-w-0 flex-1 text-lg font-bold text-text transition-colors group-hover:text-accent md:text-xl">
                    {resolveTitle(a, locale)}
                  </span>
                  <span
                    className="shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent"
                    aria-hidden
                  >
                    →
                  </span>
                </div>
                {excerpt && (
                  <p className="mt-2 text-sm leading-relaxed text-muted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [overflow:hidden]">
                    {excerpt}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
