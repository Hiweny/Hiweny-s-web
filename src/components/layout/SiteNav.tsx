import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { StaggeredMenu } from '../reactbits/Components/StaggeredMenu/StaggeredMenu';
import { useBackground } from '../BackgroundSwitcher';
const ACCENT = '#A78BFA';
const BASE = import.meta.env.BASE_URL; // e.g. "/Hiweny-s-web/"
// Build a link that works both at the site root and under a sub-path deployment.
const hrefFor = (route: string) => `${BASE}${route.replace(/^\//, '')}`;
export const SiteNav = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { next: nextBg } = useBackground();
  const isZh = i18n.language.startsWith('zh');
  const items = [
    { label: 'Home', ariaLabel: 'Home', link: hrefFor('/#hero') },
    { label: t('section.articles'), ariaLabel: t('section.articles'), link: hrefFor('/#articles') },
    { label: t('section.contact'), ariaLabel: t('section.contact'), link: hrefFor('/#contact') },
    { label: t('section.credits'), ariaLabel: t('section.credits'), link: hrefFor('/credits') }
  ];
  // socialItems slot becomes our utility row: language, background switch, GitHub
  const socialItems = [
    { label: isZh ? 'English' : '中文', link: '#action:lang' },
    { label: t('dock.bg'), link: '#action:bg' },
    { label: 'GitHub', link: 'https://github.com/Hiweny' }
  ];
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const a = target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') ?? '';
    if (href === '#action:bg') {
      e.preventDefault();
      nextBg();
      return;
    }
    if (href === '#action:lang') {
      e.preventDefault();
      void i18n.changeLanguage(isZh ? 'en' : 'zh');
      return;
    }
    // Normalize to an app-relative path (strip the deployment base prefix).
    let route = href;
    if (BASE && route.startsWith(BASE)) route = '/' + route.slice(BASE.length);
    if (route.startsWith('/#')) {
      e.preventDefault();
      const hash = route.slice(1);
      if (location.pathname === '/') {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/' + hash);
      }
      return;
    }
    // Regular in-app routes (e.g. /credits, /projects/<slug>) — use the router
    // so we don't reload the page and lose the background / menu state.
    if (route.startsWith('/') && !route.startsWith('//')) {
      e.preventDefault();
      navigate(route);
    }
  };
  return (
    <div className="staggered-menu-host fixed inset-0 pointer-events-none z-50" onClickCapture={handleClick}>
      <div className="pointer-events-none h-full">
        <StaggeredMenu
          position="right"
          isFixed
          items={items}
          socialItems={socialItems}
          displaySocials
          accentColor={ACCENT}
          menuButtonColor="#fff"
          openMenuButtonColor="#0f0a1f"
          colors={['#241B3B', '#5227FF']}
          logoUrl={BASE + 'logo.svg'}
          displayItemNumbering={false}
          changeMenuColorOnOpen
        />
      </div>
    </div>
  );
};
