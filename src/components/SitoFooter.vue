<!--
  FOOTER: la fascia in fondo al sito.
  È un componente separato perché deve comparire su tutte le pagine.
  Non ha colori suoi: prende quelli della pagina in cui si trova.
-->
<template>
  <footer class="footer">
    <div>
      <p class="nome">Arcanamente</p>
      <p class="descrizione">Collana di riviste di cultura esoterica</p>
    </div>

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
  display: flex;
  justify-content: space-between;     /* nome a sinistra, crediti a destra */
  align-items: flex-start;
  flex-wrap: wrap;                    /* sul telefono i crediti vanno sotto */
  gap: 32px;
  padding: 48px 100px 56px;
  border-top: 1px solid currentColor; /* la linea prende il colore del testo della pagina */
}

.footer p {
  margin: 0;
}

.nome {
  font-family: var(--titoli);
  font-weight: 300;
  font-size: 40px;
  line-height: 1.1;
}

.descrizione {
  margin-top: 8px !important;
  font-size: 12px;
  text-transform: uppercase;   /* tutto maiuscolo */
  letter-spacing: 3px;         /* lettere più distanziate */
}

.crediti {
  font-size: 13px;
  line-height: 1.7;
  text-align: right;
  /* niente trasparenza: su alcuni colori (es. verde oliva) il testo non si leggerebbe più */
}

@media (max-width: 900px) {
  .footer {
    padding: 40px 24px;
  }
  .crediti {
    text-align: left;
  }
}
</style>
