<!--
  APPROFONDIMENTO: LA LETTURA DELLE CARTE
  Come funziona:
    1. in alto scegli la stesa: carta singola o tre carte
    2. sotto c'è tutto il mazzo, coperto: clicchi le carte che vuoi
       (una per la carta singola, tre per le tre carte)
    3. le carte scelte escono dal mazzo e vanno al loro posto;
       quando ci sono tutte, si girano una dopo l'altra
    4. "Nuova lettura" rimescola il mazzo: le carte cambiano posizione
  Il mazzo è aperto a ventaglio: ogni carta è ruotata di qualche grado in più
  della precedente (vedi --i nello stile). Quando il mazzo si rimescola,
  ogni carta ruota fino al suo nuovo posto nel ventaglio.
-->
<script setup>
import { ref, computed, nextTick } from 'vue'
import { tarocchi, stese, PROBABILITA_ROVESCIATA } from '../../data/tarocchi.js'
import { publicAssetUrl } from '../../utils/publicAssetUrl.js'

// mescola un mazzo: algoritmo di Fisher-Yates (scambia ogni carta con una a caso)
function mescola(carte) {
  const mazzo = [...carte]                     // una copia, per non rovinare l'originale
  for (let i = mazzo.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[mazzo[i], mazzo[j]] = [mazzo[j], mazzo[i]]
  }
  return mazzo
}

// il mazzo sul tavolo: già mescolato appena si apre la pagina
const mazzo = ref(mescola(tarocchi))

// la stesa scelta (null = non ancora scelta)
const stesaScelta = ref(null)

// le carte pescate: { carta, posizione, rovesciata, scoperta }
const pescate = ref([])

// quante carte servono ancora
const mancano = computed(() =>
  stesaScelta.value ? stesaScelta.value.posizioni.length - pescate.value.length : 0
)

// la lettura è completa quando tutte le carte sono state pescate e girate
const completa = computed(() =>
  stesaScelta.value && mancano.value === 0 && pescate.value.every((p) => p.scoperta)
)

// una carta del mazzo è già stata pescata?
function giaPescata(carta) {
  return pescate.value.some((p) => p.carta.id === carta.id)
}

// il testo che guida chi gioca
const guida = computed(() => {
  if (!stesaScelta.value) return 'Prima scegli la stesa, poi pesca le carte.'
  if (mancano.value === 0) return completa.value ? '' : 'Le carte si stanno girando…'
  if (mancano.value === 1 && pescate.value.length === 0) return 'Scegli una carta dal mazzo.'
  return mancano.value === 1 ? 'Scegli l’ultima carta.' : `Scegli ${mancano.value} carte dal mazzo.`
})

// scegliere (o cambiare) stesa fa ricominciare la lettura
function scegliStesa(stesa) {
  stesaScelta.value = stesa
  nuovaLettura()
}

// clic su una carta del mazzo
function pesca(carta) {
  if (!stesaScelta.value || mancano.value === 0 || giaPescata(carta)) return

  const posizione = stesaScelta.value.posizioni[pescate.value.length]
  pescate.value.push({
    carta,
    posizione: posizione.nome,
    rovesciata: Math.random() < PROBABILITA_ROVESCIATA,
    scoperta: false
  })

  // se era l'ultima carta che serviva, si girano tutte, una ogni 0,6 secondi
  if (mancano.value === 0) {
    pescate.value.forEach((p, i) => {
      setTimeout(() => { p.scoperta = true }, 700 + i * 600)
    })
    nextTick(() => {
      tavolo.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
}

// nuova lettura: via le carte pescate e il mazzo si rimescola
function nuovaLettura() {
  pescate.value = []
  mazzo.value = mescola(tarocchi)
}

const tavolo = ref(null)
</script>

<template>
  <div class="lettura">

    <!-- 1. LA SCELTA DELLA STESA -->
    <section class="sezione">
      <h2 class="titolo"><span class="indice">01</span> Scegli la stesa</h2>
      <p class="guida">Pensa alla tua domanda, poi scegli la stesa</p>

      <div class="stese" role="group" aria-label="Scegli la stesa">
        <button
          v-for="stesa in stese"
          :key="stesa.id"
          class="stesa"
          :class="{ attiva: stesaScelta?.id === stesa.id }"
          :aria-pressed="stesaScelta?.id === stesa.id"
          @click="scegliStesa(stesa)"
        >
          <!-- lo schema: un rettangolino per ogni carta della stesa -->
          <span class="schema">
            <span v-for="(p, i) in stesa.posizioni" :key="i" class="mini-carta"></span>
          </span>
          <span class="stesa-nome">{{ stesa.nome }}</span>
          <span class="stesa-sotto">{{ stesa.sottotitolo }}</span>
          <span class="stesa-descrizione">{{ stesa.descrizione }}</span>
          <span v-if="stesaScelta?.id === stesa.id" class="scelta">✓ scelta</span>
        </button>
      </div>
    </section>

    <!-- 2. IL MAZZO A VENTAGLIO, tutto coperto -->
    <section class="sezione">
      <h2 class="titolo"><span class="indice">02</span> Pesca dal mazzo</h2>
      <p class="guida" aria-live="polite">{{ guida || 'Ecco la tua lettura.' }}</p>

      <!-- --i = la posizione della carta nel ventaglio (0, 1, 2...):
           lo stile la usa per calcolare quanto ruotarla -->
      <div class="mazzo" :class="{ attivo: stesaScelta && mancano > 0 }" :style="{ '--n': mazzo.length }">
        <button
          v-for="(carta, i) in mazzo"
          :key="carta.id"
          class="dorso carta-mazzo"
          :class="{ pescata: giaPescata(carta) }"
          :style="{ '--i': i }"
          :disabled="!stesaScelta || mancano === 0 || giaPescata(carta)"
          :aria-label="'Carta coperta numero ' + (i + 1)"
          @click="pesca(carta)"
        ></button>
      </div>
    </section>

    <!-- 3. IL TAVOLO: le carte pescate, al loro posto (compare dopo aver scelto la stesa) -->
    <section v-if="stesaScelta" ref="tavolo" class="sezione">
      <h2 class="titolo"><span class="indice">03</span> La lettura</h2>

      <!-- con la carta singola la carta è più grande (classe "singola") -->
      <div class="tavolo" :class="{ singola: stesaScelta.id === 'singola' }">
        <div v-for="(posizione, i) in stesaScelta.posizioni" :key="posizione.nome" class="posto">
          <p class="nome-posizione">{{ posizione.nome }}</p>

          <!-- posto ancora vuoto -->
          <div v-if="!pescate[i]" class="vuoto"></div>

          <!-- la carta pescata: davanti il dorso, dietro la figura -->
          <div v-else class="carta" :class="{ scoperta: pescate[i].scoperta }">
            <span class="faccia dorso"></span>
            <span class="faccia fronte">
              <!-- se esce rovesciata, la figura è capovolta, come sul tavolo -->
              <span class="figura" :class="{ capovolta: pescate[i].rovesciata }">
                <img v-if="pescate[i].carta.immagine" :src="publicAssetUrl(pescate[i].carta.immagine)" :alt="pescate[i].carta.nome" />
                <template v-else>
                  <span class="romano">{{ pescate[i].carta.romano }}</span>
                  <span class="nome-carta">{{ pescate[i].carta.nome }}</span>
                </template>
              </span>
            </span>
          </div>

          <!-- il significato compare quando la carta si è girata -->
          <Transition name="appare">
            <div v-if="pescate[i]?.scoperta" class="significato">
              <p class="titolo-carta">{{ pescate[i].carta.nome }}</p>
              <span v-if="pescate[i].rovesciata" class="rovesciata">rovesciata</span>
              <p>{{ pescate[i].rovesciata ? pescate[i].carta.rovesciato : pescate[i].carta.dritto }}</p>
            </div>
          </Transition>
        </div>
      </div>

      <button v-if="completa" class="tasto" @click="nuovaLettura">
        <span class="giro">↻</span> Nuova lettura
      </button>
    </section>
  </div>
</template>

<style scoped>
/* ── SEZIONI ── */
.sezione {
  padding: 110px 100px;
}

.sezione + .sezione {
  border-top: 1px solid currentColor;
}

/* il titolo di ogni passaggio: "01 Scegli la stesa" */
.titolo {
  font-family: var(--titoli);
  font-weight: 300;
  font-size: clamp(40px, 4.5vw, 56px);
  line-height: 1;
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 28px;
}

.indice {
  font-family: var(--testi);
  font-weight: 200;
  font-size: 1.15em;
}

.guida {
  min-height: 1.5em;           /* lo spazio resta anche quando il testo cambia: niente salti */
  margin: 40px 0 0;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 3px;
}

/* ── 1. LE DUE STESE ── */
.stese {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 40px;
}

.stesa {
  font: inherit;
  color: inherit;
  text-align: left;
  background: transparent;
  border: 1px solid color-mix(in srgb, currentColor 50%, transparent);
  border-radius: 4px;
  padding: 40px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  transition: border-color 0.2s;
}

.stesa:hover {
  border-color: currentColor;
}

/* la stesa scelta: fondo color carta e testo del colore della pagina */
.stesa.attiva {
  background: var(--carta);
  border-color: var(--carta);
  color: var(--sfondo);
}

.schema {
  display: flex;
  gap: 8px;
}

.mini-carta {
  width: 28px;
  aspect-ratio: 7 / 12;
  border: 1px solid currentColor;
  border-radius: 3px;
}

.stesa-nome {
  font-family: var(--titoli);
  font-weight: 300;
  font-size: clamp(36px, 3.6vw, 52px);
  line-height: 1;
}

.stesa-sotto {
  font-family: var(--titoli);
  font-style: italic;
  font-size: 22px;
  margin-top: -8px;
}

.stesa-descrizione {
  font-size: 16px;
  line-height: 1.6;
  max-width: 500px;
}

.scelta {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* ── 2. IL MAZZO A VENTAGLIO ──
   Tutte le carte partono dallo stesso punto, al centro.
   Ognuna ruota attorno a un punto lontano, sotto il mazzo (transform-origin):
   così, ruotandole di gradi diversi, si dispongono su un arco. */
.mazzo {
  --apertura: 60deg;            /* quanto è aperto il ventaglio, dalla prima all'ultima carta */
  --raggio: 900px;              /* quanto è lontano il centro dell'arco: più è grande, più l'arco è piatto */
  position: relative;
  height: 380px;
  margin-top: 40px;
  overflow-x: clip;             /* se una carta esce dai lati, non allarga la pagina */
}

.carta-mazzo {
  position: absolute;
  top: 40px;
  left: calc(50% - 42px);       /* il centro della carta sta al centro del mazzo */
  width: 84px;
  aspect-ratio: 7 / 12;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: default;
  transform-origin: 50% var(--raggio);
  /* la prima carta ruota di -30°, l'ultima di +30°, le altre in mezzo */
  rotate: calc(var(--apertura) * (var(--i) / (var(--n) - 1) - 0.5));
  transition: rotate 0.7s ease, translate 0.25s ease, opacity 0.3s;
}

/* quando si può pescare, le carte si alzano al passaggio del mouse */
.mazzo.attivo .carta-mazzo:not(:disabled) {
  cursor: pointer;
}
.mazzo.attivo .carta-mazzo:not(:disabled):hover,
.mazzo.attivo .carta-mazzo:not(:disabled):focus-visible {
  translate: 0 -24px;
}

/* la carta pescata "esce" dal mazzo: resta il suo posto vuoto */
.carta-mazzo.pescata {
  opacity: 0;
  translate: 0 -60px;
}

/* il mazzo spento finché non scegli la stesa */
.mazzo:not(.attivo) .carta-mazzo:not(.pescata) {
  opacity: 0.6;
}

/* ── IL DORSO DELLE CARTE: colore scuro della pagina, cornice sottile, stellina ── */
.dorso {
  border: 1px solid color-mix(in srgb, currentColor 80%, transparent);
  border-radius: 6px;
  background: var(--sfumatura, #222);
  /* la cornice interna, come sul dorso delle carte vere */
  box-shadow:
    inset 0 0 0 5px var(--sfumatura, #222),
    inset 0 0 0 6px color-mix(in srgb, currentColor 45%, transparent),
    0 14px 30px -8px rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* la stellina al centro del dorso */
.dorso::after {
  content: '✦';
  font-size: 20px;
}

/* ── 3. IL TAVOLO ── */
.tavolo {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;     /* le carte al centro dello schermo */
  text-align: center;
  gap: 64px;
  margin-top: 64px;
}

.posto {
  width: 260px;
}

/* CARTA SINGOLA: la carta è un po' più grande */
.tavolo.singola .posto {
  width: 320px;
}

.nome-posizione {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0 0 16px;
}

.vuoto {
  aspect-ratio: 7 / 12;
  border: 1px dashed currentColor;
  border-radius: 12px;
  opacity: 0.6;
}

/* la carta che si gira: due facce, una dietro l'altra */
.carta {
  position: relative;
  aspect-ratio: 7 / 12;
  transform-style: preserve-3d;          /* le facce restano in 3D */
  transition: transform 0.7s ease;
  /* arriva sul tavolo dall'alto. "backwards" (e non "both"): finita l'animazione,
     la carta torna libera di girarsi con la classe .scoperta */
  animation: arriva 0.45s ease-out backwards;
}

.carta.scoperta {
  transform: rotateY(180deg);            /* si gira e mostra la figura */
}

@keyframes arriva {
  from { opacity: 0; transform: translateY(-60px); }
  to   { opacity: 1; transform: translateY(0); }
}

.faccia {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;           /* la faccia girata di spalle non si vede */
  border-radius: 12px;
}

.dorso.faccia::after {
  font-size: 40px;
}

.fronte {
  transform: rotateY(180deg);            /* la figura parte già girata, dietro il dorso */
  border: 1px solid currentColor;
  display: flex;
  overflow: hidden;
  box-shadow: 0 18px 40px -8px rgba(0, 0, 0, 0.45);
}

.figura {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  text-align: center;
}

/* quando c'è la tua carta disegnata, niente bordo: la carta ha già il suo */
.fronte:has(img) {
  border: 0;
}

.figura img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.capovolta {
  transform: rotate(180deg);             /* carta uscita rovesciata */
}

.romano {
  font-family: var(--titoli);
  font-weight: 300;
  font-size: 56px;
  line-height: 1;
}

.nome-carta {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.significato {
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.6;
}

.titolo-carta {
  font-family: var(--titoli);
  font-weight: 300;
  font-style: italic;
  font-size: 40px;
  line-height: 1;
  margin: 0 0 4px;
}

.rovesciata {
  display: inline-block;
  margin-top: 8px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 1px solid currentColor;
  border-radius: 20px;
  padding: 2px 10px;
}

/* il significato compare dolcemente */
.appare-enter-active {
  transition: opacity 0.6s;
}
.appare-enter-from {
  opacity: 0;
}

/* ── TASTO NUOVA LETTURA ── */
.tasto {
  display: block;              /* il tasto sta al centro, sotto le carte */
  margin: 80px auto 0;
  font-family: var(--titoli);
  font-weight: 300;
  font-style: italic;
  font-size: clamp(48px, 6vw, 88px);
  line-height: 1;
  padding: 0;
  background: transparent;
  color: inherit;
  border: none;
  cursor: pointer;
}

.tasto:hover {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 10px;
}

/* il simbolo ↻: Cormorant non ce l'ha, quindi usiamo DM Sans sottile */
.giro {
  font-family: var(--testi);
  font-weight: 200;
}

/* chi ha chiesto al computer di ridurre le animazioni non vede le carte muoversi */
@media (prefers-reduced-motion: reduce) {
  .carta,
  .carta-mazzo {
    transition: none;
    animation: none;
  }
}

/* ── SCHERMI PICCOLI ── */
@media (max-width: 900px) {
  .sezione {
    padding: 80px 24px;
  }
  .stese {
    grid-template-columns: 1fr;
  }
  .stesa {
    padding: 28px;
  }
  /* sul telefono il ventaglio è più piccolo e più aperto */
  .mazzo {
    --apertura: 70deg;
    --raggio: 280px;
    height: 210px;
  }
  .carta-mazzo {
    width: 48px;
    left: calc(50% - 24px);
    top: 24px;
  }
  .dorso::after {
    font-size: 12px;
  }
  .tavolo {
    gap: 24px;
  }
  .posto {
    width: calc(50% - 12px);
  }
  .tavolo.singola .posto {
    width: 70%;
  }
}
</style>
