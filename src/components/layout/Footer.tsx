import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-border/40 bg-black/40 px-6 py-10 text-center text-sm text-muted backdrop-blur">
      © {year} 雨檐 (Hiweny) — {t('footer')}
    </footer>
  );
};
