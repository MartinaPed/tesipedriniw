<!--
  PAGINA DEL GLOSSARIO: si apre all'indirizzo /glossario
  Tutte le parole inventate di Arcanamente, in ordine alfabetico,
  scritte come in un dizionario.
  Se l'indirizzo è /glossario?parola=zerranza, la pagina scorre fino
  a quella parola e la evidenzia per un attimo.
-->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { glossario } from '../data/glossario.js'
import VoceDizionario from '../components/VoceDizionario.vue'
import SitoFooter from '../components/SitoFooter.vue'

const route = useRoute()

// le parole in ordine alfabetico.
// [...glossario] fa una copia della lista, così non cambiamo l'originale;
// localeCompare(..., 'it') confronta le parole come in un dizionario italiano
const paroleInOrdine = computed(() =>
  [...glossario].sort((a, b) => a.parola.localeCompare(b.parola, 'it'))
)

// la parola da evidenziare (arriva dall'indirizzo, es. ?parola=zerranza)
const parolaCercata = computed(() => route.query.parola)

// il link "← Torna indietro": riporta alla pagina da cui sei arrivata
// (es. l'articolo del Matto). Se sei entrata direttamente qui, porta alla homepage.
const indietro = window.history.state?.back || '/'
</script>

<template>
  <div class="pagina">
    <!-- 1. APERTURA -->
    <section class="apertura">
      <nav class="barra">
        <RouterLink to="/" class="logo">Arcanamente</RouterLink>
        <RouterLink :to="indietro">← Torna indietro</RouterLink>
      </nav>

      <p class="etichetta">Arcanamente · Glossario</p>
      <h1>Glossario</h1>
      <!-- TESTO PROVVISORIO: sostituiscilo con il tuo -->
      <p class="intro">
        Le parole inventate da Arcanamente, una per ogni soglia. Nascono dentro i numeri
        della rivista e qui si raccolgono, come in un dizionario.
      </p>
    </section>

    <!-- 2. LE PAROLE: due colonne, come la pagina di un dizionario.
         Ogni voce ha un id (es. "zerranza"): serve per arrivarci direttamente -->
    <section class="parole">
      <div
        v-for="voce in paroleInOrdine"
        :key="voce.id"
        :id="voce.id"
        class="voce"
        :class="{ evidenziata: voce.id === parolaCercata }"
      >
        <VoceDizionario :voce="voce" />
      </div>
    </section>

    <SitoFooter />
  </div>
</template>

<style scoped>
.pagina {
  min-height: 100vh;
  background: var(--carta);
  color: var(--inchiostro);
}

/* ── APERTURA ── */
.apertura {
  padding: 36px 40px 100px;
  border-bottom: 1px solid currentColor;
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
  margin: 24px 0 0 52px;
}

.intro {
  max-width: 460px;
  font-size: 17px;
  line-height: 1.6;
  margin: 28px 60px 0 auto;   /* "auto" a sinistra spinge il testo verso destra */
}

/* ── LE PAROLE ── */
.parole {
  column-count: 2;            /* due colonne, come un dizionario */
  column-gap: 96px;
  max-width: 1240px;
  padding: 120px 100px;
}

.voce {
  break-inside: avoid;        /* una voce non si spezza tra due colonne */
  scroll-margin-top: 80px;    /* quando la pagina scorre fino alla voce, lascia un po' d'aria sopra */
}

/* la parola cercata: per un attimo ha un fondo leggermente più scuro, che poi svanisce */
.evidenziata {
  animation: evidenzia 3s ease-out;
  border-radius: 6px;
}

@keyframes evidenzia {
  from { background: rgba(28, 26, 23, 0.1); }
  to   { background: transparent; }
}

/* ── SCHERMI PICCOLI ── */
@media (max-width: 900px) {
  .apertura {
    padding: 28px 24px 64px;
  }
  .barra {
    margin-bottom: 80px;
  }
  .etichetta,
  h1,
  .intro {
    margin-left: 0;
    margin-right: 0;
  }
  .parole {
    column-count: 1;          /* una colonna sola */
    padding: 80px 24px;
  }
}

/* "meno animazioni": niente sfumatura, la parola cercata ha solo un filo a sinistra */
@media (prefers-reduced-motion: reduce) {
  .evidenziata {
    animation: none;
    border-left: 2px solid currentColor;
    padding-left: 16px;
  }
}
</style>
