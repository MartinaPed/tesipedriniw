<!--
  LATO DELLA RIVISTA: una "faccia" della pagina del numero.
  Lo usiamo per il lato A e per il lato B: la struttura è la stessa,
  cambiano solo i contenuti e i colori (che arrivano dai dati).
-->
<script setup>
import { computed } from 'vue'
import { publicAssetUrl } from '../utils/publicAssetUrl.js'
import SitoFooter from './SitoFooter.vue'
import VoceDizionario from './VoceDizionario.vue'

const props = defineProps({
  numero: Object,   // il numero (es. Il Matto)
  lato: Object,     // il lato da mostrare (A o B)
  parole: Array     // le parole del glossario nate in questo numero
})

// "emit" serve per mandare un messaggio alla pagina che ci contiene:
// qui diciamo "hanno cliccato cambia lato!"
const emit = defineEmits(['cambia-lato'])

// siamo sul lato B? (serve per capovolgere la carta)
const latoB = computed(() => props.lato === props.numero.lati.B)

// l'altro lato: il suo nome compare in grande sul bottone in fondo
const altroLato = computed(() => (latoB.value ? props.numero.lati.A : props.numero.lati.B))

// le frasi che scorrono: nei dati sono una lista [ ... ].
// Se non ci sono, usiamo nome del numero e del lato.
// Le ripetiamo finché sono almeno 8, così la fascia è sempre più larga dello schermo
const frasiFascia = computed(() => {
  const frasi = props.lato.fascia || [props.numero.nome + ' · ' + props.lato.nome]
  let lista = [...frasi]
  while (lista.length < 8) lista = lista.concat(frasi)
  return lista
})
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
      <nav class="barra">
        <RouterLink to="/" class="logo">Arcanamente</RouterLink>
        <RouterLink to="/" class="indietro">← La collana</RouterLink>
      </nav>

      <!-- carta a sinistra e testi a destra, uno accanto all'altro -->
      <div class="titolo">
        <!-- sul lato B aggiungiamo la classe "capovolta": la rivista è girata, quindi anche la carta -->
        <img
          v-if="numero.carta"
          :src="publicAssetUrl(numero.carta)"
          :alt="numero.nome"
          class="carta"
          :class="{ capovolta: latoB }"
        />
        <div class="testi">
          <p class="etichetta">N°{{ numero.id }} · {{ latoB ? 'Lato B' : 'Lato A' }}</p>
          <p class="romano">{{ numero.romano }}</p>
          <h1>{{ lato.nome.startsWith('Lato') ? numero.nome : lato.nome }}</h1>
        </div>
      </div>

      <div class="piede">
        <p>↓ scorri</p>
        <button class="gira-piccolo" @click="emit('cambia-lato')">
          <span class="giro">↻</span> Gira la rivista
        </button>
      </div>
    </section>

    <!-- 2. LA FASCIA CHE SCORRE (gli stili sono in style.css)
         come in homepage, la lista è scritta due volte per l'effetto infinito.
         :key="lato.nome" = quando giri la rivista, la fascia riparte da capo con le frasi nuove -->
    <div class="fascia con-linee" aria-hidden="true">
      <div class="fascia-binario" :key="lato.nome">
        <template v-for="copia in 2" :key="copia">
          <span v-for="(frase, i) in frasiFascia" :key="copia + '-' + i">{{ frase }} ✦</span>
        </template>
      </div>
    </div>

    <!-- 3. EDITORIALE: la frase d'apertura in grande, poi il testo su due colonne -->
    <section class="sezione">
      <h2 class="etichetta">Editoriale</h2>
      <p v-if="lato.citazione" class="citazione">{{ lato.citazione }}</p>
      <div class="editoriale">
        <p v-for="(paragrafo, i) in lato.editoriale" :key="i">{{ paragrafo }}</p>
      </div>
    </section>

    <!-- 4. APPROFONDIMENTI: uno per riga, con il numero 01, 02... -->
    <section class="sezione">
      <h2 class="etichetta">Approfondimenti</h2>

      <!-- ogni approfondimento è un link alla sua pagina -->
      <RouterLink
        v-for="(app, i) in lato.approfondimenti"
        :key="app.id"
        :to="'/numero/' + numero.id + '/' + app.id"
        class="approfondimento"
      >
        <div class="testo-app">
          <span class="indice">0{{ i + 1 }}</span>
          <h3>{{ app.titolo }}</h3>
          <p class="sottotitolo">{{ app.sottotitolo }}</p>
          <p class="anteprima">{{ app.anteprima }}</p>
          <p class="leggi">Leggi →</p>
        </div>

        <!-- IL VENTAGLIO: 3 carte aperte a ventaglio.
             Se nei dati ci sono le immagini (ventaglio), le mostriamo;
             altrimenti 3 carte coperte con la stellina sul dorso -->
        <div class="ventaglio" aria-hidden="true">
          <template v-if="app.ventaglio">
            <img v-for="src in app.ventaglio" :key="src" :src="publicAssetUrl(src)" alt="" class="carta-ventaglio" />
          </template>
          <template v-else>
            <span v-for="n in 3" :key="n" class="carta-ventaglio coperta">✦</span>
          </template>
        </div>
      </RouterLink>
    </section>

    <!-- 5. LE PAROLE DI QUESTO LATO (dal glossario) -->
    <section v-if="parole.length" class="sezione">
      <h2 class="etichetta">Le parole di questo lato</h2>
      <div class="parole">
        <VoceDizionario v-for="voce in parole" :key="voce.id" :voce="voce" />
      </div>
    </section>

    <!-- 6. CAMBIA LATO: il nome dell'altro lato, in grande -->
    <section class="sezione cambia">
      <p class="etichetta">Gira la rivista per scoprire l'altra metà del numero</p>
      <!-- al click mandiamo il messaggio "cambia-lato" alla pagina -->
      <button @click="emit('cambia-lato')">
        <span class="giro">↻</span>
        {{ altroLato.nome }}
      </button>
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
  font-size: 12px;
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0 0 48px;
}

/* il simbolo ↻: Cormorant non ce l'ha, quindi usiamo DM Sans sottile */
.giro {
  font-family: var(--testi);
  font-weight: 200;
}

/* ── 1. APERTURA ── */
.apertura {
  min-height: 100vh;            /* alta quanto lo schermo */
  padding: 36px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.barra {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.barra a {
  color: inherit;
  text-decoration: none;
}

.logo {
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 3px;
}

/* flex mette carta e testi uno ACCANTO all'altro */
.titolo {
  display: flex;
  align-items: center;          /* carta e testi centrati in verticale tra loro */
  justify-content: center;      /* il gruppo sta al centro della pagina */
  gap: clamp(32px, 9vw, 140px); /* spazio tra carta e testi */
}

.carta {
  width: clamp(130px, 21vw, 300px);   /* si rimpicciolisce sugli schermi piccoli */
  flex-shrink: 0;                     /* la carta non si schiaccia */
  display: block;
  border-radius: 14px;
  rotate: -2deg;                      /* un po' storta, come posata sul tavolo */
  box-shadow: 0 18px 40px -8px rgba(0, 0, 0, 0.45);
}

/* lato B: la carta è a testa in giù, come quando giri la rivista */
.capovolta {
  rotate: 182deg;
}

.testi .etichetta {
  margin-bottom: 0;
}

.romano {
  font-family: var(--titoli);
  font-weight: 300;
  font-size: clamp(120px, 26vw, 400px);   /* gigante, ma si adatta allo schermo */
  line-height: 0.8;
  margin: 0;
}

h1 {
  font-family: var(--titoli);
  font-weight: 300;
  font-style: italic;
  font-size: clamp(44px, 8vw, 120px);
  line-height: 1;
  margin: 0;
}

.piede {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.piede p {
  margin: 0;
}

/* il piccolo "Gira la rivista" in basso a destra */
.gira-piccolo {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-family: var(--titoli);
  font-style: italic;
  font-size: 22px;
  padding: 0;
}

.gira-piccolo:hover {
  text-decoration: underline;
}

/* qui le frasi sono lunghe: la fascia scorre più piano che in homepage */
.fascia-binario {
  animation-duration: 120s;
}

/* la fascia qui ha una riga sopra e una sotto */
.con-linee {
  border-top: 1px solid currentColor;
  border-bottom: 1px solid currentColor;
}

/* ── SEZIONI ── */
.sezione {
  padding: 120px 100px;
}

/* dalla seconda sezione in poi, una riga sottile sopra */
.sezione + .sezione {
  border-top: 1px solid currentColor;
}

/* ── 3. EDITORIALE ── */
.citazione {
  font-family: var(--titoli);
  font-weight: 300;
  font-size: clamp(36px, 4.5vw, 64px);
  line-height: 1.1;
  max-width: 1040px;
  margin: 0 0 56px;
}

.editoriale {
  column-count: 2;          /* il testo va su due colonne, come in rivista */
  column-gap: 64px;
  font-size: 17px;
  line-height: 1.65;
  max-width: 920px;
  margin-left: auto;        /* spinge le colonne verso destra, sotto la citazione */
  margin-right: 60px;
}

.editoriale p {
  margin-top: 0;
}

/* ── 4. APPROFONDIMENTI ── */
.approfondimento {
  color: inherit;              /* il link non diventa blu */
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
}

.approfondimento + .approfondimento {
  margin-top: 80px;
}

.testo-app {
  max-width: 520px;
}

.indice {
  display: block;
  font-weight: 200;
  font-size: clamp(80px, 10vw, 140px);
  line-height: 1;
  margin-bottom: 28px;
}

.approfondimento h3 {
  font-family: var(--titoli);
  font-weight: 300;
  font-size: clamp(40px, 4.5vw, 64px);
  line-height: 1;
  margin: 0;
}

.sottotitolo {
  font-family: var(--titoli);
  font-style: italic;
  font-size: 24px;
  margin: 12px 0 24px;
}

.anteprima {
  font-size: 17px;
  line-height: 1.6;
  margin: 0;
}

.leggi {
  font-family: var(--titoli);
  font-style: italic;
  font-size: 28px;
  margin: 28px 0 0;
}

.approfondimento:hover .leggi {
  text-decoration: underline;
}

/* IL VENTAGLIO: le 3 carte stanno una sopra l'altra (grid, tutte nella stessa cella)
   e ognuna è ruotata e spostata in modo diverso */
.ventaglio {
  display: grid;
  place-items: center;
  width: 440px;
  height: 420px;
  flex-shrink: 0;
}

.carta-ventaglio {
  grid-area: 1 / 1;            /* tutte nella stessa cella: si sovrappongono */
  width: 200px;
  aspect-ratio: 7 / 12;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 18px 40px -8px rgba(0, 0, 0, 0.45);
  transition: translate 0.4s ease, rotate 0.4s ease;
}

.carta-ventaglio:nth-child(1) { translate: -110px 20px; rotate: -12deg; }
.carta-ventaglio:nth-child(2) { translate: 0 0;         rotate: 0deg; }
.carta-ventaglio:nth-child(3) { translate: 110px 20px;  rotate: 12deg; }

/* passandoci sopra, il ventaglio si apre un po' di più */
@media (hover: hover) {
  .approfondimento:hover .carta-ventaglio:nth-child(1) { translate: -150px 30px; rotate: -18deg; }
  .approfondimento:hover .carta-ventaglio:nth-child(3) { translate: 150px 30px;  rotate: 18deg; }
}

/* le carte coperte: colore scuro del lato, bordo sottile e stellina al centro */
.coperta {
  background: var(--sfondo);
  filter: brightness(0.75);    /* un po' più scure dello sfondo */
  border: 1px solid currentColor;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
}

/* ── 5. PAROLE ── */
.parole {
  column-count: 2;          /* due colonne, come la pagina di un dizionario */
  column-gap: 96px;
  max-width: 1240px;
}

/* ── 6. CAMBIA LATO ── */
.cambia {
  text-align: center;
}

.cambia .etichetta {
  margin-bottom: 20px;
}

button {
  font-family: var(--titoli);
  font-weight: 300;
  font-style: italic;
  font-size: clamp(56px, 8vw, 120px);
  line-height: 1.1;
  background: transparent;
  color: inherit;                       /* stesso colore del testo */
  border: none;
  cursor: pointer;                      /* manina quando passi sopra */
  padding: 0;
}

.cambia button:hover {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 12px;
}

/* ── SCHERMI PICCOLI ── */
@media (max-width: 900px) {
  .apertura {
    padding: 28px 24px;
  }
  .sezione {
    padding: 80px 24px;
  }
  .editoriale,
  .parole {
    column-count: 1;        /* una colonna sola */
    margin-right: 0;
  }
  .approfondimento {
    flex-direction: column;   /* il ventaglio va sotto il testo */
    align-items: flex-start;
  }
  .ventaglio {
    width: 100%;
    height: 300px;
  }
  .carta-ventaglio {
    width: 140px;
  }
  .carta-ventaglio:nth-child(1) { translate: -80px 14px; }
  .carta-ventaglio:nth-child(3) { translate: 80px 14px; }
}
</style>
