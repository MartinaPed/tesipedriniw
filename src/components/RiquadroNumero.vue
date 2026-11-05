<!--
  CARTA DI UN NUMERO (nella collana in homepage)
  È un componente: lo scriviamo una volta e lo usiamo per ogni numero.
  Riceve dall'esterno il "numero" da mostrare (si chiama prop).
  Ci sono due facce:
    - FRONTE: c'è la tua carta disegnata (se il numero è uscito, ha l'angolo piegato)
    - RETRO: la carta non è ancora disegnata, si vede solo il numero romano
-->
<script setup>
import { computed } from 'vue'
import { publicAssetUrl } from '../utils/publicAssetUrl.js'

const props = defineProps({
  numero: Object
})

// trasforma il numero in numero romano: '07' → 'VII'
// (per lo zero, il Matto, non esiste un numero romano: usiamo 0)
function inRomano(n) {
  if (n === 0) return '0'
  const valori = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]
  let risultato = ''
  for (const [valore, lettere] of valori) {
    while (n >= valore) {
      risultato += lettere
      n -= valore
    }
  }
  return risultato
}

const romano = computed(() => props.numero.romano || inRomano(Number(props.numero.id)))

// il colore del lato A, per la scritta "sfoglia →" (solo i numeri usciti hanno i lati)
const colore = computed(() => props.numero.lati?.A.colore)
</script>

<template>
  <div class="carta" :class="{ bloccato: !numero.disponibile }">
    <!-- FRONTE: la tua illustrazione -->
    <div v-if="numero.carta" class="faccia">
      <img :src="publicAssetUrl(numero.carta)" :alt="numero.nome" />
      <!-- l'angolo piegato: solo sui numeri già usciti -->
      <span v-if="numero.disponibile" class="piega"></span>
    </div>

    <!-- RETRO: niente illustrazione, solo il numero romano -->
    <div v-else class="faccia retro">
      <span class="romano">{{ romano }}</span>
      <span class="etichetta">prossimamente</span>
    </div>

    <!-- la didascalia sotto la carta -->
    <p class="didascalia">N°{{ numero.id }} · {{ numero.nome }}</p>
    <p v-if="numero.disponibile" class="sfoglia" :style="{ color: colore }">sfoglia →</p>
  </div>
</template>

<style scoped>
.faccia {
  position: relative;            /* serve per mettere l'angolo piegato sopra l'immagine */
  aspect-ratio: 7 / 12;          /* proporzioni di una carta dei tarocchi */
  border-radius: 10px;
  overflow: hidden;              /* taglia l'immagine sugli angoli arrotondati */
  background: #DDD5C6;
  box-shadow: 0 10px 24px -6px rgba(28, 26, 23, 0.25);   /* l'ombra: la carta è posata sul tavolo */
}

.faccia img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* L'ANGOLO PIEGATO, disegnato con un gradiente:
   metà triangolo color carta (il "buco" lasciato dalla piega)
   e metà più scura (il retro della pagina che si è piegato) */
.piega {
  position: absolute;
  top: 0;
  right: 0;
  width: 38px;
  height: 38px;
  background: linear-gradient(to bottom left, var(--carta) 50%, #CFC4B0 50%);
  box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.12);
}

/* il retro: bordo sottile all'interno e numero romano al centro */
.retro {
  background: #E8E0D1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  outline: 1px solid rgba(28, 26, 23, 0.25);
  outline-offset: -8px;          /* il contorno sta 8px dentro la carta, come una cornice */
}

.romano {
  font-family: var(--titoli);
  font-weight: 300;
  font-size: clamp(32px, 3.6vw, 56px);
}

.etichetta {
  position: absolute;
  bottom: 22px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--grigio);
}

/* carta disegnata ma numero non ancora uscito: un po' sbiadita */
.bloccato .faccia:not(.retro) {
  opacity: 0.5;
}

.didascalia {
  font-size: 12px;
  margin: 16px 0 0;
}

.bloccato .didascalia {
  color: var(--grigio);
}

.sfoglia {
  font-family: var(--titoli);
  font-style: italic;
  font-size: 20px;
  margin: 4px 0 0;
}
</style>
