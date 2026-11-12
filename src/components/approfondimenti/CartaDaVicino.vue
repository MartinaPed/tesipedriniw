<!--
  LA CARTA DA VICINO (rubrica "La carta")
  Una carta grande con sopra delle stelline ✦.
  Clicchi una ✦ → la carta si ingrandisce su quel dettaglio e accanto compare il testo.
  Con le frecce passi al dettaglio dopo o prima; "Carta intera" torna alla vista normale.

  Questo componente è GENERICO: serve per il Matto, per il Bagatto e per tutti i numeri.
  I contenuti (immagine, posizione delle ✦, testi) stanno in src/data/dettagli.js.
-->
<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { carteDaVicino } from '../../data/dettagli.js'
import { publicAssetUrl } from '../../utils/publicAssetUrl.js'

// leggiamo l'id dell'articolo dall'indirizzo (es. /numero/00/volto-del-matto)
// e prendiamo la carta giusta da dettagli.js
const route = useRoute()
const carta = computed(() => carteDaVicino[route.params.approfondimento])
const dettagli = computed(() => carta.value.dettagli)

// il dettaglio aperto: un numero (0 = il primo) oppure null = carta intera
const attivo = ref(null)

// l'ultimo dettaglio visto: ci serve per "rimpicciolire" la carta
// partendo dal punto in cui eravamo, invece di saltare al centro
const ultimo = ref(0)

const dettaglio = computed(() => (attivo.value === null ? null : dettagli.value[attivo.value]))

// lo zoom: la carta si ingrandisce "attorno" al punto della stellina.
// transform-origin = il punto che resta fermo mentre la carta cresce
const stileZoom = computed(() => {
  const punto = dettagli.value[attivo.value ?? ultimo.value]
  return {
    transformOrigin: `${punto.x}% ${punto.y}%`,
    transform: attivo.value === null ? 'scale(1)' : `scale(${carta.value.zoom})`
  }
})

// il contatore: "02 / 06"
const contatore = computed(() =>
  String(attivo.value + 1).padStart(2, '0') + ' / ' + String(dettagli.value.length).padStart(2, '0')
)

// il testo diviso in tre pezzi: prima della parola, la parola, dopo la parola.
// Così possiamo mettere in evidenza la parola del glossario
const pezzi = computed(() => {
  const { testo, parola } = dettaglio.value
  const posizione = parola ? testo.indexOf(parola) : -1
  if (posizione === -1) return { prima: testo, parola: '', dopo: '' }
  return {
    prima: testo.slice(0, posizione),
    parola,
    dopo: testo.slice(posizione + parola.length)
  }
})

// "ref" ai pezzi della pagina su cui vogliamo spostare il cursore della tastiera
const titolo = ref(null)    // il titolo del dettaglio nel pannello
const stelle = ref([])      // le stelline sulla carta

// apre un dettaglio
async function apri(i) {
  attivo.value = i
  ultimo.value = i
  // aspettiamo che la pagina si aggiorni, poi portiamo la tastiera sul titolo:
  // così chi usa un lettore di schermo sente subito il dettaglio
  await nextTick()
  titolo.value?.focus()
}

// torna alla carta intera
async function chiudi() {
  attivo.value = null
  // riportiamo la tastiera sulla stellina da cui eravamo partiti
  await nextTick()
  stelle.value[ultimo.value]?.focus()
}

// frecce: dettaglio successivo / precedente (alla fine ricomincia dall'inizio)
function successivo() {
  apri((attivo.value + 1) % dettagli.value.length)
}
function precedente() {
  apri((attivo.value - 1 + dettagli.value.length) % dettagli.value.length)
}

// tastiera: frecce ← → cambiano dettaglio, Esc torna alla carta intera
// (solo quando un dettaglio è aperto)
function tasto(e) {
  if (attivo.value === null) return
  if (e.key === 'Escape') chiudi()
  if (e.key === 'ArrowRight') successivo()
  if (e.key === 'ArrowLeft') precedente()
}
onMounted(() => window.addEventListener('keydown', tasto))
onUnmounted(() => window.removeEventListener('keydown', tasto))
</script>

<template>
  <section class="carta-da-vicino" :class="{ ingrandita: attivo !== null }">
    <!-- LA CARTA: la "cornice" taglia tutto quello che esce quando la carta si ingrandisce -->
    <div class="cornice">
      <div class="zoom" :style="stileZoom">
        <img :src="publicAssetUrl(carta.immagine)" :alt="carta.alt" class="immagine" />

        <!-- le stelline: ognuna è posizionata con x e y in percentuale -->
        <button
          v-for="(d, i) in dettagli"
          :key="d.titolo"
          ref="stelle"
          class="stella"
          :style="{ left: d.x + '%', top: d.y + '%' }"
          :aria-label="'Guarda da vicino: ' + d.titolo"
          :tabindex="attivo === null ? 0 : -1"
          @click="apri(i)"
        >
          ✦
        </button>
      </div>
    </div>

    <!-- IL PANNELLO: accanto alla carta (sul telefono sotto) -->
    <div class="pannello">
      <!-- carta intera: un invito e l'elenco dei dettagli -->
      <template v-if="attivo === null">
        <p class="etichetta">La carta da vicino</p>
        <p class="invito">Clicca una ✦ per guardare la carta da vicino.</p>
        <ol class="elenco">
          <li v-for="(d, i) in dettagli" :key="d.titolo">
            <button @click="apri(i)">{{ d.titolo }}</button>
          </li>
        </ol>
      </template>

      <!-- un dettaglio aperto -->
      <template v-else>
        <p class="etichetta">{{ contatore }}</p>
        <!-- tabindex="-1": il titolo può ricevere il cursore della tastiera (lo usiamo in apri) -->
        <h2 ref="titolo" tabindex="-1">{{ dettaglio.titolo }}</h2>
        <p class="testo">
          <!-- la parola del glossario è un link: apre il glossario già su quella parola -->
          {{ pezzi.prima }}<RouterLink
            v-if="pezzi.parola"
            :to="{ path: '/glossario', query: { parola: pezzi.parola } }"
            class="parola"
          >{{ pezzi.parola }}</RouterLink>{{ pezzi.dopo }}
        </p>

        <div class="comandi">
          <button @click="precedente" aria-label="Dettaglio precedente">←</button>
          <button @click="chiudi">Carta intera</button>
          <button @click="successivo" aria-label="Dettaglio successivo">→</button>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
/* carta a sinistra, pannello a destra */
.carta-da-vicino {
  display: grid;
  grid-template-columns: minmax(0, 460px) minmax(0, 520px);
  justify-content: center;
  align-items: center;
  gap: 96px;
  padding: 120px 100px;
}

/* ── LA CARTA ── */
.cornice {
  overflow: hidden;         /* quando la carta si ingrandisce, non esce dalla cornice */
  border-radius: 14px;      /* gli stessi angoli arrotondati della carta */
  box-shadow: 0 18px 40px -8px rgba(0, 0, 0, 0.45);
}

.zoom {
  position: relative;       /* le stelline si posizionano rispetto a questo riquadro */
  transition: transform 0.7s ease, transform-origin 0.7s ease;
}

.immagine {
  display: block;
  width: 100%;
}

/* la stellina: un bottone rotondo, scuro, con la ✦ chiara */
.stella {
  position: absolute;
  translate: -50% -50%;     /* il centro della stellina cade esattamente su x, y */
  width: 44px;              /* 44px: abbastanza grande da toccare col dito */
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--carta);
  background: rgba(28, 26, 23, 0.7);
  color: var(--carta);
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  transition: scale 0.2s ease, opacity 0.3s ease;
}

.stella:hover {
  scale: 1.15;
}

/* quando la carta è ingrandita le stelline spariscono (sarebbero enormi) */
.ingrandita .stella {
  opacity: 0;
  pointer-events: none;     /* e non si possono cliccare */
}

/* ── IL PANNELLO ── */
.pannello {
  min-height: 320px;        /* così la pagina non "salta" quando cambia il testo */
}

.etichetta {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0 0 24px;
}

.invito {
  font-family: var(--titoli);
  font-style: italic;
  font-size: 32px;
  line-height: 1.2;
  margin: 0 0 32px;
}

h2 {
  font-family: var(--titoli);
  font-weight: 300;
  font-size: clamp(44px, 5vw, 72px);
  line-height: 1;
  margin: 0 0 28px;
}

h2:focus {
  outline: none;            /* il titolo riceve il cursore, ma senza contorno */
}

.testo {
  font-size: 17px;
  line-height: 1.65;
  margin: 0;
}

/* la parola del glossario: corsivo, sottolineata, porta al glossario */
.parola {
  color: inherit;                   /* il link non diventa blu */
  font-family: var(--titoli);
  font-style: italic;
  font-weight: 500;
  font-size: 1.2em;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
}

.parola:hover {
  text-decoration-thickness: 2px;
}

/* tutti i bottoni del pannello: testo in corsivo, senza sfondo */
.pannello button {
  background: none;
  border: none;
  color: inherit;
  font-family: var(--titoli);
  font-style: italic;
  font-size: 26px;
  cursor: pointer;
  padding: 0;
}

.pannello button:hover {
  text-decoration: underline;
}

/* l'elenco dei dettagli, numerato da solo */
.elenco {
  margin: 0;
  padding-left: 1.5em;
  line-height: 1.6;
}

.comandi {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 48px;
}

/* ── SCHERMI PICCOLI: il testo va sotto la carta ── */
@media (max-width: 900px) {
  .carta-da-vicino {
    grid-template-columns: minmax(0, 460px);
    gap: 40px;
    padding: 80px 24px;
  }
  .pannello {
    min-height: 0;
  }
}

/* chi ha chiesto "meno animazioni": niente zoom animato, solo il cambio */
@media (prefers-reduced-motion: reduce) {
  .zoom,
  .stella {
    transition: none;
  }
}
</style>
