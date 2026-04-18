import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  base: '/projets/TFE/',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        selection: resolve(__dirname, 'src/selection.html'),
        chassis: resolve(__dirname, 'src/chassis.html'),
        diagnostiques: resolve(__dirname, 'src/diagnostiques.html'),
        entretien: resolve(__dirname, 'src/entretien.html'),
        friens: resolve(__dirname, 'src/friens.html'),
        moteur: resolve(__dirname, 'src/moteur.html'),
        pageParties: resolve(__dirname, 'src/page-parties.html'),
        peinture: resolve(__dirname, 'src/peinture.html'),
        roues: resolve(__dirname, 'src/roues.html'),
        suspension: resolve(__dirname, 'src/suspension.html'),
        temoins: resolve(__dirname, 'src/temoins.html')
      }
    }
  },
  server: {
    open: true
  }
});
