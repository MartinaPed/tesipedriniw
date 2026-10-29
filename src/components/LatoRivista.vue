<!--
  LATO DELLA RIVISTA: una "faccia" della pagina del numero.
  Lo usiamo per il lato A e per il lato B: la struttura è la stessa,
  cambiano solo i contenuti e i colori (che arrivano dai dati).
-->
<script setup>
import SitoFooter from './SitoFooter.vue'
import VoceDizionario from './VoceDizionario.vue'

defineProps({
  numero: Object,   // il numero (es. Il Matto)
  lato: Object,     // il lato da mostrare (A o B)
  parole: Array     // le parole del glossario nate in questo numero
})

// "emit" serve per mandare un messaggio alla pagina che ci contiene:
// qui diciamo "hanno cliccato cambia lato!"
const emit = defineEmits(['cambia-lato'])
</script>

<template>
  <!-- --sfondo è una variabile CSS: ci serve per il tasto quando ci passi sopra -->
  <!-- lo sfondo sfuma dall'alto (colore) al basso (sfumatura): colori presi dai dati -->
  <div
    class="lato"
    :style="{
      background: `linear-gradient(to bottom, ${lato.colore}, ${lato.sfumatura || lato.colore})`,
      color: lato.testo,
      '--sfondo': lato.colore
    }"
  >

    <!-- 1. APERTURA: a tutto schermo, come la copertina -->
    <section class="apertura">
      <RouterLink to="/" class="indietro">← Torna alla collana</RouterLink>

      <!-- carta a sinistra e testi a destra, uno accanto all'altro -->
      <div class="titolo">
        <!-- sul lato B aggiungiamo la classe "capovolta": la rivista è girata, quindi anche la carta -->
        <img
          v-if="numero.carta"
          :src="numero.carta"
          :alt="numero.nome"
          class="carta"
          :class="{ capovolta: lato === numero.lati.B }"
        />
        <div class="testi">
          <p class="romano">{{ numero.romano }}</p>
          <h1>{{ numero.nome }}</h1>
          <p class="etichetta">N°{{ numero.id }} · {{ lato.nome }}</p>
        </div>
      </div>

      <p class="scorri">↓ scorri</p>
    </section>

    <!-- 2. EDITORIALE: il testo che introduce questa metà della rivista -->
    <section class="sezione">
      <h2 class="etichetta">Editoriale</h2>
      <div class="editoriale">
        <p v-for="(paragrafo, i) in lato.editoriale" :key="i">{{ paragrafo }}</p>
      </div>
    </section>

    <!-- 5. APPROFONDIMENTI: uno per riga, con il numero 01, 02... -->
    <section class="sezione">
      <h2 class="etichetta">Approfondimenti</h2>

      <!-- ogni approfondimento è un link alla sua pagina -->
      <RouterLink
        v-for="(app, i) in lato.approfondimenti"
        :key="app.id"
        :to="'/numero/' + numero.id + '/' + app.id"
        class="approfondimento"
      >
        <span class="indice">0{{ i + 1 }}</span>
        <div>
          <h3>{{ app.titolo }}</h3>
          <p class="sottotitolo">{{ app.sottotitolo }}</p>
          <p>{{ app.anteprima }}</p>
          <p class="leggi">Leggi →</p>
        </div>
      </RouterLink>
    </section>

    <!-- 6. LE PAROLE DI QUESTO LATO (dal glossario) -->
    <section v-if="parole.length" class="sezione">
      <h2 class="etichetta">Le parole di questo lato</h2>
      <div class="parole">
        <VoceDizionario v-for="voce in parole" :key="voce.id" :voce="voce" />
      </div>
    </section>

    <!-- 7. CAMBIA LATO -->
    <section class="sezione cambia">
      <p>Gira la rivista per scoprire l'altra metà del numero</p>
      <!-- al click mandiamo il messaggio "cambia-lato" alla pagina -->
      <button @click="emit('cambia-lato')">↻ Cambia lato</button>
    </section>

    <SitoFooter />
  </div>
</template>

<style scoped>
.lato {
  min-height: 100vh;
}

/* tutti i titoletti piccoli in maiuscolo spaziato */
.etichetta {
  font-size: 14px;
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 3px;
}

/* ── 1. APERTURA ── */
.apertura {
  min-height: 100vh;            /* alta quanto lo schermo */
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.indietro {
  align-self: flex-start;      /* il link è largo quanto il suo testo, non tutta la pagina */
  color: inherit;
  text-decoration: none;
  font-size: 14px;
}

/* flex mette carta e testi uno ACCANTO all'altro (non uno sotto l'altro):
   così l'apertura occupa meno spazio in altezza */
.titolo {
  display: flex;
  align-items: center;          /* carta e testi centrati in verticale tra loro */
  justify-content: center;      /* il gruppo sta al centro della pagina */
  gap: clamp(24px, 5vw, 72px);  /* spazio tra carta e testi */
  text-align: center;
}

/* se c'è la carta, i testi si allineano a sinistra, vicino alla carta */
.titolo:has(.carta) .testi {
  text-align: left;
}

.romano {
  font-size: clamp(80px, 16vw, 220px);   /* gigante, ma si adatta allo schermo */
  line-height: 1;
  margin: 0;
}

h1 {
  font-size: clamp(28px, 6vw, 80px);
  margin: 0;
  text-transform: uppercase;
}

.carta {
  width: clamp(110px, 22vw, 280px);   /* si rimpicciolisce sugli schermi piccoli */
  flex-shrink: 0;                     /* la carta non si schiaccia */
  display: block;
}

/* lato B: la carta è a testa in giù, come quando giri la rivista */
.capovolta {
  transform: rotate(180deg);
}

.scorri {
  text-align: center;
  font-size: 14px;
}

/* ── SEZIONI ── */
.sezione {
  padding: 80px 40px;
  border-top: 2px solid currentColor;
}

/* ── 2. EDITORIALE ── */
.editoriale {
  column-count: 2;          /* il testo va su due colonne, come in rivista */
  column-gap: 48px;
  font-size: 18px;
  line-height: 1.6;
  max-width: 1000px;
}

.editoriale p {
  margin-top: 0;
}

/* ── 5. APPROFONDIMENTI ── */
.approfondimento {
  color: inherit;              /* il link non diventa blu */
  text-decoration: none;
  display: flex;
  gap: 32px;
  padding: 40px 0;
  border-top: 1px solid currentColor;
}

.indice {
  font-size: 64px;
  line-height: 1;
}

.approfondimento h3 {
  font-size: 32px;
  margin: 0;
}

.sottotitolo {
  font-style: italic;
}

.approfondimento p {
  max-width: 600px;
}

.leggi {
  font-weight: bold;
}

.approfondimento:hover .leggi {
  text-decoration: underline;
}

/* ── 6. PAROLE ── */
.parole {
  column-count: 2;          /* due colonne, come la pagina di un dizionario */
  column-gap: 64px;
  max-width: 1100px;
}

/* ── 7. CAMBIA LATO ── */
.cambia {
  text-align: center;
}

button {
  font-size: 24px;
  padding: 20px 48px;
  background: transparent;
  color: inherit;                       /* stesso colore del testo */
  border: 2px solid currentColor;
  cursor: pointer;                      /* manina quando passi sopra */
}

/* passandoci sopra i colori si invertono */
button:hover {
  background: currentColor;
  color: var(--sfondo);
}

/* su schermi piccoli l'editoriale va su una colonna sola */
@media (max-width: 700px) {
  .editoriale,
  .parole {
    column-count: 1;
  }
}
</style>
