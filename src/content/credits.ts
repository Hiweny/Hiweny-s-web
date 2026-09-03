// Open-source dependencies grouped by category. Each entry is exactly what we
// pull at runtime or build time. Order roughly matches how visible the library
// is in the final product.
export type CreditCategory =
  | 'foundations'
  | 'routing'
  | 'animation'
  | 'webgl'
  | 'ui'
  | 'fonts';
export interface CreditEntry {
  name: string;
  role: string;
  license: string;
  url: string;
}
export const credits: Record<CreditCategory, CreditEntry[]> = {
  foundations: [
    { name: 'React', role: 'UI runtime', license: 'MIT', url: 'https://react.dev' },
    { name: 'TypeScript', role: 'Static typing', license: 'Apache-2.0', url: 'https://www.typescriptlang.org' },
    { name: 'Vite', role: 'Dev server + bundler', license: 'MIT', url: 'https://vitejs.dev' },
    { name: '@vitejs/plugin-react', role: 'Vite ⇄ React glue', license: 'MIT', url: 'https://github.com/vitejs/vite-plugin-react' },
    { name: 'PostCSS', role: 'CSS toolchain', license: 'MIT', url: 'https://postcss.org' },
    { name: 'Autoprefixer', role: 'Vendor-prefix CSS', license: 'MIT', url: 'https://github.com/postcss/autoprefixer' }
  ],
  routing: [
    { name: 'React Router', role: 'Client-side routing', license: 'MIT', url: 'https://reactrouter.com' },
    { name: 'i18next', role: 'i18n core', license: 'MIT', url: 'https://www.i18next.com' },
    { name: 'react-i18next', role: 'React bindings for i18next', license: 'MIT', url: 'https://react.i18next.com' },
    { name: 'i18next-browser-languagedetector', role: 'Auto-detect browser locale', license: 'MIT', url: 'https://github.com/i18next/i18next-browser-languageDetector' }
  ],
  animation: [
    { name: 'Motion (formerly Framer Motion)', role: 'Spring & gesture animation', license: 'MIT', url: 'https://motion.dev' },
    { name: 'GSAP', role: 'Tween / ScrollTrigger', license: 'GreenSock Standard (free for non-commercial sites)', url: 'https://gsap.com' },
    { name: '@gsap/react', role: 'GSAP React helpers', license: 'GreenSock Standard', url: 'https://gsap.com/resources/React' }
  ],
  webgl: [
    { name: 'three.js', role: 'WebGL renderer', license: 'MIT', url: 'https://threejs.org' },
    { name: '@react-three/fiber', role: 'React renderer for three.js', license: 'MIT', url: 'https://r3f.docs.pmnd.rs' },
    { name: '@react-three/drei', role: 'Helpers for r3f', license: 'MIT', url: 'https://github.com/pmndrs/drei' },
    { name: '@react-three/rapier', role: 'Rapier physics in r3f', license: 'MIT', url: 'https://github.com/pmndrs/react-three-rapier' },
    { name: 'meshline', role: 'GPU-friendly polylines', license: 'MIT', url: 'https://github.com/pmndrs/meshline' },
    { name: 'OGL', role: 'Tiny WebGL library (Aurora / LineWaves / Prism backgrounds)', license: 'Unlicense', url: 'https://github.com/oframe/ogl' }
  ],
  ui: [
    { name: 'react-bits', role: 'Source of Lanyard, StaggeredMenu, MagicBento, SpotlightCard, GlassIcons, Aurora and other effects', license: 'MIT — by David Haz', url: 'https://github.com/DavidHDev/react-bits' },
    { name: 'Tailwind CSS', role: 'Utility-first styling', license: 'MIT', url: 'https://tailwindcss.com' },
    { name: 'tailwind-merge', role: 'Conflict-free Tailwind class merging', license: 'MIT', url: 'https://github.com/dcastil/tailwind-merge' },
    { name: 'clsx', role: 'Conditional class helper', license: 'MIT', url: 'https://github.com/lukeed/clsx' }
  ],
  fonts: [
    { name: 'JetBrains Mono', role: 'Monospace face used site-wide and on the Lanyard card', license: 'SIL Open Font License 1.1', url: 'https://www.jetbrains.com/lp/mono/' }
  ]
};
