<!--
  HOMEPAGE: la pagina che si vede all'indirizzo /
-->
<script setup>
import { numeri } from '../data/numeri.js'
import RiquadroNumero from '../components/RiquadroNumero.vue'
import SitoFooter from '../components/SitoFooter.vue'
import { glossario } from '../data/glossario.js'
import { publicAssetUrl } from '../utils/publicAssetUrl.js'

// In homepage mostriamo solo le prime 6 parole del glossario
const anteprimaGlossario = glossario.slice(0, 6)

// i nomi che scorrono nella fascia nera: "N°00 Il Matto", "N°01 Il Bagatto"...
const nomiFascia = numeri.map((n) => 'N°' + n.id + '  ' + n.nome)

// il colore del lato da cui viene una parola (per il pallino accanto)
function coloreDi(voce) {
  const numero = numeri.find((n) => n.id === voce.numero)
  return numero.lati[voce.lato].colore
}

// il menu in alto fa scorrere la pagina fino alla sezione giusta
function vaiA(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <!-- 1. TESTATA: grande come la copertina di una rivista -->
  <header class="testata">
    <nav class="menu">
      <span class="logo">Arcanamente</span>
      <div class="voci">
        <button @click="vaiA('collana')">La collana</button>
        <button @click="vaiA('glossario')">Glossario</button>
      </div>
    </nav>

    <p class="sottotitolo">Collana di riviste di cultura esoterica</p>
    <!-- il logo al posto del titolo scritto.
         Resta dentro <h1>: per Google e per i lettori di schermo è ancora il titolo
         della pagina, e "alt" dice cosa c'è scritto nell'immagine -->
    <h1>
      <img :src="publicAssetUrl('/loghi/logonero-ritagliato.png')" alt="Arcanamente" class="logo-grande" />
    </h1>

    <div class="sotto-titolo">
      <p class="intro">
        Una rivista per ogni arcano maggiore dei tarocchi. Ogni numero si legge
        da due lati: capovolgilo per scoprire l’altra metà della carta.
      </p>
      <RouterLink to="/numero/00" class="invito">Inizia dal N°00, Il Matto →</RouterLink>
    </div>

    <p class="scorri">↓ scorri</p>
  </header>

  <!-- 2. LA FASCIA CHE SCORRE: i nomi di tutti gli arcani.
       La lista è scritta due volte (v-for="copia in 2") per l'effetto infinito:
       gli stili sono in style.css, perché la fascia c'è anche nelle pagine dei numeri.
       aria-hidden: chi usa un lettore di schermo non sente ripetere 44 nomi -->
  <div class="fascia nera" aria-hidden="true">
    <div class="fascia-binario">
      <template v-for="copia in 2" :key="copia">
        <span v-for="nome in nomiFascia" :key="copia + nome">{{ nome }} ✦</span>
      </template>
    </div>
  </div>

  <!-- 3. LA COLLANA: le carte posate sul tavolo, un po' sfalsate e storte -->
  <section id="collana" class="sezione">
    <div class="intestazione">
      <h2>La collana</h2>
      <p class="spiegazione">
        Ventidue numeri, uno per arcano. Le carte con l’angolo piegato sono già
        uscite: aprile e sfogliale.
      </p>
    </div>

    <div class="tavolo">
      <template v-for="numero in numeri" :key="numero.id">
        <!-- numero uscito: la carta è un link alla sua pagina -->
        <RouterLink v-if="numero.disponibile" :to="'/numero/' + numero.id" class="posto">
          <RiquadroNumero :numero="numero" />
        </RouterLink>

        <!-- numero non ancora uscito: carta normale, non cliccabile -->
        <div v-else class="posto">
          <RiquadroNumero :numero="numero" />
        </div>
      </template>
    </div>
  </section>

  <!-- 4. GLOSSARIO + FOOTER: la parte scura in fondo -->
  <div class="scuro">
    <section id="glossario" class="sezione">
      <div class="intestazione">
        <h2>Glossario</h2>
        <p class="spiegazione">Le parole inventate nate dentro le pagine di Arcanamente.</p>
      </div>

      <ul class="parole">
        <li v-for="voce in anteprimaGlossario" :key="voce.id">
          <span class="parola">{{ voce.parola }}</span>
          <span class="dettagli">
            <!-- il pallino ha il colore del lato da cui viene la parola -->
            <span class="pallino" :style="{ background: coloreDi(voce) }"></span>
            {{ voce.sillabe }} · {{ voce.grammatica }} · N°{{ voce.numero }} lato {{ voce.lato }}
          </span>
        </li>
      </ul>

      <!-- per ora è solo testo: diventerà un link alla pagina del glossario -->
      <p class="vai">Scopri il glossario completo →</p>
    </section>

    <SitoFooter />
  </div>
</template>

<style scoped>
/* ── 1. TESTATA ── */
.testata {
  min-height: 100vh;
  padding: 36px 40px 40px;
  display: flex;
  flex-direction: column;
}

.menu {
  display: flex;
  justify-content: space-between;   /* logo a sinistra, voci a destra */
  align-items: center;
}

.logo {
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 3px;
}

/* i bottoni del menu: tolgo l'aspetto da bottone e sembrano testo */
.voci button {
  background: none;
  border: none;
  font: inherit;
  font-size: 13px;
  color: inherit;
  margin-left: 28px;
  cursor: pointer;
  padding: 0;
}

.voci button:hover {
  text-decoration: underline;
}

.sottotitolo {
  margin: auto 0 0;                  /* "auto" spinge il blocco al centro della testata */
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 4px;
}

.testata h1 {
  margin: 24px 0 48px;
}

/* il logo: largo quanto la pagina, ma mai più di 1100px sugli schermi grandi.
   L'altezza si regola da sola, così il logo non si deforma */
.logo-grande {
  display: block;
  width: min(100%, 1100px);
  height: auto;
}

.sotto-titolo {
  display: flex;
  justify-content: space-between;   /* intro a sinistra, invito a destra */
  align-items: flex-end;
  gap: 40px;
  flex-wrap: wrap;                  /* su schermi stretti l'invito va sotto */
  margin-bottom: auto;
}

.intro {
  max-width: 440px;
  font-size: 18px;
  line-height: 1.5;
  margin: 0;
}

.invito {
  font-family: var(--titoli);
  font-style: italic;
  font-size: 30px;
  color: inherit;
  text-decoration: none;
}

.invito:hover {
  text-decoration: underline;
}

.scorri {
  font-size: 13px;
  color: var(--grigio);
  margin: 40px 0 0;
}

/* ── 2. FASCIA ── */
.nera {
  background: var(--inchiostro);
  color: var(--carta);
}

/* ── SEZIONI (collana e glossario) ── */
.sezione {
  padding: 110px 100px;
}

.intestazione {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
  flex-wrap: wrap;
  margin-bottom: 80px;
}

h2 {
  font-family: var(--titoli);
  font-weight: 300;
  font-size: clamp(56px, 8vw, 96px);
  line-height: 1;
  margin: 0;
}

.spiegazione {
  max-width: 380px;
  font-size: 16px;
  line-height: 1.5;
  color: var(--grigio);
  margin: 0;
}

/* ── 3. IL TAVOLO CON LE CARTE ── */
.tavolo {
  display: grid;
  grid-template-columns: repeat(6, 1fr);   /* 6 carte per riga */
  column-gap: 32px;
  row-gap: 48px;
}

.posto {
  display: block;
  color: inherit;
  text-decoration: none;
  transition: rotate 0.3s ease;     /* quando cambia inclinazione, lo fa con calma */
}

/* ogni colonna scende un po' di più o di meno e la carta è un po' storta:
   :nth-child(6n + 2) = la 2ª, l'8ª, la 14ª... cioè tutte quelle della 2ª colonna */
.posto:nth-child(6n + 1) { margin-top: 0;    rotate: -1.5deg; }
.posto:nth-child(6n + 2) { margin-top: 72px; rotate: 1deg; }
.posto:nth-child(6n + 3) { margin-top: 24px; rotate: -0.6deg; }
.posto:nth-child(6n + 4) { margin-top: 96px; rotate: 1.4deg; }
.posto:nth-child(6n + 5) { margin-top: 12px; rotate: -1deg; }
.posto:nth-child(6n + 6) { margin-top: 60px; rotate: 0.8deg; }

/* passando sopra una carta uscita, si raddrizza */
@media (hover: hover) {
  a.posto:hover {
    rotate: 0deg;
  }
}

/* ── 4. PARTE SCURA ── */
.scuro {
  background: var(--inchiostro);
  color: var(--carta);
}

.scuro .spiegazione {
  color: #B9B0A2;          /* grigio chiaro: sul nero si legge bene (8:1) */
}

.parole {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;           /* le parole vanno a capo quando non ci stanno */
  column-gap: 64px;
  row-gap: 48px;
}

.parole li {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.parola {
  font-family: var(--titoli);
  font-weight: 300;
  font-style: italic;
  font-size: clamp(48px, 7vw, 88px);
  line-height: 1;
}

.dettagli {
  font-size: 13px;
  color: #B9B0A2;
  display: flex;
  align-items: center;
  gap: 10px;
}

.pallino {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1px solid var(--carta);   /* il bordino chiaro lo fa vedere anche se il colore è scuro */
}

.vai {
  font-family: var(--titoli);
  font-style: italic;
  font-size: 30px;
  margin: 64px 0 0;
}

/* ── SCHERMI PICCOLI ── */
@media (max-width: 900px) {
  .sezione {
    padding: 80px 24px;
  }
  .testata {
    padding: 28px 24px 32px;
  }
  .tavolo {
    grid-template-columns: repeat(2, 1fr);   /* 2 carte per riga */
  }
  /* sul telefono niente scalini: solo la 2ª colonna scende un po' */
  .posto:nth-child(n) { margin-top: 0; }
  .posto:nth-child(2n) { margin-top: 40px; }
}
</style>
