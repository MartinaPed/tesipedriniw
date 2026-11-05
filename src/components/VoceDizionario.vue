<!--
  VOCE DI DIZIONARIO: una parola del glossario scritta come in un vero dizionario.
  È un componente a parte perché la useremo in più posti:
  nella pagina del numero, nel glossario completo e nella pagina della parola.
-->
<script setup>
defineProps({
  voce: Object
})
</script>

<template>
  <article class="voce">
    <!-- il lemma: la parola, grande e in corsivo -->
    <p class="lemma">{{ voce.parola }}</p>

    <!-- la riga di dettagli: sillabe, grammatica, etimologia -->
    <p class="dettagli">
      {{ voce.sillabe }} · {{ voce.grammatica }}
      <!-- l'etimologia compare solo se c'è -->
      <template v-if="voce.etimologia"> · {{ voce.etimologia }}</template>
    </p>

    <!-- le definizioni numerate: <ol> numera da solo 1, 2, 3... -->
    <ol class="definizioni">
      <li v-for="(definizione, i) in voce.definizioni" :key="i">{{ definizione }}</li>
    </ol>

    <!-- l'esempio d'uso, preso dalla rivista -->
    <p v-if="voce.esempio" class="esempio">
      «{{ voce.esempio }}»
      <span class="fonte">— Arcanamente N°{{ voce.numero }}</span>
    </p>
  </article>
</template>

<style scoped>
/* carattere con grazie, come nei dizionari stampati */
.voce {
  font-family: var(--titoli);
  break-inside: avoid;          /* se la lista va su due colonne, la voce non si spezza */
  padding-bottom: 64px;
}

.lemma {
  font-weight: 300;
  font-style: italic;
  font-size: clamp(56px, 6vw, 80px);
  line-height: 1;
  margin: 0;
}

.dettagli {
  font-family: var(--testi);
  font-size: 13px;
  margin: 14px 0 18px;
}

.definizioni {
  margin: 0;
  padding-left: 28px;
  font-size: 22px;
  line-height: 1.4;
}

.definizioni li {
  margin-bottom: 8px;
}

/* se c'è una sola definizione non serve il numero 1 */
.definizioni li:only-child {
  list-style: none;
}
.definizioni:has(li:only-child) {
  padding-left: 0;
}

.esempio {
  margin: 16px 0 0;
  font-style: italic;
  font-size: 20px;
  line-height: 1.4;
}

.fonte {
  font-family: var(--testi);
  font-style: normal;
  font-size: 12px;
  white-space: nowrap;
}
</style>
