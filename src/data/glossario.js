// ─────────────────────────────────────────────────────────────
// IL GLOSSARIO DI ARCANAMENTE
// Le parole inventate che compaiono nelle riviste, scritte come in un dizionario.
// Per aggiungere una parola copia un blocco { ... } e cambia i testi.
//
//   parola      → la parola, in minuscolo
//   sillabe     → la divisione in sillabe, con l'accento sulla sillaba tonica
//   grammatica  → s.f. = sostantivo femminile, s.m. = maschile, agg. = aggettivo, v. = verbo
//   etimologia  → da dove viene la parola ('' se non c'è)
//   definizioni → una lista: se la parola ha più significati, si numerano da sole
//   esempio     → una frase della rivista in cui compare la parola
//   numero/lato → in quale numero e in quale lato della rivista compare
// ─────────────────────────────────────────────────────────────

export const glossario = [
  // ── N°00 IL MATTO · LATO A ──
  {
    id: 'soglienza',
    parola: 'soglienza',
    sillabe: 'so-glièn-za',
    grammatica: 's.f.',
    etimologia: 'da soglia, con il suffisso -enza',
    definizioni: [
      'Lo stato sospeso prima del passo: il peso ancora indietro, lo sguardo già oltre.',
      'Condizione di chi sta sul ciglio e non è più dove era, ma nemmeno dove andrà.'
    ],
    esempio: 'Fate il passo, oppure no. La soglienza è già il viaggio.',
    numero: '00',
    lato: 'A'
  },
  {
    id: 'zerranza',
    parola: 'zerranza',
    sillabe: 'zer-ràn-za',
    grammatica: 's.f.',
    etimologia: 'da zero, con il suffisso -anza',
    definizioni: [
      'La condizione di ciò che esiste contando come nulla.',
      'Per estensione, la condizione di chi non si lascia classificare.'
    ],
    esempio: 'C’è una zerranza anche fuori dai numeri e dalle carte.',
    numero: '00',
    lato: 'A'
  },

  // ── N°00 IL MATTO · LATO B ──
  {
    id: 'varcanza',
    parola: 'varcanza',
    sillabe: 'var-càn-za',
    grammatica: 's.f.',
    etimologia: 'da varcare, con il suffisso -anza',
    definizioni: [
      'Il passaggio come atto rituale.',
      'Lo stato liminare in cui il viandante si consegna all’ignoto senza garanzia di ritorno.'
    ],
    esempio: 'Sono gesti di varcanza: serve a poco farli se non sei disposto a lasciare qualcosa sull’altra riva.',
    numero: '00',
    lato: 'B'
  },
  {
    id: 'folmina',
    parola: 'folmina',
    sillabe: 'fól-mi-na',
    grammatica: 's.f.',
    etimologia: 'da fulmine',
    definizioni: [
      'L’intuizione fulminea che arriva prima del pensiero; il sapere che colpisce come un lampo, senza passare dalle parole.'
    ],
    esempio: 'Quando la carta ti dice tutto nell’istante in cui la scopri, e solo dopo cerchi il perché: quella è folmina.',
    numero: '00',
    lato: 'B'
  },
  {
    id: 'arcanite',
    parola: 'arcanite',
    sillabe: 'ar-ca-nì-te',
    grammatica: 's.f.',
    etimologia: 'da arcano, con il suffisso -ite dei minerali',
    definizioni: [
      'La materia invisibile di cui sono fatti i simboli.',
      'Sostanza impalpabile che un oggetto trattiene quando smette di essere solo oggetto: ciò che resta nelle mani dopo aver toccato una carta, un tessuto, un segno. Non si vede, ma si sente al tatto.'
    ],
    esempio: 'Ricamato a mano, filo su filo, finché la stoffa non trattiene ciò che nessuna stoffa dovrebbe trattenere. La chiamano arcanite.',
    numero: '00',
    lato: 'B'
  }
]
