<!--
  APPROFONDIMENTO: LA LETTURA DELLE CARTE
  Come funziona:
    1. in alto scegli la stesa: carta singola o tre carte
    2. sotto c'è tutto il mazzo, coperto: clicchi le carte che vuoi
       (una per la carta singola, tre per le tre carte)
    3. le carte scelte escono dal mazzo e vanno al loro posto;
       quando ci sono tutte, si girano una dopo l'altra
    4. "Nuova lettura" rimescola il mazzo: le carte cambiano posizione
-->
<script setup>
import { ref, computed, nextTick } from 'vue'
import { tarocchi, stese, PROBABILITA_ROVESCIATA } from '../../data/tarocchi.js'

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
  if (!stesaScelta.value) return 'Pensa alla tua domanda, poi scegli la stesa.'
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
    <div class="stese" role="group" aria-label="Scegli la stesa">
      <button
        v-for="stesa in stese"
        :key="stesa.id"
        class="stesa"
        :class="{ attiva: stesaScelta?.id === stesa.id }"
        :aria-pressed="stesaScelta?.id === stesa.id"
        @click="scegliStesa(stesa)"
      >
        <span class="schema">
          <span v-for="(p, i) in stesa.posizioni" :key="i" class="mini-carta"></span>
        </span>
        <span class="stesa-nome">{{ stesa.nome }}</span>
        <span class="stesa-sotto">{{ stesa.sottotitolo }}</span>
      </button>
    </div>

    <p v-if="stesaScelta" class="descrizione">{{ stesaScelta.descrizione }}</p>
    <p class="guida" aria-live="polite">{{ guida }}</p>

    <!-- 2. IL MAZZO, tutto coperto.
         <TransitionGroup> fa scivolare le carte nella nuova posizione quando il mazzo si rimescola -->
    <TransitionGroup tag="div" name="mescola" class="mazzo" :class="{ attivo: stesaScelta && mancano > 0 }">
      <button
        v-for="(carta, i) in mazzo"
        :key="carta.id"
        class="dorso carta-mazzo"
        :class="{ pescata: giaPescata(carta) }"
        :disabled="!stesaScelta || mancano === 0 || giaPescata(carta)"
        :aria-label="'Carta coperta numero ' + (i + 1)"
        @click="pesca(carta)"
      ></button>
    </TransitionGroup>

    <!-- 3. IL TAVOLO: le carte pescate, al loro posto -->
    <!-- il tavolo sta al centro; con la carta singola la carta è più grande (classe "singola") -->
    <div v-if="stesaScelta" ref="tavolo" class="tavolo" :class="{ singola: stesaScelta.id === 'singola' }">
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
              <img v-if="pescate[i].carta.immagine" :src="pescate[i].carta.immagine" :alt="pescate[i].carta.nome" />
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

    <button v-if="completa" class="tasto" @click="nuovaLettura">↻ Nuova lettura</button>
  </div>
</template>

<style scoped>
.lettura {
  padding-bottom: 64px;
}

/* ── 1. LE DUE STESE ── */
.stese {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.stesa {
  font: inherit;
  color: inherit;
  text-align: left;
  background: transparent;
  border: 1px solid currentColor;
  padding: 20px 24px;
  min-width: 240px;
  cursor: pointer;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  align-items: center;
}

.stesa:hover {
  border-width: 2px;
  padding: 19px 23px;          /* compensa il bordo più spesso: niente "salti" */
}

/* la stesa scelta: colori invertiti */
.stesa.attiva {
  background: currentColor;
}
.stesa.attiva > * {
  color: var(--sfondo, #000);
}
.stesa.attiva .mini-carta {
  border-color: var(--sfondo, #000);
}

.schema {
  grid-row: span 2;
  display: flex;
  gap: 4px;
}

.mini-carta {
  width: 18px;
  aspect-ratio: 7 / 12;
  border: 1px solid currentColor;
}

.stesa-nome {
  font-size: 22px;
  font-weight: bold;
}

.stesa-sotto {
  font-style: italic;
}

.descrizione {
  max-width: 640px;
  margin: 24px 0 0;
  line-height: 1.5;
}

.guida {
  min-height: 1.5em;           /* lo spazio resta anche quando il testo è vuoto: niente salti */
  margin: 24px 0 0;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 3px;
}

/* ── 2. IL MAZZO A VENTAGLIO ── */
.mazzo {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;     /* anche il mazzo al centro, in linea con le carte sotto */
  padding: 32px 0 32px 40px;   /* lo spazio a sinistra compensa la sovrapposizione */
  row-gap: 24px;
}

.carta-mazzo {
  width: 80px;
  aspect-ratio: 7 / 12;
  margin-left: -40px;           /* ogni carta copre metà della precedente */
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: default;
  transition: transform 0.25s, opacity 0.3s;
}

/* quando si può pescare, le carte si alzano al passaggio del mouse */
.mazzo.attivo .carta-mazzo:not(:disabled) {
  cursor: pointer;
}
.mazzo.attivo .carta-mazzo:not(:disabled):hover,
.mazzo.attivo .carta-mazzo:not(:disabled):focus-visible {
  transform: translateY(-18px);
}

/* la carta pescata "esce" dal mazzo: resta il suo posto vuoto */
.carta-mazzo.pescata {
  opacity: 0;
  transform: translateY(-40px);
}

/* il mazzo spento finché non scegli la stesa */
.mazzo:not(.attivo) .carta-mazzo:not(.pescata) {
  opacity: 0.6;
}

/* l'animazione del rimescolamento: le carte scivolano al nuovo posto */
.mescola-move {
  transition: transform 0.7s ease;
}

/* ── IL DORSO DELLE CARTE ── */
.dorso {
  border: 1px solid currentColor;
  background-color: var(--sfondo, #222);
  /* righe diagonali sottili dello stesso colore del testo */
  background-image: repeating-linear-gradient(
    45deg,
    transparent 0 7px,
    color-mix(in srgb, currentColor 30%, transparent) 7px 8px
  );
  /* una cornice interna, come sul dorso delle carte vere */
  box-shadow: inset 0 0 0 4px var(--sfondo, #222), inset 0 0 0 5px currentColor;
}

/* ── 3. IL TAVOLO ── */
.tavolo {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;     /* le carte al centro dello schermo */
  text-align: center;
  gap: 40px;
  margin-top: 16px;
  scroll-margin-top: 24px;
}

.posto {
  width: 200px;
}

/* CARTA SINGOLA: la carta è un po' più grande */
.tavolo.singola .posto {
  width: 260px;
}

.nome-posizione {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0 0 12px;
}

.vuoto {
  aspect-ratio: 7 / 12;
  border: 1px dashed currentColor;
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
}

.fronte {
  transform: rotateY(180deg);            /* la figura parte già girata, dietro il dorso */
  border: 1px solid currentColor;
  display: flex;
  overflow: hidden;
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
  font-size: 48px;
  line-height: 1;
}

.nome-carta {
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.significato {
  margin-top: 16px;
  line-height: 1.5;
}

.titolo-carta {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.rovesciata {
  display: inline-block;
  margin-top: 6px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 1px solid currentColor;
  padding: 1px 6px;
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
  margin: 40px auto 0;
  font: inherit;
  font-size: 20px;
  padding: 16px 40px;
  background: transparent;
  color: inherit;
  border: 2px solid currentColor;
  cursor: pointer;
}

/* passandoci sopra i colori si invertono */
.tasto:hover {
  background: currentColor;
  color: var(--sfondo, #000);
}

/* chi ha chiesto al computer di ridurre le animazioni non vede le carte muoversi */
@media (prefers-reduced-motion: reduce) {
  .carta,
  .mescola-move,
  .carta-mazzo {
    transition: none;
    animation: none;
  }
}

/* sul telefono: carte del mazzo più piccole, due carte per riga sul tavolo */
@media (max-width: 600px) {
  .mazzo {
    padding-left: 28px;
  }
  .carta-mazzo {
    width: 56px;
    margin-left: -28px;
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
  .stesa {
    min-width: 0;
    width: 100%;
  }
}
</style>
