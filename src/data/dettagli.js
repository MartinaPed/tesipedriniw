// ─────────────────────────────────────────────────────────────
// LA CARTA DA VICINO
// Le carte da esplorare punto per punto, con le stelline ✦ sopra.
// Ogni carta è collegata a un articolo tramite il suo id
// (lo stesso id che l'articolo ha in numeri.js, es. 'volto-del-matto').
//
//   immagine  → la carta da mostrare (il percorso dentro la cartella public)
//   alt       → la descrizione della carta per chi non la vede (lettori di schermo)
//   zoom      → quanto si ingrandisce la carta quando clicchi una ✦ (2 = il doppio)
//   dettagli  → la lista dei punti, nell'ordine in cui le frecce li fanno scorrere
//
// Per ogni dettaglio:
//   titolo → il nome del dettaglio
//   x, y   → dove sta la ✦ sulla carta, in percentuale:
//            x = 0 è il bordo sinistro, x = 100 il bordo destro
//            y = 0 è il bordo in alto,  y = 100 il bordo in basso
//            (se una stellina è un po' fuori posto, cambia questi due numeri)
//   testo  → il testo che compare accanto alla carta
//   parola → (facoltativo) una parola del glossario che compare nel testo:
//            diventa cliccabile e porta alla sua voce nel glossario.
//            Deve essere scritta uguale all'id della parola in glossario.js
// ─────────────────────────────────────────────────────────────

export const carteDaVicino = {
  // ── N°00 IL MATTO · LATO A · "Il volto del Matto" ──
  'volto-del-matto': {
    immagine: '/carte/matto.png',
    alt: 'La carta del Matto: un gatto nero con un fagotto sulla spalla cammina verso il bordo di un dirupo, seguito da un cane bianco, sotto un sole scuro.',
    zoom: 2.5,
    dettagli: [
      {
        titolo: 'Lo zero',
        x: 50,
        y: 7,
        testo: '«Porta un numero solo, e quel numero è zero.» È la zerranza: la condizione di ciò che esiste contando come nulla.',
        parola: 'zerranza'
      },
      {
        titolo: 'Lo sguardo',
        x: 65,
        y: 33,
        testo: 'Ha lo sguardo rivolto altrove: al cielo, a un pensiero, a qualcosa che noi non vediamo.'
      },
      {
        titolo: 'Il fagotto',
        x: 40,
        y: 38,
        testo: 'Porta un fagotto in cima a un bastone, e non sappiamo cosa contenga. È tutto ciò che possiede: il viandante porta addosso tutto quello che ha.'
      },
      {
        titolo: 'Il cane',
        x: 23,
        y: 56,
        testo: 'Ai suoi piedi un animale, un cane, talvolta una lince, che morde, trattiene, avverte.'
      },
      {
        titolo: 'Il dirupo',
        x: 72,
        y: 63,
        testo: 'Davanti a lui un dirupo. È l’unico arcano che cammina davvero: lui solo ha un piede già oltre il bordo.'
      },
      {
        titolo: 'Il sole',
        x: 78,
        y: 16,
        // SEGNAPOSTO: sostituisci con il tuo testo
        testo: 'Testo da scrivere.'
      }
    ]
  }
}
