<!--
  APPROFONDIMENTO: IL MAZZO COLLEONI
  Una griglia con le carte del mazzo. Cliccando una carta
  si apre la "scheda": la carta grande a sinistra, le info a destra.
  Questo componente è DEDICATO solo a questo approfondimento,
  perché il suo contenuto è unico (non si ripete in altri numeri).
-->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { carteColleoni } from '../../data/colleoni.js'

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
  <!-- LA GRIGLIA DELLE CARTE -->
  <div class="griglia">
    <button
      v-for="(carta, i) in carteColleoni"
      :key="carta.id"
      class="carta"
      :class="{ perduta: carta.perduta }"
      @click="apri(i)"
    >
      <img v-if="carta.immagine" :src="carta.immagine" :alt="carta.nome" />
      <span v-else class="segnaposto">
        <span class="romano">{{ carta.romano }}</span>
        <span>{{ carta.nome }}</span>
        <span v-if="carta.perduta" class="nota">carta perduta</span>
      </span>
    </button>
  </div>

  <!-- LA SCHEDA: compare solo se c'è una carta aperta -->
  <div v-if="cartaAperta" class="scheda" @click.self="chiudi">
    <button class="chiudi" @click="chiudi">✕</button>

    <!-- metà sinistra: la carta grande -->
    <div class="scheda-carta">
      <img v-if="cartaAperta.immagine" :src="cartaAperta.immagine" :alt="cartaAperta.nome" />
      <div v-else class="carta-grande" :class="{ perduta: cartaAperta.perduta }">
        <span class="romano">{{ cartaAperta.romano }}</span>
        <span>{{ cartaAperta.nome }}</span>
      </div>
    </div>

    <!-- metà destra: le informazioni -->
    <div class="scheda-info">
      <p class="etichetta">Arcano {{ cartaAperta.romano }}</p>
      <h2>{{ cartaAperta.nome }}</h2>

      <template v-if="cartaAperta.perduta">
        <p>Questa carta è andata perduta: non è arrivata fino a noi.</p>
      </template>

      <template v-else>
        <p class="etichetta">Dove è conservata</p>
        <p>{{ cartaAperta.conservazione || 'Da completare' }}</p>

        <p class="etichetta">Autore</p>
        <p>{{ cartaAperta.autore }}</p>

        <p class="etichetta">Datazione</p>
        <p>{{ cartaAperta.datazione }}</p>

        <p class="etichetta">Cosa rappresenta</p>
        <p>{{ cartaAperta.descrizione || 'Da completare' }}</p>
      </template>

      <div class="frecce">
        <button @click="precedente">← Precedente</button>
        <button @click="successiva">Successiva →</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── GRIGLIA ── */
.griglia {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));   /* quante colonne ci stanno */
  gap: 24px;
}

.carta {
  aspect-ratio: 1 / 2;          /* le carte del mazzo Colleoni sono alte il doppio della larghezza */
  padding: 0;
  border: 1px solid currentColor;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  transition: transform 0.2s;
}

.carta:hover {
  transform: translateY(-6px);    /* la carta si alza un po' */
}

.carta img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.segnaposto {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  text-align: center;
}

.romano {
  font-size: 28px;
}

.perduta {
  border-style: dashed;
  opacity: 0.75;                /* spenta, ma ancora leggibile */
}

.nota {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* ── SCHEDA ── */
.scheda {
  position: fixed;              /* sta sopra a tutta la pagina */
  inset: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.92);
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;   /* due metà: carta | info */
  align-items: center;
  gap: 48px;
  padding: 48px;
}

.scheda-carta {
  display: flex;
  justify-content: center;
}

.scheda-carta img,
.carta-grande {
  height: 80vh;
  aspect-ratio: 1 / 2;
  object-fit: contain;
}

.carta-grande {
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 24px;
}

.carta-grande .romano {
  font-size: 80px;
}

.scheda-info {
  max-width: 480px;
}

.scheda-info h2 {
  font-size: 48px;
  margin: 0 0 32px;
}

.etichetta {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 3px;
  opacity: 0.7;
  margin: 24px 0 4px;
}

.scheda button {
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.chiudi {
  position: absolute;
  top: 24px;
  right: 24px;
}

.frecce {
  display: flex;
  gap: 16px;
  margin-top: 40px;
}

/* sul telefono: 3 carte per riga, più vicine e con il testo più piccolo */
@media (max-width: 600px) {
  .griglia {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .segnaposto {
    font-size: 11px;
  }
  .romano {
    font-size: 18px;
  }
}

/* su schermi stretti la scheda va in colonna: carta sopra, info sotto */
@media (max-width: 800px) {
  .scheda {
    grid-template-columns: 1fr;
    overflow-y: auto;
    align-items: start;
  }
  .scheda-carta img,
  .carta-grande {
    height: 50vh;
  }
}
</style>
