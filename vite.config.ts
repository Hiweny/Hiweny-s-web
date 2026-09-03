import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Hiweny-s-web/',
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'r3f': ['@react-three/fiber', '@react-three/drei', '@react-three/rapier', 'three', 'meshline'],
          'gsap': ['gsap', '@gsap/react'],
          'ogl': ['ogl'],
          'motion': ['motion']
        }
      }
    }
  }
});
