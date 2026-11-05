<!--
  APPROFONDIMENTO: IL MAZZO COLLEONI
  Le carte del mazzo, sfalsate come sul tavolo. Cliccando una carta
  si apre la "scheda": la carta grande a sinistra, le info a destra.
  Questo componente è DEDICATO solo a questo approfondimento,
  perché il suo contenuto è unico (non si ripete in altri numeri).
-->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { carteColleoni } from '../../data/colleoni.js'
import { publicAssetUrl } from '../../utils/publicAssetUrl.js'

// i tre numeri in alto: quanto è arrivato fino a noi del mazzo
const numeriMazzo = [
  { cifra: '74', testo: 'carte arrivate fino a noi, su 78' },
  { cifra: String(carteColleoni.filter((c) => !c.perduta).length), testo: 'arcani maggiori: 2 sono andati perduti' },
  { cifra: '2', testo: 'città: New York e Bergamo' }
]

// la città dove si trova la carta, per la didascalia sotto
function citta(carta) {
  if (carta.perduta) return 'carta perduta'
  return carta.conservazione.includes('Bergamo') ? 'Bergamo' : 'New York'
}

// la carta aperta nella scheda (null = nessuna)
const indiceAperto = ref(null)
const cartaAperta = computed(() =>
  indiceAperto.value === null ? null : carteColleoni[indiceAperto.value]
)

function apri(i) {
  indiceAperto.value = i
}

function chiudi() {
  indiceAperto.value = null
}

// frecce: carta precedente / successiva (alla fine ricomincia dall'inizio)
function successiva() {
  indiceAperto.value = (indiceAperto.value + 1) % carteColleoni.length
}
function precedente() {
  indiceAperto.value = (indiceAperto.value - 1 + carteColleoni.length) % carteColleoni.length
}

// il contatore in alto nella scheda: "01 / 22"
const contatore = computed(() =>
  String(indiceAperto.value + 1).padStart(2, '0') + ' / ' + carteColleoni.length
)

// tastiera: Esc chiude, frecce ← → cambiano carta
function tasto(e) {
  if (indiceAperto.value === null) return
  if (e.key === 'Escape') chiudi()
  if (e.key === 'ArrowRight') successiva()
  if (e.key === 'ArrowLeft') precedente()
}
onMounted(() => window.addEventListener('keydown', tasto))
onUnmounted(() => window.removeEventListener('keydown', tasto))
</script>

<template>
  <!-- I NUMERI DEL MAZZO -->
  <div class="numeri">
    <div v-for="n in numeriMazzo" :key="n.testo" class="dato">
      <span class="cifra">{{ n.cifra }}</span>
      <span>{{ n.testo }}</span>
    </div>
  </div>

  <!-- LE CARTE, sfalsate come sul tavolo -->
  <section class="sezione">
    <h2 class="etichetta">Le carte</h2>
    <p class="istruzioni">Ventidue arcani, sfalsati come sul tavolo. Clicca una carta per aprire la sua scheda.</p>

    <div class="tavolo">
      <button
        v-for="(carta, i) in carteColleoni"
        :key="carta.id"
        class="posto"
        :class="{ perduta: carta.perduta }"
        @click="apri(i)"
      >
        <span class="carta">
          <img v-if="carta.immagine" :src="publicAssetUrl(carta.immagine)" :alt="carta.nome" />
          <span v-else class="romano">{{ carta.romano }}</span>
          <span v-if="carta.perduta" class="nota">carta perduta</span>
        </span>
        <span class="didascalia">{{ carta.romano }} · {{ carta.nome }}</span>
        <span class="citta">{{ citta(carta) }}</span>
      </button>
    </div>
  </section>

  <!-- LA SCHEDA: compare solo se c'è una carta aperta -->
  <div v-if="cartaAperta" class="scheda" @click.self="chiudi">
    <p class="contatore">{{ contatore }}</p>
    <button class="chiudi" @click="chiudi">✕ Chiudi</button>

    <!-- metà sinistra: la carta grande -->
    <div class="scheda-carta">
      <img v-if="cartaAperta.immagine" :src="publicAssetUrl(cartaAperta.immagine)" :alt="cartaAperta.nome" />
      <div v-else class="carta-grande">
        <span class="romano">{{ cartaAperta.romano }}</span>
      </div>
    </div>

    <!-- metà destra: le informazioni -->
    <div class="scheda-info">
      <p class="etichetta">Arcano {{ cartaAperta.romano }}</p>
      <h2>{{ cartaAperta.nome }}</h2>

      <p v-if="cartaAperta.perduta" class="descrizione">
        Questa carta è andata perduta: non è arrivata fino a noi.
      </p>

      <!-- le informazioni, una per riga, con una linea sottile sopra -->
      <dl v-else>
        <div class="riga">
          <dt class="etichetta">Dove è conservata</dt>
          <dd>{{ cartaAperta.conservazione || 'Da completare' }}</dd>
        </div>
        <div class="riga">
          <dt class="etichetta">Autore</dt>
          <dd>{{ cartaAperta.autore }}</dd>
        </div>
        <div class="riga">
          <dt class="etichetta">Datazione</dt>
          <dd>{{ cartaAperta.datazione }}</dd>
        </div>
        <div class="riga lunga">
          <dt class="etichetta">Cosa rappresenta</dt>
          <dd class="descrizione">{{ cartaAperta.descrizione || 'Da completare' }}</dd>
        </div>
      </dl>

      <div class="frecce">
        <button @click="precedente">← Precedente</button>
        <button @click="successiva">Successiva →</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.etichetta {
  font-size: 12px;
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0;
}

/* ── I NUMERI ── */
.numeri {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 100px 100px 0;
}

.dato {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 28px;
  border-top: 1px solid currentColor;
  font-size: 15px;
}

.cifra {
  font-weight: 200;
  font-size: clamp(64px, 8vw, 110px);
  line-height: 1;
}

/* ── LE CARTE ── */
.sezione {
  padding: 120px 100px;
}

.istruzioni {
  max-width: 420px;
  font-size: 17px;
  line-height: 1.6;
  margin: 16px 0 80px;
}

.tavolo {
  display: grid;
  grid-template-columns: repeat(6, 1fr);   /* 6 carte per riga */
  column-gap: 36px;
  row-gap: 56px;
}

/* ogni carta è un bottone: tolgo l'aspetto da bottone */
.posto {
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: rotate 0.3s ease, translate 0.3s ease;
}

/* come in homepage: ogni colonna scende di più o di meno, e la carta è un po' storta */
.posto:nth-child(6n + 1) { margin-top: 0;    rotate: -1.5deg; }
.posto:nth-child(6n + 2) { margin-top: 72px; rotate: 1deg; }
.posto:nth-child(6n + 3) { margin-top: 24px; rotate: -0.6deg; }
.posto:nth-child(6n + 4) { margin-top: 96px; rotate: 1.4deg; }
.posto:nth-child(6n + 5) { margin-top: 12px; rotate: -1deg; }
.posto:nth-child(6n + 6) { margin-top: 60px; rotate: 0.8deg; }

/* passandoci sopra, la carta si raddrizza e si alza un po' */
@media (hover: hover) {
  .posto:hover {
    rotate: 0deg;
    translate: 0 -8px;
  }
}

.carta {
  position: relative;
  aspect-ratio: 1 / 2;          /* le carte del mazzo Colleoni sono alte il doppio della larghezza */
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, currentColor 40%, transparent);
  background: color-mix(in srgb, currentColor 14%, transparent);
  box-shadow: 0 18px 40px -8px rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}

.carta img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.romano {
  font-family: var(--titoli);
  font-weight: 300;
  font-size: 44px;
}

/* le carte perdute: solo il contorno tratteggiato, niente ombra */
.perduta .carta {
  background: none;
  box-shadow: none;
  border: 1px dashed currentColor;
}

.nota {
  position: absolute;
  bottom: 18px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.didascalia {
  font-size: 13px;
  margin-top: 18px;
}

.citta {
  font-family: var(--titoli);
  font-style: italic;
  font-size: 18px;
  margin-top: 2px;
}

/* ── LA SCHEDA ── */
.scheda {
  position: fixed;              /* sta sopra a tutta la pagina */
  inset: 0;
  z-index: 10;
  background: var(--inchiostro);
  color: var(--carta);
  display: grid;
  grid-template-columns: 1fr 1fr;   /* due metà: carta | info */
  align-items: center;
  gap: 64px;
  padding: 48px 80px;
}

.contatore {
  position: absolute;
  top: 36px;
  left: 40px;
  margin: 0;
  font-size: 13px;
  letter-spacing: 2px;
}

.chiudi {
  position: absolute;
  top: 28px;
  right: 40px;
}

.scheda-carta {
  display: flex;
  justify-content: center;
}

.scheda-carta img,
.carta-grande {
  height: 76vh;
  aspect-ratio: 1 / 2;
  object-fit: cover;
  border-radius: 8px;
  rotate: -2deg;
  box-shadow: 0 18px 40px -8px rgba(0, 0, 0, 0.6);
}

.carta-grande {
  border: 1px dashed var(--carta);
  display: flex;
  align-items: center;
  justify-content: center;
}

.carta-grande .romano {
  font-size: 80px;
}

.scheda-info {
  max-width: 600px;
}

.scheda-info h2 {
  font-family: var(--titoli);
  font-weight: 300;
  font-style: italic;
  font-size: clamp(56px, 7vw, 120px);
  line-height: 1;
  margin: 12px 0 36px;
}

dl {
  margin: 0;
}

/* una riga: etichetta a sinistra, valore a destra */
.riga {
  display: grid;
  grid-template-columns: 170px 1fr;
  gap: 24px;
  align-items: baseline;
  padding: 14px 0;
  border-top: 1px solid color-mix(in srgb, currentColor 35%, transparent);
}

.riga dd {
  margin: 0;
  font-family: var(--titoli);
  font-size: 24px;
}

/* "Cosa rappresenta": il testo va sotto l'etichetta, su tutta la larghezza */
.riga.lunga {
  grid-template-columns: 1fr;
  gap: 12px;
}

.riga dd.descrizione,
.descrizione {
  font-family: var(--testi);
  font-size: 16px;
  line-height: 1.6;
}

.scheda button {
  background: none;
  border: none;
  color: inherit;
  font-family: var(--titoli);
  font-style: italic;
  font-size: 26px;
  cursor: pointer;
  padding: 0;
}

.scheda button:hover {
  text-decoration: underline;
}

.frecce {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}

/* ── SCHERMI PICCOLI ── */
@media (max-width: 900px) {
  .numeri {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 64px 24px 0;
  }
  .sezione {
    padding: 80px 24px;
  }
  .tavolo {
    grid-template-columns: repeat(3, 1fr);   /* 3 carte per riga */
    column-gap: 16px;
    row-gap: 32px;
  }
  .posto:nth-child(n) { margin-top: 0; }
  .posto:nth-child(3n + 2) { margin-top: 32px; }
  .romano {
    font-size: 28px;
  }
  .citta {
    font-size: 15px;
  }
  /* la scheda va in colonna: carta sopra, info sotto */
  .scheda {
    grid-template-columns: 1fr;
    overflow-y: auto;
    align-items: start;
    gap: 32px;
    padding: 80px 24px 48px;
  }
  .scheda-carta img,
  .carta-grande {
    height: 50vh;
  }
  .riga {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
