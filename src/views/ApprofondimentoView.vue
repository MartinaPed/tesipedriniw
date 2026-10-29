<!--
  PAGINA DELL'APPROFONDIMENTO: si apre all'indirizzo
  /numero/00/mazzo-colleoni, /numero/00/lettura-carte ...
  La cornice (colori, titolo, footer) è uguale per tutti gli approfondimenti;
  il CONTENUTO invece è un componente dedicato, diverso per ognuno.
-->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { numeri } from '../data/numeri.js'
import SitoFooter from '../components/SitoFooter.vue'
import MazzoColleoni from '../components/approfondimenti/MazzoColleoni.vue'
import LetturaCarte from '../components/approfondimenti/LetturaCarte.vue'

// quale componente usare per ogni approfondimento
// (quando ne crei uno nuovo, lo aggiungi qui)
const contenuti = {
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
</script>

<template>
  <div
    class="pagina"
    :style="{
      background: `linear-gradient(to bottom, ${lato.colore}, ${lato.sfumatura || lato.colore})`,
      color: lato.testo,
      '--sfondo': lato.colore
    }"
  >
    <div class="contenuto">
      <!-- torniamo alla pagina del numero, sul lato giusto -->
      <RouterLink :to="'/numero/' + numero.id + '?lato=' + chiaveLato" class="indietro">
        ← Torna al N°{{ numero.id }} · {{ lato.nome }}
      </RouterLink>

      <p class="etichetta">N°{{ numero.id }} · Approfondimento</p>
      <h1>{{ approfondimento.titolo }}</h1>
      <p class="sottotitolo">{{ approfondimento.sottotitolo }}</p>

      <!-- <component :is> mostra il componente giusto per questo approfondimento -->
      <component :is="contenuti[approfondimento.id]" />
    </div>

    <SitoFooter />
  </div>
</template>

<style scoped>
.pagina {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.contenuto {
  flex: 1;
  padding: 40px;
}

.indietro {
  color: inherit;
  text-decoration: none;
  font-size: 14px;
}

.etichetta {
  margin-top: 64px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 3px;
}

h1 {
  font-size: clamp(40px, 6vw, 80px);
  margin: 8px 0;
}

.sottotitolo {
  font-size: 20px;
  font-style: italic;
  margin-bottom: 64px;
}
</style>
