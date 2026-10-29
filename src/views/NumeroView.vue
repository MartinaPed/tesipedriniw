<!--
  PAGINA DEL NUMERO: si apre all'indirizzo /numero/00, /numero/01...
  Legge l'id dall'indirizzo, mostra il lato giusto
  e gestisce il "cambia lato" con la rotazione.
-->
<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { numeri } from '../data/numeri.js'
import { glossario } from '../data/glossario.js'
import LatoRivista from '../components/LatoRivista.vue'

const route = useRoute()

// il numero che corrisponde all'indirizzo (es. /numero/00 → Il Matto)
const numero = computed(() => numeri.find((n) => n.id === route.params.id))

// ref = una variabile "che si ricorda": quando cambia, la pagina si aggiorna
// su che lato siamo: 'A' o 'B'
// (se l'indirizzo finisce con ?lato=B, ad esempio tornando da un approfondimento, partiamo dal B)
const latoAttuale = ref(route.query.lato === 'B' ? 'B' : 'A')
const fase = ref('ferma')        // la rotazione: 'ferma', 'esce' o 'entra'

const lato = computed(() => numero.value.lati[latoAttuale.value])

// le parole del glossario di questo numero E di questo lato
// (&& vuol dire "e anche": devono essere vere tutte e due le condizioni)
const parole = computed(() =>
  glossario.filter((voce) => voce.numero === route.params.id && voce.lato === latoAttuale.value)
)

const DURATA = 400   // millisecondi di ogni metà della rotazione

function cambiaLato() {
  window.scrollTo({ top: 0 })    // torniamo in cima alla pagina
  fase.value = 'esce'            // 1. la pagina si gira fino a sparire di taglio

  setTimeout(() => {
    // 2. a metà rotazione, quando non si vede, cambiamo lato
    latoAttuale.value = latoAttuale.value === 'A' ? 'B' : 'A'
    fase.value = 'entra'         // 3. la pagina finisce di girare mostrando l'altro lato

    setTimeout(() => {
      fase.value = 'ferma'
    }, DURATA)
  }, DURATA)
}

// se passi da un numero all'altro, si riparte dal lato A
watch(() => route.params.id, () => {
  latoAttuale.value = 'A'
})
</script>

<template>
  <div class="scena">
    <div class="pagina" :class="fase">
      <LatoRivista
        :numero="numero"
        :lato="lato"
        :parole="parole"
        @cambia-lato="cambiaLato"
      />
    </div>
  </div>
</template>

<style scoped>
/* la "scena" dà la prospettiva 3D: senza, la rotazione sembrerebbe piatta */
.scena {
  perspective: 1500px;
  perspective-origin: 50% 50vh;
  background: #111;          /* il "tavolo" che si intravede mentre la rivista gira */
  overflow: hidden;
}

.pagina {
  transform-origin: 50% 50vh;   /* gira attorno al centro dello schermo */
}

/* prima metà: la pagina si capovolge dall'alto verso il basso fino a sparire */
.esce {
  animation: esce 400ms ease-in forwards;
}

/* seconda metà: l'altro lato arriva da sotto e torna dritto */
.entra {
  animation: entra 400ms ease-out forwards;
}

@keyframes esce {
  from { transform: rotateX(0deg); }
  to   { transform: rotateX(90deg); }
}

@keyframes entra {
  from { transform: rotateX(-90deg); }
  to   { transform: rotateX(0deg); }
}
</style>
