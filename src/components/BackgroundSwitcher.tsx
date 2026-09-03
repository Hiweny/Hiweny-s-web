import { createContext, lazy, Suspense, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

const Aurora = lazy(() => import('./reactbits/Backgrounds/Aurora/Aurora'));
const Grainient = lazy(() => import('./reactbits/Backgrounds/Grainient/Grainient'));
const ColorBends = lazy(() => import('./reactbits/Backgrounds/ColorBends/ColorBends'));
const Prism = lazy(() => import('./reactbits/Backgrounds/Prism/Prism'));
const Silk = lazy(() => import('./reactbits/Backgrounds/Silk/Silk'));
const Iridescence = lazy(() => import('./reactbits/Backgrounds/Iridescence/Iridescence'));
const Beams = lazy(() => import('./reactbits/Backgrounds/Beams/Beams'));

type Weight = 'light' | 'heavy';

interface BgEntry {
  id: string;
  weight: Weight;
  render: () => JSX.Element;
}

const ENTRIES: BgEntry[] = [
  { id: 'aurora', weight: 'light', render: () => <Aurora colorStops={['#7C3AED', '#22D3EE', '#FF50AA']} amplitude={1.1} blend={0.55} /> },
  { id: 'grainient', weight: 'light', render: () => <Grainient /> },
  { id: 'colorbends', weight: 'light', render: () => <ColorBends /> },
  { id: 'prism', weight: 'heavy', render: () => <Prism animationType="3drotate" timeScale={0.3} glow={1.0} bloom={0.7} /> },
  { id: 'silk', weight: 'heavy', render: () => <Silk color="#5B4FE1" speed={2.0} scale={1.0} noiseIntensity={1.2} /> },
  { id: 'iridescence', weight: 'heavy', render: () => <Iridescence color={[0.45, 0.35, 0.95]} speed={0.6} amplitude={0.08} /> },
  { id: 'beams', weight: 'heavy', render: () => <Beams beamWidth={2} beamHeight={20} beamNumber={10} lightColor="#A78BFA" speed={1.6} noiseIntensity={1.2} scale={0.2} rotation={45} /> }
];

const STORAGE_KEY = 'hiweny.lastBg';
const FADE_MS = 600;
const LIGHT_BACKGROUNDS = new Set(['aurora', 'grainient', 'colorbends']);

interface BackgroundContextValue {
  current: string;
  next: () => void;
  available: string[];
}

const BackgroundContext = createContext<BackgroundContextValue | null>(null);

const isLowEndDevice = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return true;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const cores = navigator.hardwareConcurrency ?? 2;
  // navigator.deviceMemory is non-standard but supported in Chrome / Android Chrome.
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
  // Save-Data hint from network conditions.
  const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (isMobile || isCoarsePointer) return true;
  if (cores < 4) return true;
  if (memory !== undefined && memory < 4) return true;
  if (conn?.saveData) return true;
  if (conn?.effectiveType && /(^|-)2g$/i.test(conn.effectiveType)) return true;
  return false;
};

const pickPool = (): BgEntry[] => {
  if (isLowEndDevice()) return ENTRIES.filter((e) => e.weight === 'light');
  return ENTRIES;
};

const pickRandom = (pool: BgEntry[], exclude?: string): BgEntry => {
  const filtered = exclude ? pool.filter((e) => e.id !== exclude) : pool;
  const arr = filtered.length > 0 ? filtered : pool;
  return arr[Math.floor(Math.random() * arr.length)];
};

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface LayerState {
  entry: BgEntry;
  visible: boolean;
}

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const pool = useMemo(() => pickPool(), []);
  const reduced = useMemo(() => prefersReducedMotion(), []);

  const initial = useMemo(() => {
    const last = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    return pickRandom(pool, last ?? undefined);
  }, [pool]);

  // Two layers: render both, fade the active one in and the other one out. When the
  // out layer is fully invisible we drop it (set to null) so its rAF stops.
  const [a, setA] = useState<LayerState>({ entry: initial, visible: true });
  const [b, setB] = useState<LayerState | null>(null);
  const slot = useRef<'a' | 'b'>('a'); // which slot currently owns the visible entry

  useEffect(() => {
    const visibleEntry = slot.current === 'a' ? a.entry : b?.entry;
    if (!visibleEntry) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, visibleEntry.id);
    } catch {
      /* ignore */
    }
  }, [a, b]);

  const next = useCallback(() => {
    const currentSlot = slot.current;
    const currentEntry = currentSlot === 'a' ? a.entry : b?.entry;
    if (!currentEntry) return;
    const candidate = pickRandom(pool, currentEntry.id);
    if (candidate.id === currentEntry.id) return;

    // Mount the incoming layer hidden, give React one paint to commit, then flip
    // both visibility flags so CSS transitions can interpolate.
    if (currentSlot === 'a') {
      setB({ entry: candidate, visible: false });
    } else {
      setA({ entry: candidate, visible: false });
    }

    window.setTimeout(() => {
      if (currentSlot === 'a') {
        setB({ entry: candidate, visible: true });
        setA((curr) => ({ ...curr, visible: false }));
        slot.current = 'b';
      } else {
        setA({ entry: candidate, visible: true });
        setB((curr) => (curr ? { ...curr, visible: false } : null));
        slot.current = 'a';
      }
    }, 40);
  }, [pool, a, b]);

  const current = slot.current === 'a' ? a.entry.id : (b?.entry.id ?? a.entry.id);
  const tone = LIGHT_BACKGROUNDS.has(current) ? 'light' : 'dark';

  useEffect(() => {
    document.documentElement.dataset.bgCurrent = current;
    document.documentElement.dataset.bgTone = tone;
  }, [current, tone]);

  // FPS watchdog: if the active heavy background sustains <28fps for ~2.5s, fall
  // back to a light background. Browsers throttle rAF when the tab is hidden, so
  // we skip sampling while document.hidden is true.
  useEffect(() => {
    if (reduced) return;
    const currentEntry = ENTRIES.find((e) => e.id === current);
    if (!currentEntry || currentEntry.weight !== 'heavy') return;

    let raf = 0;
    let lastT = performance.now();
    let slowFrames = 0;
    let cancelled = false;

    const step = (t: number) => {
      if (cancelled) return;
      if (!document.hidden) {
        const dt = t - lastT;
        if (dt > 36) slowFrames++;
        else slowFrames = Math.max(0, slowFrames - 1);
        if (slowFrames > 60) {
          const lightPool = ENTRIES.filter((e) => e.weight === 'light' && e.id !== current);
          if (lightPool.length > 0) {
            const fallback = lightPool[Math.floor(Math.random() * lightPool.length)];
            const cs = slot.current;
            if (cs === 'a') setB({ entry: fallback, visible: false });
            else setA({ entry: fallback, visible: false });
            window.setTimeout(() => {
              if (cs === 'a') {
                setB({ entry: fallback, visible: true });
                setA((curr) => ({ ...curr, visible: false }));
                slot.current = 'b';
              } else {
                setA({ entry: fallback, visible: true });
                setB((curr) => (curr ? { ...curr, visible: false } : null));
                slot.current = 'a';
              }
            }, 40);
            cancelled = true;
            return;
          }
        }
      }
      lastT = t;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [current, reduced]);

  const ctx = useMemo<BackgroundContextValue>(
    () => ({ current, next, available: pool.map((p) => p.id) }),
    [current, next, pool]
  );

  return (
    <BackgroundContext.Provider value={ctx}>
      {/* base color so there is never an unstyled flash */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20"
        style={{ background: 'radial-gradient(circle at center, rgb(var(--color-surface)) 0%, rgb(var(--color-bg)) 100%)' }}
      />
      <BgLayer state={a} fadeMs={FADE_MS} />
      <BgLayer state={b} fadeMs={FADE_MS} />
      {children}
    </BackgroundContext.Provider>
  );
};

const BgLayer = ({ state, fadeMs }: { state: LayerState | null; fadeMs: number }) => {
  const [hidden, setHidden] = useState<boolean>(typeof document !== 'undefined' && document.hidden);
  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);
  if (!state) return null;
  // While the tab is hidden, drop the layer entirely so its rAF / WebGL loop stops
  // and no GPU cycles are spent on an offscreen canvas.
  if (hidden) return null;
  return (
    <div
      aria-hidden
      data-bg-id={state.entry.id}
      data-bg-visible={state.visible ? '1' : '0'}
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        opacity: state.visible ? 1 : 0,
        filter: state.visible ? 'blur(0px)' : 'blur(20px)',
        transition: `opacity ${fadeMs}ms ease, filter ${fadeMs}ms ease`
      }}
    >
      <Suspense fallback={null}>{state.entry.render()}</Suspense>
    </div>
  );
};

export const useBackground = (): BackgroundContextValue => {
  const v = useContext(BackgroundContext);
  if (!v) throw new Error('useBackground must be used inside <BackgroundProvider>');
  return v;
};
