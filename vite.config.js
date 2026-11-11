import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  // base = la "cartella" dell'indirizzo da cui il sito viene servito online.
  // '/' vuol dire la radice: https://martinaped.github.io/
  // (e non https://martinaped.github.io/tesipedriniw/).
  // Così tutti i percorsi che iniziano con / (es. '/carte/matto.png') funzionano.
  base: '/',
})
