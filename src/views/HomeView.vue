<!--
  HOMEPAGE: la pagina che si vede all'indirizzo /
-->
<script setup>
import { numeri } from '../data/numeri.js'
import RiquadroNumero from '../components/RiquadroNumero.vue'
import SitoFooter from '../components/SitoFooter.vue'
import { glossario } from '../data/glossario.js'

// In homepage mostriamo solo le prime 6 parole del glossario
const anteprimaGlossario = glossario.slice(0, 6)
</script>

<template>
  <!-- 1. TESTATA: il nome e, subito, cos'è il progetto
       (quando avrai il logo, andrà al posto dell'h1) -->
  <header class="testata">
    <h1>Arcanamente</h1>
    <p class="sottotitolo">Collana di riviste di cultura esoterica</p>
    <p class="intro">
      Una rivista per ogni arcano maggiore dei tarocchi. Ogni numero si legge
      da due lati: capovolgilo per scoprire l’altra metà della carta.
    </p>
  </header>

  <!-- 2. LA COLLANA: tutti i 22 arcani in una fila che scorre in orizzontale -->
  <section class="sezione">
    <h2>La collana</h2>
    <p class="suggerimento">Scorri per scoprire tutti gli arcani →</p>

    <div class="fila">
      <template v-for="numero in numeri" :key="numero.id">
        <!-- numero uscito: il riquadro è un link alla sua pagina -->
        <RouterLink v-if="numero.disponibile" :to="'/numero/' + numero.id" class="link-riquadro">
          <RiquadroNumero :numero="numero" />
        </RouterLink>

        <!-- numero non ancora uscito: riquadro normale, non cliccabile -->
        <RiquadroNumero v-else :numero="numero" />
      </template>
    </div>
  </section>

  <!-- 3. GLOSSARIO: un'anteprima con alcune parole -->
  <section class="sezione">
    <h2>Glossario</h2>
    <p class="suggerimento">Le parole inventate nate dentro le pagine di Arcanamente</p>

    <ul class="parole">
      <li v-for="voce in anteprimaGlossario" :key="voce.id">
        <span class="parola">{{ voce.parola }}</span>
        <span class="origine">dal N°{{ voce.numero }}</span>
      </li>
    </ul>

    <!-- per ora è solo testo: con il router diventerà un link alla pagina del glossario -->
    <p class="vai">Scopri il glossario completo →</p>
  </section>

  <!-- 4. FOOTER -->
  <SitoFooter />
</template>

<style scoped>
.testata {
  padding: 96px 24px 72px;
  text-align: center;
  border-bottom: 2px solid black;
}

.testata h1 {
  font-size: clamp(48px, 10vw, 128px);   /* grande, ma si adatta allo schermo */
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0;
}

.sottotitolo {
  margin: 20px 0 0;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 4px;
}

.intro {
  max-width: 560px;            /* righe non troppo lunghe: si leggono meglio */
  margin: 32px auto 0;
  font-size: 18px;
  line-height: 1.5;
}

.sezione {
  padding: 40px;
}

.suggerimento {
  font-size: 14px;
  color: #666;          /* grigio abbastanza scuro da leggersi bene (5,7:1) */
}

/* LA FILA CHE SCORRE */
.fila {
  display: flex;               /* mette i riquadri uno accanto all'altro */
  gap: 24px;                   /* spazio tra un riquadro e l'altro */
  overflow-x: auto;            /* se escono dallo schermo, si scorre in orizzontale */
  scroll-snap-type: x mandatory; /* quando smetti di scorrere, si "aggancia" a un riquadro */
  padding: 8px 8px 16px;       /* un po' d'aria attorno: il contorno della tastiera non viene tagliato */
  margin: 0 -8px;              /* ...e il margine negativo riallinea i riquadri al testo */
  scroll-padding: 0 8px;       /* l'"aggancio" tiene conto di quell'aria */
}

/* il link che avvolge i riquadri cliccabili */
.link-riquadro {
  display: block;
  flex-shrink: 0;
  scroll-snap-align: start;
  color: inherit;              /* il testo non diventa blu come i link normali */
  text-decoration: none;       /* niente sottolineatura */
}

/* IL GLOSSARIO: una lista come l'indice di un dizionario */
.parole {
  list-style: none;            /* toglie i pallini dell'elenco */
  padding: 0;
  margin: 0;
}

.parole li {
  display: flex;
  justify-content: space-between;   /* parola a sinistra, numero a destra */
  align-items: baseline;
  padding: 16px 0;
  border-top: 1px solid black;
}

.parola {
  font-size: 28px;
  font-style: italic;
}

.origine {
  font-size: 14px;
  color: #666;          /* grigio abbastanza scuro da leggersi bene (5,7:1) */
}

.vai {
  margin-top: 24px;
  font-weight: bold;
}
</style>
