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
    <!-- la riga di testa: lemma, sillabe, grammatica, etimologia -->
    <p class="testa">
      <span class="lemma">{{ voce.parola }}</span>
      <span class="sillabe">{{ voce.sillabe }}</span>
      <span class="grammatica">{{ voce.grammatica }}</span>
      <!-- l'etimologia compare solo se c'è -->
      <span v-if="voce.etimologia" class="etimologia">[{{ voce.etimologia }}]</span>
    </p>

    <!-- le definizioni numerate: <ol> numera da solo 1, 2, 3... -->
    <ol class="definizioni">
      <li v-for="(definizione, i) in voce.definizioni" :key="i">{{ definizione }}</li>
    </ol>

    <!-- l'esempio d'uso, preso dalla rivista -->
    <p v-if="voce.esempio" class="esempio">
      <span class="rombo">◆</span> «{{ voce.esempio }}»
      <span class="fonte">— Arcanamente N°{{ voce.numero }}</span>
    </p>
  </article>
</template>

<style scoped>
/* carattere con grazie, come nei dizionari stampati */
.voce {
  font-family: Georgia, 'Times New Roman', serif;
  break-inside: avoid;          /* se la lista va su due colonne, la voce non si spezza */
  padding: 24px 0;
  border-top: 1px solid currentColor;
}

.testa {
  margin: 0 0 12px;
}

.lemma {
  font-size: 32px;
  font-weight: bold;
  margin-right: 12px;
}

.sillabe {
  font-size: 18px;
  margin-right: 12px;
}

.grammatica {
  font-style: italic;
  margin-right: 8px;
}

.etimologia {
  font-size: 15px;
}

.definizioni {
  margin: 0;
  padding-left: 24px;
  font-size: 17px;
  line-height: 1.5;
}

.definizioni li {
  margin-bottom: 6px;
}

/* se c'è una sola definizione non serve il numero 1 */
.definizioni li:only-child {
  list-style: none;
}
.definizioni:has(li:only-child) {
  padding-left: 0;
}

.esempio {
  margin: 12px 0 0;
  font-style: italic;
  font-size: 16px;
  line-height: 1.5;
}

.rombo {
  font-style: normal;
  font-size: 12px;
  margin-right: 4px;
}

.fonte {
  font-style: normal;
  font-size: 13px;
  white-space: nowrap;
}
</style>
