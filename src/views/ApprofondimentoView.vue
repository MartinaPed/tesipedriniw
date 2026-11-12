<!--
  PAGINA DELL'APPROFONDIMENTO: si apre all'indirizzo
  /numero/00/mazzo-colleoni, /numero/00/lettura-carte ...
  La cornice (colori, apertura, fascia, footer) è uguale per tutti gli approfondimenti;
  il CONTENUTO invece è un componente dedicato, diverso per ognuno.
-->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { numeri } from '../data/numeri.js'
import SitoFooter from '../components/SitoFooter.vue'
import MazzoColleoni from '../components/approfondimenti/MazzoColleoni.vue'
import LetturaCarte from '../components/approfondimenti/LetturaCarte.vue'
import CartaDaVicino from '../components/approfondimenti/CartaDaVicino.vue'

// quale componente usare per ogni approfondimento
// (quando ne crei uno nuovo, lo aggiungi qui)
// CartaDaVicino è generico: lo usano tutti gli articoli della rubrica "La carta"
const contenuti = {
  'volto-del-matto': CartaDaVicino,
  'mazzo-colleoni': MazzoColleoni,
  'lettura-carte': LetturaCarte
}

const route = useRoute()

const numero = computed(() => numeri.find((n) => n.id === route.params.id))

// cerchiamo in quale lato (A o B) si trova questo approfondimento
const chiaveLato = computed(() =>
  ['A', 'B'].find((l) =>
    numero.value.lati[l].approfondimenti.some((a) => a.id === route.params.approfondimento)
  )
)
const lato = computed(() => numero.value.lati[chiaveLato.value])
const approfondimento = computed(() =>
  lato.value.approfondimenti.find((a) => a.id === route.params.approfondimento)
)

// che numero ha questo approfondimento nel suo lato: 01, 02...
const indice = computed(() => lato.value.approfondimenti.indexOf(approfondimento.value) + 1)

// le frasi della fascia (ripetute finché sono almeno 8, come nella pagina del numero)
const frasiFascia = computed(() => {
  const frasi = approfondimento.value.fascia || [approfondimento.value.titolo]
  let lista = [...frasi]
  while (lista.length < 8) lista = lista.concat(frasi)
  return lista
})
</script>

<template>
  <div
    class="pagina"
    :style="{
      background: `linear-gradient(to bottom, ${lato.colore}, ${lato.sfumatura || lato.colore})`,
      color: lato.testo,
      '--sfondo': lato.colore,
      '--sfumatura': lato.sfumatura || lato.colore
    }"
  >
    <!-- 1. APERTURA -->
    <section class="apertura">
      <nav class="barra">
        <RouterLink to="/" class="logo">Arcanamente</RouterLink>
        <!-- torniamo alla pagina del numero, sul lato giusto -->
        <RouterLink :to="'/numero/' + numero.id + '?lato=' + chiaveLato" class="indietro">
          ← N°{{ numero.id }} · {{ lato.nome }}
        </RouterLink>
      </nav>

      <p class="etichetta">
        N°{{ numero.id }} · Lato {{ chiaveLato }} · Approfondimento 0{{ indice }}
      </p>
      <h1>{{ approfondimento.titolo }}</h1>

      <div class="sotto-titolo">
        <p class="sottotitolo">{{ approfondimento.sottotitolo }}</p>
        <p class="intro">{{ approfondimento.anteprima }}</p>
      </div>
    </section>

    <!-- 2. LA FASCIA CHE SCORRE (stili in style.css) -->
    <div class="fascia con-linee" aria-hidden="true">
      <div class="fascia-binario">
        <template v-for="copia in 2" :key="copia">
          <span v-for="(frase, i) in frasiFascia" :key="copia + '-' + i">{{ frase }} ✦</span>
        </template>
      </div>
    </div>

    <!-- 3. IL CONTENUTO: <component :is> mostra il componente giusto per questo approfondimento -->
    <component :is="contenuti[approfondimento.id]" />

    <SitoFooter />
  </div>
</template>

<style scoped>
.pagina {
  min-height: 100vh;
}

/* ── APERTURA ── */
.apertura {
  padding: 36px 40px 100px;
}

.barra {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 150px;
}

.barra a {
  color: inherit;
  text-decoration: none;
}

.barra a:hover {
  text-decoration: underline;
}

.logo {
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.etichetta {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0 0 0 60px;
}

h1 {
  font-family: var(--titoli);
  font-weight: 300;
  font-size: clamp(64px, 11.5vw, 168px);
  line-height: 0.92;
  letter-spacing: -0.01em;
  margin: 24px 0 0 52px;
  max-width: 1240px;
}

.sotto-titolo {
  display: flex;
  justify-content: space-between;   /* sottotitolo a sinistra, intro a destra */
  align-items: flex-start;
  gap: 40px;
  flex-wrap: wrap;
  margin: 28px 60px 0;
}

.sottotitolo {
  font-family: var(--titoli);
  font-style: italic;
  font-size: 32px;
  margin: 0;
}

.intro {
  max-width: 460px;
  font-size: 17px;
  line-height: 1.6;
  margin: 6px 0 0;
}

/* la fascia qui ha una riga sopra e una sotto, e scorre piano */
.con-linee {
  border-top: 1px solid currentColor;
  border-bottom: 1px solid currentColor;
}

.fascia-binario {
  animation-duration: 90s;
}

@media (max-width: 900px) {
  .apertura {
    padding: 28px 24px 64px;
  }
  .barra {
    margin-bottom: 80px;
  }
  .etichetta,
  h1,
  .sotto-titolo {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
