// ─────────────────────────────────────────────────────────────
// I DATI DI ARCANAMENTE
// Qui ci sono tutti i numeri della rivista.
// Per cambiare un testo o aggiungere un numero modifichi SOLO questo file.
// I testi "Lorem ipsum..." sono segnaposto: sostituiscili con i tuoi.
// ─────────────────────────────────────────────────────────────

export const numeri = [
  {
    id: '00',
    nome: 'Il Matto',
    romano: '0',      // il numero romano gigante nell'apertura
    disponibile: true,
    carta: '',        // la tua carta disegnata, es. '/carte/matto.png' (vuoto = nessuna immagine)
    lati: {
      A: {
        nome: 'Il Matto',      // il nome di questo lato
        colore: '#1E4E5A',   // Ottanio: il colore della pagina di questo lato
        sfumatura: '#14353D', // ottanio più scuro: la pagina sfuma verso questo colore in basso
        testo: '#FFFFFF',    // colore del testo sopra quello sfondo

        // 2. EDITORIALE: ogni testo tra virgolette è un paragrafo
        editoriale: [
          "Lo zero è una soglia, non un inizio. Il Matto è l’unica carta senza un posto fisso nel mazzo: lo sguardo alto, il passo che già sporge oltre il margine, il vuoto sotto di lui. Non sappiamo se cadrà o se camminerà sull’aria. Non lo sa nemmeno lui.",
          "Questo lato della rivista guarda verso l’interno. Racconta da dove viene il Matto e come è cambiato il suo volto nei secoli, legge uno per uno i simboli della carta, segue le sue tracce nella Londra esoterica e tra le teorie di Mesmer, de Gébelin e Freud, fino al cinema e alle parole di chi le carte le legge ogni giorno.",
          "È lo spazio della soglienza: l’istante in cui il piede è già sollevato ma non ancora posato. Queste pagine non vi chiedono di credere in niente. Vi chiedono solo di non posare ancora il piede."
        ],

        // 5. APPROFONDIMENTI
        approfondimenti: [
          {
            id: 'mazzo-colleoni',
            titolo: 'Il mazzo Colleoni',
            sottotitolo: 'Gli arcani dipinti a mano nel Quattrocento',
            anteprima: 'Uno dei mazzi di tarocchi più antichi giunti fino a noi, oggi diviso tra Bergamo e New York. Sfoglialo carta per carta: scopri dove è conservata ognuna e cosa rappresenta.'
          }
        ]
      },
      B: {
        nome: 'Il Viandante',  // il nome di questo lato
        colore: '#80246F',   // Viola: il colore della pagina di questo lato
        sfumatura: '#57184B', // viola più scuro
        testo: '#FFFFFF',    // colore del testo sopra quello sfondo

        // 2. EDITORIALE: ogni testo tra virgolette è un paragrafo
        editoriale: [
          "Avete capovolto la rivista e siete passati dall’altra parte. Qui il Matto diventa il Viandante: la soglia è ormai alle spalle e nessuna terra è ancora sotto i piedi. Non cammina verso qualcosa: cammina, e basta.",
          "Questo è il lato della materia, del gesto e della pratica. Ci sono i riti di magia bianca del primo passo, le stese dalla carta singola alla Croce Celtica, il viaggio del Matto attraverso le ventuno porte degli Arcani e la sua faccia in ombra, quando esce rovesciato. E ci sono gli oggetti che trattengono qualcosa di invisibile.",
          "È lo spazio della varcanza: il passaggio come atto rituale. Attraversate, oppure restate fermi. Ma sappiate che, una volta dentro il varco, non c’è più un lato da cui tornare."
        ],

        // 5. APPROFONDIMENTI
        approfondimenti: [
          {
            id: 'lettura-carte',
            titolo: 'La lettura delle carte',
            sottotitolo: 'Il primo passo del Viandante',
            anteprima: 'Pesca le tue carte e lasciati leggere dal Matto.'
          }
        ]
      }
    }
  },
  {
    id: '01',
    nome: 'Il Bagatto',
    romano: 'I',      // il numero romano gigante nell'apertura
    disponibile: true,
    carta: '',        // la tua carta disegnata, es. '/carte/matto.png' (vuoto = nessuna immagine)
    lati: {
      A: {
        nome: 'Lato A',
        colore: '#64313E',   // Burgundy 19-1617 TCX: il colore della pagina di questo lato
        sfumatura: '#44212A', // burgundy più scuro
        testo: '#FFFFFF',    // colore del testo sopra quello sfondo

        // 2. EDITORIALE: ogni testo tra virgolette è un paragrafo
        editoriale: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.'
        ],

        // 5. APPROFONDIMENTI
        approfondimenti: [
          {
            id: 'bagatto-a1',
            titolo: 'Titolo approfondimento 1',
            sottotitolo: 'Sottotitolo',
            anteprima: "Le prime righe dell'approfondimento, per incuriosire chi legge e invogliarlo a cliccare."
          },
          {
            id: 'bagatto-a2',
            titolo: 'Titolo approfondimento 2',
            sottotitolo: 'Sottotitolo',
            anteprima: "Le prime righe dell'approfondimento, per incuriosire chi legge e invogliarlo a cliccare."
          }
        ]
      },
      B: {
        nome: 'Lato B',
        colore: '#8D8B55',   // Green Olive 17-0535 TCX: il colore della pagina di questo lato
        sfumatura: '#83814F', // oliva solo un po' più scuro: con il testo scuro, di più non si leggerebbe
        testo: '#140B0D',    // bordeaux quasi nero: sul verde oliva si legge meglio del bianco

        // 2. EDITORIALE: ogni testo tra virgolette è un paragrafo
        editoriale: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.'
        ],

        // 5. APPROFONDIMENTI
        approfondimenti: [
          {
            id: 'bagatto-b1',
            titolo: 'Titolo approfondimento 3',
            sottotitolo: 'Sottotitolo',
            anteprima: "Le prime righe dell'approfondimento, per incuriosire chi legge e invogliarlo a cliccare."
          },
          {
            id: 'bagatto-b2',
            titolo: 'Titolo approfondimento 4',
            sottotitolo: 'Sottotitolo',
            anteprima: "Le prime righe dell'approfondimento, per incuriosire chi legge e invogliarlo a cliccare."
          }
        ]
      }
    }
  },

  // I PROSSIMI NUMERI: "disponibile: false" = in homepage appaiono bloccati
  { id: '02', nome: 'La Papessa', disponibile: false },
  { id: '03', nome: "L'Imperatrice", disponibile: false },
  { id: '04', nome: "L'Imperatore", disponibile: false },
  { id: '05', nome: 'Il Papa', disponibile: false },
  { id: '06', nome: 'Gli Amanti', disponibile: false },
  { id: '07', nome: 'Il Carro', disponibile: false },
  { id: '08', nome: 'La Giustizia', disponibile: false },
  { id: '09', nome: "L'Eremita", disponibile: false },
  { id: '10', nome: 'La Ruota della Fortuna', disponibile: false },
  { id: '11', nome: 'La Forza', disponibile: false },
  { id: '12', nome: "L'Appeso", disponibile: false },
  { id: '13', nome: 'La Morte', disponibile: false },
  { id: '14', nome: 'La Temperanza', disponibile: false },
  { id: '15', nome: 'Il Diavolo', disponibile: false },
  { id: '16', nome: 'La Torre', disponibile: false },
  { id: '17', nome: 'La Stella', disponibile: false },
  { id: '18', nome: 'La Luna', disponibile: false },
  { id: '19', nome: 'Il Sole', disponibile: false },
  { id: '20', nome: 'Il Giudizio', disponibile: false },
  { id: '21', nome: 'Il Mondo', disponibile: false }
]
