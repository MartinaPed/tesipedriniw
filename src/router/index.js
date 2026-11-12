// ─────────────────────────────────────────────────────────────
// IL ROUTER: decide quale pagina mostrare in base all'indirizzo
//   /              → la homepage
//   /numero/00     → la pagina del Matto
//   /numero/01     → la pagina del Bagatto
//   /numero/00/mazzo-colleoni → un approfondimento del Matto
//   /glossario     → il glossario delle parole inventate
// ─────────────────────────────────────────────────────────────
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NumeroView from '../views/NumeroView.vue'
import ApprofondimentoView from '../views/ApprofondimentoView.vue'
import GlossarioView from '../views/GlossarioView.vue'

const routes = [
  { path: '/', component: HomeView },

  // ":id" è una parte che cambia: può essere 00, 01, 02...
  { path: '/numero/:id', component: NumeroView },

  // la pagina di un approfondimento, es. /numero/00/mazzo-colleoni
  { path: '/numero/:id/:approfondimento', component: ApprofondimentoView },

  // il glossario con tutte le parole inventate
  // (/glossario?parola=zerranza apre la pagina già sulla parola zerranza)
  { path: '/glossario', component: GlossarioView }
]

export default createRouter({
  // "hash" aggiunge un # all'indirizzo (es. /#/numero/00):
  // così il sito funziona anche quando lo pubblichiamo online su GitHub
  history: createWebHashHistory(),
  routes,
  // dove si trova la pagina quando la apri:
  // - se l'indirizzo chiede una parola (?parola=zerranza), scorriamo fino alla sua voce
  //   (la voce ha id="zerranza", e "#zerranza" vuol dire "l'elemento con quell'id")
  // - altrimenti si riparte dall'alto
  scrollBehavior: (to) => {
    if (to.query.parola) return { el: '#' + to.query.parola }
    return { top: 0 }
  }
})
