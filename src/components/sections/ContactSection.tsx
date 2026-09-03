import { lazy, Suspense, useMemo, type CSSProperties, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionLabel } from './SectionLabel';

// Lanyard pulls in three.js + rapier + drei, so keep it lazy for first paint.
const Lanyard = lazy(() => import('../reactbits/Components/Lanyard/Lanyard'));

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const EmailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

interface ContactMethod {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
  gradient: string;
  glow: string;
  external?: boolean;
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    label: 'Email',
    value: 'Hiweny@users.noreply.github.com',
    href: 'mailto:Hiweny@users.noreply.github.com',
    icon: <EmailIcon />,
    gradient: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)',
    glow: 'rgba(167, 139, 250, 0.35)'
  },
  {
    label: 'GitHub',
    value: '@Hiweny',
    href: 'https://github.com/Hiweny',
    icon: <GitHubIcon />,
    gradient: 'linear-gradient(135deg, #22D3EE 0%, #0EA5E9 100%)',
    glow: 'rgba(34, 211, 238, 0.35)',
    external: true
  },
  {
    label: 'Projects',
    value: 'github.com/Hiweny?tab=repositories',
    href: 'https://github.com/Hiweny?tab=repositories',
    icon: <LinkIcon />,
    gradient: 'linear-gradient(135deg, #FF50AA 0%, #F97316 100%)',
    glow: 'rgba(255, 80, 170, 0.35)',
    external: true
  }
];

export const ContactSection = () => {
  const { t } = useTranslation();
  const reduced = useMemo(prefersReducedMotion, []);

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20 scroll-mt-28">
      <SectionLabel number="">
        <span className="text-2xl font-bold text-text md:text-3xl">{t('section.contact')}</span>
      </SectionLabel>

      <div className="grid items-center gap-10 md:grid-cols-[1.05fr_1fr] md:gap-16">
        <div className="relative h-[520px] w-full select-none md:h-[640px]">
          <div
            className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-60 blur-3xl"
            style={{ background: 'radial-gradient(circle at 50% 30%, rgba(167,139,250,0.4), transparent 60%)' }}
            aria-hidden
          />

          {!reduced ? (
            <Suspense fallback={<div className="h-full w-full" />}>
              <Lanyard position={[0, 0, 16]} fov={22} transparent gravity={[0, -38, 0]} />
            </Suspense>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted">
              <div className="h-72 w-48 rounded-xl bg-surface/60" />
            </div>
          )}

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-muted/70">
            ↑ {t('contact.dragHint')}
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{t('contact.title')}</p>
            <h3 className="mt-3 bg-accent-gradient bg-clip-text text-5xl font-bold leading-[1.05] tracking-tight text-transparent md:text-6xl">
              雨檐
            </h3>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted">{t('contact.role')}</p>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-text/80 md:text-base">{t('contact.desc')}</p>

          <div className="grid gap-3">
            {CONTACT_METHODS.map((method) => (
              <ContactCard key={method.label} {...method} />
            ))}
          </div>

          <div>
            <a
              href="mailto:Hiweny@users.noreply.github.com"
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-text backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:bg-white/10"
            >
              <EmailIcon />
              {t('contact.button')}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactCard = ({
  label,
  value,
  href,
  icon,
  gradient,
  glow,
  external
}: ContactMethod) => (
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noreferrer' : undefined}
    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface/50 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
    style={{ '--glow-color': glow } as CSSProperties}
  >
    <span
      aria-hidden
      className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{ background: 'radial-gradient(circle at 25% 0%, var(--glow-color), transparent 62%)' }}
    />

    <span className="relative flex items-center gap-4">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
        style={{ background: gradient }}
        aria-hidden
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[10px] uppercase tracking-[0.22em] text-muted">{label}</span>
        <span className="mt-1 block truncate text-sm font-bold text-text transition-colors group-hover:text-accent">
          {value}
        </span>
      </span>

      <span
        className="text-xs text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        aria-hidden
      >
        ↗
      </span>
    </span>
  </a>
);
