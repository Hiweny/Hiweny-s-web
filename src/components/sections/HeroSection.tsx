import { useTranslation } from 'react-i18next';
import BlurText from '../reactbits/TextAnimations/BlurText/BlurText';
import { heroSubtitle } from '../../content/about';
import type { Locale } from '../../content/articles';

export const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const locale = (i18n.language.startsWith('zh') ? 'zh' : 'en') as Locale;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center px-6 pt-32 md:px-12"
    >
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <p className="mb-6 inline-flex items-center gap-2 text-base uppercase tracking-[0.24em] text-accent/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)]">
          {t('hero.greeting')}
        </p>

        <BlurText
          text={t('hero.name')}
          delay={120}
          animateBy="letters"
          direction="top"
          className="hero-title-blur bg-accent-gradient bg-clip-text text-[clamp(2.5rem,9vw,7.75rem)] font-bold leading-[0.95] tracking-normal text-transparent drop-shadow-[0_2px_28px_rgba(0,0,0,0.5)]"
        />

        <p className="mt-8 max-w-3xl text-lg font-bold leading-relaxed text-text/90 md:text-2xl drop-shadow-[0_1px_10px_rgba(0,0,0,0.55)]">
          {heroSubtitle[locale]}
        </p>

        <div className="mt-12">
          <a
            href="mailto:3458096571@qq.com"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-text backdrop-blur-md transition-all hover:border-accent/60 hover:bg-white/10 hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 -z-0 bg-accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="relative">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span className="relative">{t('hero.cta')}</span>
            <span className="relative translate-x-0 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
