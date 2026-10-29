// ─────────────────────────────────────────────────────────────
// IL ROUTER: decide quale pagina mostrare in base all'indirizzo
//   /              → la homepage
//   /numero/00     → la pagina del Matto
//   /numero/01     → la pagina del Bagatto
//   /numero/00/mazzo-colleoni → un approfondimento del Matto
// ─────────────────────────────────────────────────────────────
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NumeroView from '../views/NumeroView.vue'
import ApprofondimentoView from '../views/ApprofondimentoView.vue'

const routes = [
  { path: '/', component: HomeView },

  // ":id" è una parte che cambia: può essere 00, 01, 02...
  { path: '/numero/:id', component: NumeroView },

  // la pagina di un approfondimento, es. /numero/00/mazzo-colleoni
  { path: '/numero/:id/:approfondimento', component: ApprofondimentoView }
]

export default createRouter({
  // "hash" aggiunge un # all'indirizzo (es. /#/numero/00):
  // così il sito funziona anche quando lo pubblichiamo online su GitHub
  history: createWebHashHistory(),
  routes,
  // quando cambi pagina riparti dall'alto
  scrollBehavior: () => ({ top: 0 })
})
