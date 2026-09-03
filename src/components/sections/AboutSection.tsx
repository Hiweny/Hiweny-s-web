import { useTranslation } from 'react-i18next';
import TrueFocus from '../reactbits/TextAnimations/TrueFocus/TrueFocus';
import { about } from '../../content/about';
import type { Locale } from '../../content/articles';

// About is the visual parent of everything below the hero: the title is large enough
// that Projects + Contact read as sub-sections of it. Keep the TrueFocus effect.
export const AboutSection = () => {
  const { i18n } = useTranslation();
  const locale = (i18n.language.startsWith('zh') ? 'zh' : 'en') as Locale;

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 pt-32 pb-12 md:px-12 md:pt-40 md:pb-20">
      <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <TrueFocus
            sentence="About me"
            manualMode={false}
            blurAmount={3}
            borderColor="rgb(var(--color-accent-2))"
            glowColor="rgb(var(--color-accent-2) / 0.62)"
            animationDuration={0.6}
            pauseBetweenAnimations={1.4}
            className="!justify-start !flex-nowrap"
            wordClassName="!text-5xl md:!text-6xl lg:!text-7xl !leading-[0.92] text-text whitespace-nowrap drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]"
          />
        </div>

        <p className="max-w-xl text-base leading-relaxed text-text/80 md:text-lg">
          {about[locale]}
        </p>
      </div>
    </section>
  );
};
