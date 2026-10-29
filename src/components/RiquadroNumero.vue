<!--
  RIQUADRO DI UN NUMERO
  È un componente: lo scriviamo una volta e lo usiamo per ogni numero.
  Riceve dall'esterno il "numero" da mostrare (si chiama prop).
-->
<script setup>
defineProps({
  numero: Object
})
</script>

<template>
  <!-- se il numero non è disponibile, aggiungiamo la classe "bloccato" -->
  <div class="riquadro" :class="{ bloccato: !numero.disponibile }">

    <!-- se c'è la carta disegnata, mostriamo l'immagine -->
    <img v-if="numero.carta" :src="numero.carta" :alt="numero.nome" class="carta" />

    <!-- altrimenti (per ora) mostriamo numero e nome -->
    <template v-else>
      <span class="numero">N°{{ numero.id }}</span>
      <span class="nome">{{ numero.nome }}</span>
      <span v-if="!numero.disponibile" class="etichetta">prossimamente</span>
    </template>

  </div>
</template>

<style scoped>
.riquadro {
  width: 220px;
  aspect-ratio: 7 / 12;         /* proporzioni di una carta dei tarocchi */
  border: 2px solid black;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;               /* nella fila il riquadro non si schiaccia */
  scroll-snap-align: start;     /* punto di "aggancio" quando scorri */
}

/* quando c'è la carta disegnata, l'immagine riempie tutto il riquadro */
.riquadro:has(.carta) {
  padding: 0;
}

.carta {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.numero {
  font-size: 14px;
}

.nome {
  font-size: 28px;
  font-weight: bold;
}

/* i numeri non ancora usciti: grigi */
.bloccato {
  border-color: #c4c4c4;        /* il bordo può restare chiaro: è decorazione */
  color: #737373;               /* il testo invece deve leggersi (4,7:1 sul bianco) */
}

.etichetta {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
}
</style>
