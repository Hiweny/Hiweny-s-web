/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// replace with your own imports, see the usage snippet for details
import cardGLB from './card.glb';
import lanyard from './lanyard.png';
import cohenCard from './cohen-card.svg';
/**
 * Random anime-image APIs rotated onto the card surface.
 * Each one must send `access-control-allow-origin: *` on the FINAL image response,
 * otherwise the texture can't be read cross-origin. t.alcy.cc redirects to a CDN that
 * omits the header, so it's excluded here (kept only the two that pass).
 */
const CARD_IMAGES = [
  'https://moe.jitsu.top/api', // Jitsu · 二次元
  'https://www.loliapi.com/acg/pe/' // LoliAPI · 竖屏
];

/**
 * Load a cross-origin image as a THREE texture with `crossOrigin=anonymous` and
 * `referrerPolicy=no-referrer`. The no-referrer policy is important: some image CDNs
 * behave differently when they see a Referer, so sending none gives the best chance
 * of a CORS-clean image. Resolves `null` on network failure.
 */
const loadCardImage = (url: string): Promise<THREE.Texture | null> =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';
    img.onload = () => {
      const tex = new THREE.Texture(img);
      tex.flipY = false;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.generateMipmaps = false;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.anisotropy = 16;
      tex.needsUpdate = true;
      resolve(tex);
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // R3F's initial ResizeObserver measurement sometimes fires before Suspense / lazy
  // chunks have finalised the parent layout. Nudge it once after mount so the canvas
  // matches the parent. (Lanyard ships as 300x150 default without this.)
  useEffect(() => {
    const id = window.setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 30);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div
      className="relative z-0 w-full h-full flex justify-center items-center transform scale-100 origin-center"
      style={{ touchAction: 'none' }}
    >
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: !isMobile, powerPreference: 'high-performance' }}
        style={{ touchAction: 'none' }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }: BandProps) {
  // Using "any" for refs since the exact types depend on Rapier's internals
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: 'dynamic' as RigidBodyProps['type'],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };

  const { nodes, materials } = useGLTF(cardGLB) as any;
  const bandTexture = useTexture(lanyard);
  const cardTexture = useTexture(cohenCard);
  // Rotate the card texture through the random-image APIs every 12s.
  // On success we swap only `cardTexture.image` (reusing the same Texture object the
  // material references, so the scene keeps its configured sampling settings) and mark
  // `needsUpdate`; on failure we keep whatever is currently on the card.
  const nextCardImg = useRef(0);
  useEffect(() => {
    let cancelled = false;
    const loadNext = async () => {
      const idx = nextCardImg.current % CARD_IMAGES.length;
      nextCardImg.current += 1;
      const tex = await loadCardImage(`${CARD_IMAGES[idx]}?t=${Date.now()}`);
      if (cancelled || !tex) return; // keep the current texture on failure
      try {
        cardTexture.image = tex.image;
        cardTexture.needsUpdate = true;
      } catch {
        // CORS-tainted image: keep the previous texture
      }
    };
    const first = window.setTimeout(loadNext, 2500);
    const timer = window.setInterval(loadNext, 12000);
    return () => {
      cancelled = true;
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, [cardTexture]);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  bandTexture.wrapS = bandTexture.wrapT = THREE.RepeatWrapping;
  cardTexture.flipY = false;
  cardTexture.colorSpace = THREE.SRGBColorSpace;
  cardTexture.wrapS = cardTexture.wrapT = THREE.ClampToEdgeWrapping;
  cardTexture.generateMipmaps = false;
  cardTexture.minFilter = THREE.LinearFilter;
  cardTexture.magFilter = THREE.LinearFilter;
  cardTexture.anisotropy = 16;
  cardTexture.needsUpdate = true;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type={'fixed' as RigidBodyProps['type']} />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? ('kinematicPosition' as RigidBodyProps['type']) : ('dynamic' as RigidBodyProps['type'])}
        >
          <CuboidCollider args={[0.66, 1.125, 0.006]} />
          <group
            scale={[1.86, 2.25, 0.65]}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              try { e.target.releasePointerCapture?.(e.pointerId); } catch { /* touch: target may not own capture */ }
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.stopPropagation();
              try { e.target.setPointerCapture?.(e.pointerId); } catch { /* touch: target may not be capturable */ }
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardTexture}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.18}
                roughness={0.72}
                metalness={0.08}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={bandTexture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
