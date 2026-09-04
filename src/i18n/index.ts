import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
const resources = {
  zh: {
    translation: {
      nav: {
        about: 'about',
        articles: 'articles',
        contact: 'contact',
        credits: 'credits'
      },
      hero: {
        greeting: 'hello, world',
        cta: 'Say Hello',
        name: "Hi,\nI'm Hiweny"
      },
      section: {
        about: 'About',
        articles: 'Articles',
        contact: 'Contact',
        credits: 'Credits'
      },
      article: {
        backToArticles: '← 返回文章列表',
        github: '查看源码',
        liveDemo: '在线 Demo',
        typeProject: '项目',
        typeNote: '随笔'
      },
      project: {
        viewDetails: '查看详情',
        backToProjects: '← 返回项目列表',
        github: '查看源码',
        liveDemo: '在线 Demo',
        techStack: '技术栈',
        features: '核心特性',
        article: '项目文章',
        screenshotComingSoon: '截图待补充'
      },
      contact: {
        title: "What's Next?",
        desc: "Always happy to chat — whether it's a collaboration, a tech question, or just dropping by to say hi. My inbox is always open.",
        button: 'Say Hello',
        role: 'Hobbyist · China',
        dragHint: 'try dragging the card'
      },
      credits: {
        title: '致谢',
        subtitle: 'Credits & Acknowledgments',
        intro: '这个网站站在很多开源项目的肩膀上。下面这些工具、库和资源，是它能跑起来、看起来还像样的真正原因。再三感谢。',
        license: '所有列出的依赖都遵循各自的开源协议(多数为 MIT / Apache 2.0 / SIL OFL)。',
        backHome: '← 返回主页',
        categories: {
          foundations: '框架与构建',
          routing: '路由 与 国际化',
          animation: '动效与交互',
          webgl: '3D 与 WebGL',
          ui: '组件与样式',
          fonts: '字体'
        }
      },
      dock: {
        lang: '切换语言',
        bg: '切换背景',
        top: '回到顶部'
      },
      footer: 'Built with ♥ & code'
    }
  },
  en: {
    translation: {
      nav: {
        about: 'about',
        articles: 'articles',
        contact: 'contact',
        credits: 'credits'
      },
      hero: {
        greeting: 'hello, world',
        cta: 'Say Hello',
        name: "Hi,\nI'm Hiweny"
      },
      section: {
        about: 'About',
        articles: 'Articles',
        contact: 'Contact',
        credits: 'Credits'
      },
      article: {
        backToArticles: '← Back to all articles',
        github: 'View on GitHub',
        liveDemo: 'Live Demo',
        typeProject: 'Project',
        typeNote: 'Note'
      },
      project: {
        viewDetails: 'View Details',
        backToProjects: '← Back to all projects',
        github: 'View on GitHub',
        liveDemo: 'Live Demo',
        techStack: 'Tech Stack',
        features: 'Highlights',
        article: 'Project Article',
        screenshotComingSoon: 'Screenshot coming soon'
      },
      contact: {
        title: "What's Next?",
        desc: "Always happy to chat — whether it's a collaboration, a tech question, or just dropping by to say hi. My inbox is always open.",
        button: 'Say Hello',
        role: 'Hobbyist · China',
        dragHint: 'try dragging the card'
      },
      credits: {
        title: 'Credits',
        subtitle: 'Credits & Acknowledgments',
        intro: 'This site stands on the shoulders of a lot of open-source work. The libraries, tools and assets below are the real reason it runs — and looks the way it does. Thank you, sincerely.',
        license: 'All listed dependencies remain under their original open-source licenses (mostly MIT / Apache 2.0 / SIL OFL).',
        backHome: '← Back to home',
        categories: {
          foundations: 'Foundations & Build',
          routing: 'Routing & i18n',
          animation: 'Animation & Interaction',
          webgl: '3D & WebGL',
          ui: 'Components & Styling',
          fonts: 'Typography'
        }
      },
      dock: {
        lang: 'Toggle language',
        bg: 'Switch background',
        top: 'Back to top'
      },
      footer: 'Built with ♥ & code'
    }
  }
};
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['zh', 'en'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });
export default i18n;
export const isLocale = (v: string): v is 'zh' | 'en' => v === 'zh' || v === 'en';
