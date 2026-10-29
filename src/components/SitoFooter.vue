<!--
  FOOTER: la fascia in fondo al sito.
  È un componente separato perché deve comparire su tutte le pagine.
  Non ha colori suoi: prende quelli della pagina in cui si trova.
-->
<template>
  <footer class="footer">
    <p class="nome">Arcanamente</p>
    <p class="descrizione">Collana di riviste di cultura esoterica</p>

    <div class="crediti">
      <p>Progetto di tesi di Martina Pedrini</p>
      <p>Graphic Design · LABA Brescia</p>
      <p>Relatore: prof. Iosca</p>
      <p>Correlatore: prof. Molinari</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 40px;
  border-top: 2px solid currentColor;   /* la linea prende il colore del testo della pagina */
  text-align: center;
}

.footer p {
  margin: 4px 0;
}

.nome {
  font-size: 24px;
  font-weight: bold;
}

.descrizione {
  font-size: 16px;
  text-transform: uppercase;   /* tutto maiuscolo */
  letter-spacing: 3px;         /* lettere più distanziate */
}

.crediti {
  margin-top: 24px;
  font-size: 14px;
  /* niente trasparenza: su alcuni colori (es. verde oliva) il testo non si leggerebbe più */
}
</style>
